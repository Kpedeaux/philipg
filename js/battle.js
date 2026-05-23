/* =====================================================
   PhilipG — Battle System
   Turn-based: player picks spell -> question -> resolve.
   Wrong answer = enemy attacks. Out of MP = forced to use Spark.
   ===================================================== */

const Battle = (() => {
  let state = null;
  let onResolve = null; // callback when battle ends

  function start({ save, enemy, island }, onEnd) {
    state = {
      save,
      enemy: Object.assign({}, enemy, { currentHp: enemy.hp }),
      island,
      busy: false,
      pendingSpell: null,
    };
    onResolve = onEnd;
    UI.showScreen('battle');
    renderAll();
    showStage('prompt');
  }

  function renderAll() {
    // Backdrop
    document.getElementById('battle-bg').innerHTML = getSprite(state.island.bg);
    // Enemy
    document.getElementById('enemy-name').textContent = state.enemy.name;
    document.getElementById('enemy-sprite').innerHTML = getSprite(state.enemy.sprite);
    document.getElementById('enemy-sprite').classList.remove('hit', 'defeated');
    updateEnemyHp();
    // Player
    const sprite = state.save.player === 'philip' ? 'philipWizard' : 'owenWizard';
    document.getElementById('battle-player-sprite').innerHTML = getSprite(sprite);
    document.getElementById('battle-player-name').textContent =
      state.save.player === 'philip' ? 'Philip' : 'Owen';
    updatePlayerStats();
    // Pets
    renderPets();
    // Spells
    renderSpellGrid();
  }

  function renderPets() {
    const container = document.getElementById('battle-pets');
    if (!container) return;
    container.innerHTML = '';
    const owned = getOwnedPets(state.save);
    owned.forEach(pet => {
      const div = document.createElement('div');
      div.className = 'battle-pet';
      div.title = pet.name + ': ' + pet.desc;
      div.dataset.petId = pet.id;
      div.innerHTML = getSprite(pet.sprite);
      container.appendChild(div);
    });
  }

  // Shorthand: sum bonus across owned pets for a given effect type
  function petEffect(type) {
    if (typeof petEffectFor !== 'function') return 0;
    return petEffectFor(state.save, type);
  }

  function updateEnemyHp() {
    const pct = Math.max(0, (state.enemy.currentHp / state.enemy.hp) * 100);
    const fill = document.getElementById('enemy-hp-fill');
    fill.style.width = pct + '%';
    fill.classList.toggle('low', pct < 35);
  }

  function updatePlayerStats() {
    const s = state.save;
    const hpPct = Math.max(0, (s.hp / s.maxHp) * 100);
    const mpPct = Math.max(0, (s.mp / s.maxMp) * 100);
    const hpFill = document.getElementById('player-hp-fill');
    hpFill.style.width = hpPct + '%';
    hpFill.classList.toggle('low', hpPct < 35);
    document.getElementById('player-mp-fill').style.width = mpPct + '%';
    document.getElementById('player-hp-text').textContent = `${s.hp}/${s.maxHp}`;
    document.getElementById('player-mp-text').textContent = `${s.mp}/${s.maxMp}`;
  }

  function renderSpellGrid() {
    const grid = document.getElementById('spell-grid');
    grid.innerHTML = '';
    const known = state.save.spellsKnown;
    SPELLS.forEach(spell => {
      if (!known.includes(spell.id)) return;
      const canCast = state.save.mp >= spell.mpCost;
      const btn = document.createElement('button');
      btn.className = 'spell-btn';
      btn.disabled = !canCast || state.busy;
      btn.innerHTML = `
        <span class="spell-icon">${spell.icon}</span>
        <span class="spell-name">${spell.name}</span>
        <span class="spell-cost">${spell.mpCost} MP</span>
      `;
      btn.addEventListener('click', () => pickSpell(spell));
      grid.appendChild(btn);
    });
  }

  function pickSpell(spell) {
    if (state.busy) return;
    if (state.save.mp < spell.mpCost) {
      flashFeedback('Not enough MP!', null, 'bad');
      return;
    }
    Audio.click();
    state.pendingSpell = spell;
    askQuestion(spell);
  }

  function askQuestion(spell) {
    const subj = spell.subject === 'any'
      ? randomSubject(state.save)
      : spell.subject;

    let q = getRandomQuestion(state.save.grade, subj);
    if (!q) { console.warn('no question for', subj); return; }
    q = shuffleQuestion(q);
    state.busy = true;

    document.getElementById('question-subject').textContent = subj.charAt(0).toUpperCase() + subj.slice(1);
    document.getElementById('question-text').textContent = q.text;

    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';
    q.choices.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = c;
      btn.addEventListener('click', () => {
        if (state.busy === 'answered') return;
        state.busy = 'answered';
        const correct = (i === q.answer);
        btn.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) {
          // also highlight the right answer
          grid.children[q.answer].classList.add('correct');
        }
        Array.from(grid.children).forEach(b => b.disabled = true);
        setTimeout(() => resolveAnswer(correct, spell), 900);
      });
      grid.appendChild(btn);
    });

    showStage('question');
  }

  function randomSubject(save) {
    const all = ['math', 'reading', 'spelling', 'grammar'];
    return all[Math.floor(Math.random() * all.length)];
  }

  function resolveAnswer(correct, spell) {
    state.save.stats[correct ? 'correct' : 'wrong']++;
    state.save.mp = Math.max(0, state.save.mp - spell.mpCost);
    if (correct) {
      // Reward correct answers with a small MP regen so the player never softlocks.
      const regen = 3 + petEffect('mpRegen');
      state.save.mp = Math.min(state.save.maxMp, state.save.mp + regen);
      Audio.correct();
      castSpell(spell, true);
    } else {
      Audio.wrong();
      flashFeedback('Oops!', `Wrong answer.`, 'bad');
      setTimeout(() => enemyAttack(), 700);
    }
  }

  function castSpell(spell, hitTrue) {
    const playerEl = document.getElementById('battle-player-sprite');
    const enemyEl  = document.getElementById('enemy-sprite');
    playerEl.classList.add('cast');
    setTimeout(() => playerEl.classList.remove('cast'), 600);
    Audio.spellCast();

    if (spell.heal) {
      const healed = Math.min(spell.heal, state.save.maxHp - state.save.hp);
      // Heal projectile pulses on the player
      Effects.castSpell(spell.id, playerEl, playerEl, () => {
        state.save.hp += healed;
        Audio.heal();
        floatText(`+${healed} HP`, 'heal', getPlayerCenter());
        flashFeedback('Healed!', `+${healed} HP restored`, 'good');
        updatePlayerStats();
        setTimeout(() => enemyTurnOrNext(), 700);
      });
      return;
    }

    // Damage spell — launch projectile, then apply damage when it lands
    Effects.castSpell(spell.id, playerEl, enemyEl, () => {
      const bonus = petEffect('bonus');     // Storm Wolf: +8 to spells
      const dmg = spell.damage + bonus + Math.floor(Math.random() * 6);
      state.enemy.currentHp = Math.max(0, state.enemy.currentHp - dmg);
      Audio.enemyHit();
      enemyEl.classList.add('hit');
      setTimeout(() => enemyEl.classList.remove('hit'), 400);
      floatText(`-${dmg}`, 'damage', getEnemyCenter());
      const bonusNote = bonus > 0 ? ` (+${bonus} pet bonus)` : '';
      flashFeedback('Hit!', `${spell.name} dealt ${dmg} damage${bonusNote}`, 'good');
      updateEnemyHp();

      // Pets that auto-attack each round
      const petAtk = petEffect('attack');
      const petHeal = petEffect('heal');
      if (petAtk > 0 && state.enemy.currentHp > 0) {
        setTimeout(() => {
          state.enemy.currentHp = Math.max(0, state.enemy.currentHp - petAtk);
          document.getElementById('enemy-sprite').classList.add('hit');
          setTimeout(() => document.getElementById('enemy-sprite').classList.remove('hit'), 400);
          floatText(`-${petAtk} 🔥`, 'damage', getEnemyCenter());
          Audio.enemyHit();
          updateEnemyHp();
        }, 600);
      }
      if (petHeal > 0 && state.save.hp < state.save.maxHp) {
        setTimeout(() => {
          const healed = Math.min(petHeal, state.save.maxHp - state.save.hp);
          state.save.hp += healed;
          floatText(`+${healed} ♥`, 'heal', getPlayerCenter());
          updatePlayerStats();
        }, 800);
      }

      if (state.enemy.currentHp <= 0 || (petAtk > 0 && state.enemy.currentHp - petAtk <= 0)) {
        setTimeout(() => {
          if (state.enemy.currentHp <= 0) victory();
          else enemyAttack();
        }, 1200);
      } else {
        setTimeout(() => enemyAttack(), 1200);
      }
    });
  }

  function enemyAttack() {
    const playerEl = document.getElementById('battle-player-sprite');
    const enemyEl  = document.getElementById('enemy-sprite');
    const base = state.enemy.dmg;
    const dmg = base + Math.floor(Math.random() * 4);

    // Use full dramatic attack sequence (windup → lunge → slash → impact)
    Effects.enemyAttack(enemyEl, playerEl, () => {
      state.save.hp = Math.max(0, state.save.hp - dmg);
      Audio.hit();
      floatText(`-${dmg}`, 'damage', getPlayerCenter());
      flashFeedback(`${state.enemy.name} attacks!`, `-${dmg} HP`, 'bad');
      updatePlayerStats();

      // Defeat check must run AFTER HP is decremented (inside the callback)
      if (state.save.hp <= 0) {
        setTimeout(() => defeat(), 900);
      } else {
        setTimeout(() => enemyTurnOrNext(), 1000);
      }
    });
  }

  function enemyTurnOrNext() {
    state.busy = false;
    showStage('prompt');
    renderSpellGrid();
  }

  function showStage(name) {
    ['prompt', 'question', 'feedback'].forEach(s => {
      document.getElementById('stage-' + s).classList.toggle('active', s === name);
    });
  }

  function flashFeedback(title, sub, kind) {
    const el = document.getElementById('feedback-text');
    el.textContent = title;
    el.classList.remove('good', 'bad');
    el.classList.add(kind === 'good' ? 'good' : 'bad');
    document.getElementById('feedback-sub').textContent = sub || '';
    showStage('feedback');
  }

  function floatText(text, kind, pos) {
    const layer = document.getElementById('floating-text-layer');
    const el = document.createElement('div');
    el.className = 'floating-text ' + kind;
    el.textContent = text;
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function getEnemyCenter() {
    const r = document.getElementById('enemy-sprite').getBoundingClientRect();
    return { x: r.left + r.width / 2 - 30, y: r.top + 20 };
  }
  function getPlayerCenter() {
    const r = document.getElementById('battle-player-sprite').getBoundingClientRect();
    return { x: r.left + r.width / 2 - 30, y: r.top + 10 };
  }

  function victory() {
    Audio.victory();
    const enemyEl = document.getElementById('enemy-sprite');
    Effects.defeatBurst(enemyEl);
    enemyEl.classList.add('defeated');

    // Reward
    const enemy = state.enemy;
    const baseXp = enemy.boss ? 50 : 20;
    const xp = baseXp + (enemy.final ? 100 : 0);
    const mp = enemy.boss ? 20 : 8;

    state.save.defeatedEnemies = uniq([...state.save.defeatedEnemies, enemy.id]);
    state.save.xp += xp;
    state.save.mp = Math.min(state.save.maxMp, state.save.mp + mp);

    // Level up?
    const leveledUp = checkLevelUp(state.save);

    // Island clear?
    const islandJustCleared = isIslandCleared(state.island, state.save)
      && !state.save.clearedIslands.includes(state.island.id);
    let petUnlocked = null;
    if (islandJustCleared) {
      state.save.clearedIslands.push(state.island.id);
      // Unlock corresponding spell
      const spell = SPELLS.find(s => s.unlockedBy === state.island.subject);
      if (spell && !state.save.spellsKnown.includes(spell.id)) {
        state.save.spellsKnown.push(spell.id);
      }
      // Unlock corresponding pet
      const pet = (typeof PETS !== 'undefined')
        ? PETS.find(p => p.unlockedBy === state.island.subject)
        : null;
      if (pet && !state.save.pets.includes(pet.id)) {
        state.save.pets.push(pet.id);
        petUnlocked = pet;
      }
    }
    persistSave(state.save);

    setTimeout(() => {
      onResolve && onResolve({
        result: 'victory',
        rewards: { xp, mp, leveledUp, islandJustCleared },
        islandCleared: islandJustCleared,
        spellUnlocked: islandJustCleared
          ? SPELLS.find(s => s.unlockedBy === state.island.subject)
          : null,
        petUnlocked,
        enemy,
        gameComplete: enemy.final,
      });
    }, 1200);
  }

  function defeat() {
    Audio.defeat();
    // Restore some HP/MP so they can try again
    state.save.hp = state.save.maxHp;
    state.save.mp = state.save.maxMp;
    persistSave(state.save);
    setTimeout(() => {
      onResolve && onResolve({
        result: 'defeat',
        enemy: state.enemy,
      });
    }, 1500);
  }

  function uniq(arr) { return [...new Set(arr)]; }

  function checkLevelUp(save) {
    const threshold = save.level * 60;
    if (save.xp >= threshold) {
      save.level++;
      save.maxHp += 15;
      save.maxMp += 5;
      save.hp = save.maxHp;
      save.mp = save.maxMp;
      Audio.levelUp();
      return true;
    }
    return false;
  }

  return { start };
})();
