/* =====================================================
   PhilipG — Main Game Controller
   Owns screen transitions, player selection, world map,
   island view, and connects everything to the battle system.
   ===================================================== */

const UI = (() => {
  const screens = ['player-select', 'map', 'island', 'battle', 'result'];

  function showScreen(name) {
    screens.forEach(s => {
      const el = document.getElementById('screen-' + s);
      const active = (s === name);
      el.classList.toggle('active', active);
      el.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
  }

  return { showScreen };
})();

const Game = (() => {
  let currentSave = null;
  let currentIsland = null;

  // ---------- Init ----------
  function init() {
    // Player select avatars
    document.getElementById('avatar-philip-slot').innerHTML = getSprite('philipWizard');
    document.getElementById('avatar-owen-slot').innerHTML = getSprite('owenWizard');

    // Save summaries
    refreshPlayerCards();

    // Player select handlers
    document.querySelectorAll('.player-card').forEach(card => {
      card.addEventListener('click', () => {
        Audio.click();
        const player = card.dataset.player;
        startPlayer(player);
      });
    });

    // Reset progress
    document.getElementById('reset-progress-btn').addEventListener('click', () => {
      if (confirm('Reset ALL progress for both players? This cannot be undone.')) {
        wipeAllSaves();
        refreshPlayerCards();
      }
    });

    // Map back -> player select
    document.getElementById('map-back-btn').addEventListener('click', () => {
      Audio.click();
      UI.showScreen('player-select');
      refreshPlayerCards();
    });
    document.getElementById('island-back-btn').addEventListener('click', () => {
      Audio.click();
      UI.showScreen('map');
      renderMap();
    });

    // Spellbook
    document.getElementById('spellbook-btn').addEventListener('click', openSpellbook);
    document.getElementById('island-spellbook-btn').addEventListener('click', openSpellbook);
    document.getElementById('spellbook-close-btn').addEventListener('click', () => {
      document.getElementById('spellbook-modal').hidden = true;
    });
    document.getElementById('spellbook-modal').addEventListener('click', (e) => {
      if (e.target.id === 'spellbook-modal') {
        document.getElementById('spellbook-modal').hidden = true;
      }
    });

    // Result continue
    document.getElementById('result-continue-btn').addEventListener('click', () => {
      Audio.click();
      // Return to the island view (or map if final boss)
      if (currentSave.clearedIslands.includes('boss')) {
        UI.showScreen('map');
        renderMap();
      } else if (currentIsland) {
        UI.showScreen('island');
        renderIsland();
      } else {
        UI.showScreen('map');
        renderMap();
      }
    });

    // Battle flee
    document.getElementById('flee-btn').addEventListener('click', () => {
      Audio.click();
      UI.showScreen('island');
      renderIsland();
    });

    UI.showScreen('player-select');
  }

  function refreshPlayerCards() {
    document.querySelectorAll('[data-progress-for]').forEach(el => {
      const player = el.dataset.progressFor;
      el.textContent = getSaveSummary(player);
    });
  }

  // ---------- Player Start ----------
  function startPlayer(player) {
    currentSave = loadSave(player);
    Game._save = currentSave; // expose for Walker
    document.getElementById('hud-player-name').textContent =
      player === 'philip' ? 'Philip' : 'Owen';
    refreshHud();
    UI.showScreen('map');
    renderMap();
  }

  // Used by Walker module — enter an island when walked onto
  function enterIslandFromWalker(island) {
    currentIsland = island;
    UI.showScreen('island');
    renderIsland();
  }

  function refreshHud() {
    if (!currentSave) return;
    document.getElementById('hud-hp').textContent = `${currentSave.hp}/${currentSave.maxHp}`;
    document.getElementById('hud-mp').textContent = `${currentSave.mp}/${currentSave.maxMp}`;
    document.getElementById('hud-lv').textContent = currentSave.level;
  }

  // ---------- World Map ----------
  function renderMap() {
    refreshHud();
    const container = document.getElementById('map-islands');
    container.innerHTML = '';
    ISLANDS.forEach(island => {
      const unlocked = isIslandUnlocked(island, currentSave);
      const cleared = isIslandCleared(island, currentSave);
      const el = document.createElement('div');
      el.className = 'map-island' + (unlocked ? '' : ' locked') + (cleared ? ' cleared' : '');
      el.dataset.islandId = island.id;
      el.style.left = island.pos.x + '%';
      el.style.top = island.pos.y + '%';
      el.innerHTML = `
        ${getSprite(island.sprite)}
        <div class="island-label">${island.name}
          <span class="island-status">${cleared ? '✓ Cleared' : unlocked ? '' : '🔒 Locked'}</span>
        </div>
      `;
      el.addEventListener('click', () => {
        if (!unlocked) {
          if (island.requiresAll) flashHint('Clear all 4 islands to unlock the Dark Citadel!');
          return;
        }
        // Walk toward the island instead of teleporting; if already close, enter.
        Audio.click();
        Walker.walkTo(island.pos.x, island.pos.y);
      });
      container.appendChild(el);
    });
    Walker.mount();
  }

  function flashHint(msg) {
    const hint = document.querySelector('#screen-map .map-hint');
    const old = hint.textContent;
    hint.textContent = msg;
    hint.parentElement.classList.add('shake');
    setTimeout(() => {
      hint.textContent = old;
      hint.parentElement.classList.remove('shake');
    }, 2200);
  }

  // ---------- Island View ----------
  function renderIsland() {
    if (!currentIsland) { UI.showScreen('map'); return; }
    refreshHud();
    document.getElementById('island-name').textContent = currentIsland.name;
    document.getElementById('island-hp').textContent = `${currentSave.hp}/${currentSave.maxHp}`;
    document.getElementById('island-mp').textContent = `${currentSave.mp}/${currentSave.maxMp}`;
    document.getElementById('island-bg').innerHTML = getSprite(currentIsland.bg);
    const container = document.getElementById('island-enemies');
    container.innerHTML = '';
    currentIsland.enemies.forEach(enemy => {
      const defeated = currentSave.defeatedEnemies.includes(enemy.id);
      const el = document.createElement('div');
      el.className = 'island-enemy' + (defeated ? ' defeated' : '') + (enemy.boss ? ' boss' : '');
      el.innerHTML = `
        ${getSprite(enemy.sprite)}
        <div class="enemy-label">${enemy.name}${enemy.boss ? ' 👑' : ''}</div>
        <div class="enemy-hp-mini">${defeated ? '✓ Defeated' : `HP ${enemy.hp}`}</div>
      `;
      if (!defeated) {
        el.addEventListener('click', () => {
          Audio.click();
          startBattle(enemy);
        });
      }
      container.appendChild(el);
    });

    // Hint
    const allDefeated = currentIsland.enemies.every(e => currentSave.defeatedEnemies.includes(e.id));
    const hintEl = document.getElementById('island-hint');
    if (allDefeated) {
      hintEl.textContent = '🏆 Island Cleared! Head back to the map.';
    } else {
      hintEl.textContent = 'Tap an enemy to battle!';
    }
  }

  // ---------- Battle ----------
  function startBattle(enemy) {
    Battle.start({ save: currentSave, enemy, island: currentIsland }, onBattleEnd);
  }

  function onBattleEnd(result) {
    currentSave = loadSave(currentSave.player); // refresh from disk (battle saved it)
    Game._save = currentSave;
    refreshHud();
    showResultScreen(result);
  }

  function showResultScreen(result) {
    const title = document.getElementById('result-title');
    const msg = document.getElementById('result-message');
    const rewards = document.getElementById('result-rewards');
    rewards.innerHTML = '';

    if (result.result === 'victory') {
      title.textContent = result.gameComplete ? '🏆 You Win!' : 'Victory!';
      msg.textContent = result.gameComplete
        ? 'You defeated Dark Philip and saved the islands!'
        : `You defeated ${result.enemy.name}!`;
      const lines = [
        `+${result.rewards.xp} XP`,
        `+${result.rewards.mp} MP restored`,
      ];
      if (result.rewards.leveledUp) lines.push(`⭐ LEVEL UP! Now Lv ${currentSave.level}`);
      if (result.islandCleared) lines.push(`🏝️ Island cleared!`);
      if (result.spellUnlocked) lines.push(`📖 New spell: ${result.spellUnlocked.icon} ${result.spellUnlocked.name}`);
      if (result.petUnlocked) lines.push(`🐾 New pet: ${result.petUnlocked.icon} ${result.petUnlocked.name} — ${result.petUnlocked.desc}`);
      lines.forEach(l => {
        const div = document.createElement('div');
        div.className = 'reward-line';
        div.textContent = l;
        rewards.appendChild(div);
      });
    } else {
      title.textContent = 'Defeated';
      msg.textContent = `${result.enemy.name} was too strong this time. Try again!`;
    }

    UI.showScreen('result');
  }

  // ---------- Spellbook + Pets ----------
  function openSpellbook() {
    Audio.click();
    const list = document.getElementById('spellbook-list');
    list.innerHTML = '';

    // Section: Spells
    const spellsHeader = document.createElement('div');
    spellsHeader.className = 'spellbook-section-header';
    spellsHeader.textContent = '📖 Spells';
    list.appendChild(spellsHeader);

    SPELLS.forEach(spell => {
      const known = currentSave.spellsKnown.includes(spell.id);
      const div = document.createElement('div');
      div.className = 'spellbook-entry' + (known ? '' : ' locked');
      div.innerHTML = `
        <div class="icon">${known ? spell.icon : '🔒'}</div>
        <div class="info">
          <div class="name">${spell.name}</div>
          <div class="desc">${spell.desc}</div>
          <div class="meta">${known ? `${spell.mpCost} MP • ${spell.subject === 'any' ? 'Any subject' : spell.subject}` : `Unlock by clearing the ${spell.unlockedBy} island`}</div>
        </div>
      `;
      list.appendChild(div);
    });

    // Section: Pets
    if (typeof PETS !== 'undefined') {
      const petsHeader = document.createElement('div');
      petsHeader.className = 'spellbook-section-header';
      petsHeader.textContent = '🐾 Pets';
      list.appendChild(petsHeader);

      PETS.forEach(pet => {
        const owned = currentSave.pets.includes(pet.id);
        const div = document.createElement('div');
        div.className = 'spellbook-entry pet-entry' + (owned ? '' : ' locked');
        div.innerHTML = `
          <div class="pet-icon-sprite">${owned ? getSprite(pet.sprite) : '<span class="big-lock">🔒</span>'}</div>
          <div class="info">
            <div class="name">${pet.icon} ${pet.name}</div>
            <div class="desc">${pet.desc}</div>
            <div class="meta">${owned ? 'Active — fights with you' : `Unlock by defeating the ${pet.unlockedBy} boss`}</div>
          </div>
        `;
        list.appendChild(div);
      });
    }

    document.getElementById('spellbook-modal').hidden = false;
  }

  // Keep _save in sync after any internal update
  function syncSave() { Game._save = currentSave; }

  return {
    init,
    _enterIsland: enterIslandFromWalker,
    _syncSave: syncSave,
  };
})();

// =====================================================
// Walker — player avatar movement on the world map
// =====================================================
const Walker = (() => {
  const STEP = 4;                    // % per movement step
  const ENTER_THRESHOLD = 9;         // % distance to trigger "near"
  let walkerEl = null;
  let promptEl = null;
  let canvasEl = null;
  let keys = {};
  let raf = null;
  let initialized = false;
  let facingLeft = false;
  let onIslandId = null;

  function init() {
    if (initialized) return;
    initialized = true;
    walkerEl = document.getElementById('map-walker');
    promptEl = document.getElementById('map-prompt');
    canvasEl = document.getElementById('map-canvas');

    // Keyboard listeners (apply only when map is the active screen)
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup',   onKeyup);

    // D-pad: hold-to-move
    document.querySelectorAll('.dpad').forEach(btn => {
      const dir = btn.dataset.dir;
      const start = (e) => { e.preventDefault(); keys[dir] = true; ensureLoop(); };
      const end   = (e) => { e.preventDefault(); keys[dir] = false; };
      btn.addEventListener('pointerdown', start);
      btn.addEventListener('pointerup', end);
      btn.addEventListener('pointercancel', end);
      btn.addEventListener('pointerleave', end);
    });

    // Tap the prompt to enter the island under the walker
    promptEl.addEventListener('click', () => {
      if (onIslandId) enterIsland(onIslandId);
    });
  }

  function mount() {
    init();
    const save = currentGetSave();
    if (!save) return;
    const sprite = save.player === 'philip' ? 'walkPhilip' : 'walkOwen';
    walkerEl.innerHTML = getSprite(sprite);
    const pos = save.playerPos || { x: 50, y: 50 };
    walkerEl.style.left = pos.x + '%';
    walkerEl.style.top  = pos.y + '%';
    checkProximity();
  }

  function onKeydown(e) {
    if (!isMapActive()) return;
    const mapped = mapKey(e.key);
    if (!mapped) return;
    e.preventDefault();
    keys[mapped] = true;
    ensureLoop();
    if (e.key === 'Enter' || e.key === ' ') {
      if (onIslandId) enterIsland(onIslandId);
    }
  }
  function onKeyup(e) {
    const mapped = mapKey(e.key);
    if (mapped) keys[mapped] = false;
  }
  function mapKey(k) {
    const lower = (k || '').toLowerCase();
    if (lower === 'arrowup'    || lower === 'w') return 'up';
    if (lower === 'arrowdown'  || lower === 's') return 'down';
    if (lower === 'arrowleft'  || lower === 'a') return 'left';
    if (lower === 'arrowright' || lower === 'd') return 'right';
    return null;
  }
  function isMapActive() {
    const map = document.getElementById('screen-map');
    return map && map.classList.contains('active');
  }

  function ensureLoop() {
    if (raf) return;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - last) / 16.67, 2); // normalized frames
      last = now;
      const anyKey = keys.up || keys.down || keys.left || keys.right;
      if (anyKey && isMapActive()) {
        const save = currentGetSave();
        if (save) {
          let p = save.playerPos || { x: 50, y: 50 };
          let dx = 0, dy = 0;
          if (keys.up)    dy -= STEP * dt;
          if (keys.down)  dy += STEP * dt;
          if (keys.left)  { dx -= STEP * dt; facingLeft = true; }
          if (keys.right) { dx += STEP * dt; facingLeft = false; }
          // normalize diagonal
          if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }
          p = {
            x: clamp(p.x + dx, 6, 94),
            y: clamp(p.y + dy, 10, 86),
          };
          save.playerPos = p;
          walkerEl.style.left = p.x + '%';
          walkerEl.style.top  = p.y + '%';
          walkerEl.classList.toggle('facing-left', facingLeft);
          if (!walkerEl.classList.contains('bobbing')) {
            walkerEl.classList.add('bobbing');
            setTimeout(() => walkerEl.classList.remove('bobbing'), 300);
          }
          // Save sparingly (every ~300ms)
          if (!Walker._lastSave || now - Walker._lastSave > 300) {
            Walker._lastSave = now;
            persistSave(save);
          }
          checkProximity();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  function checkProximity() {
    const save = currentGetSave();
    if (!save) return;
    const p = save.playerPos || { x: 50, y: 50 };
    let nearestId = null;
    let nearestDist = Infinity;

    document.querySelectorAll('.map-island').forEach(el => {
      const id = el.dataset.islandId;
      const island = getIslandById(id);
      if (!island) return;
      const unlocked = isIslandUnlocked(island, save);
      const dist = Math.hypot(island.pos.x - p.x, island.pos.y - p.y);
      const near = dist < ENTER_THRESHOLD && unlocked;
      el.classList.toggle('near', near);
      if (near && dist < nearestDist) {
        nearestDist = dist;
        nearestId = id;
      }
    });

    onIslandId = nearestId;
    if (nearestId) {
      const island = getIslandById(nearestId);
      promptEl.hidden = false;
      promptEl.style.left = island.pos.x + '%';
      promptEl.style.top  = (island.pos.y - 14) + '%';
      promptEl.innerHTML = `▶ Enter ${island.name}`;
    } else {
      promptEl.hidden = true;
    }
  }

  // Auto-walk toward (x, y) and enter when adjacent
  function walkTo(targetX, targetY) {
    const save = currentGetSave();
    if (!save) return;
    const steps = 24;
    let i = 0;
    clearInterval(Walker._auto);
    Walker._auto = setInterval(() => {
      i++;
      const p = save.playerPos || { x: 50, y: 50 };
      const dx = targetX - p.x;
      const dy = targetY - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 4 || i > steps) {
        clearInterval(Walker._auto);
        Walker._auto = null;
        checkProximity();
        // Auto-enter if we arrived at an unlocked island
        if (onIslandId) {
          setTimeout(() => enterIsland(onIslandId), 200);
        }
        return;
      }
      facingLeft = dx < 0;
      const step = Math.min(dist, 5);
      save.playerPos = {
        x: clamp(p.x + (dx / dist) * step, 6, 94),
        y: clamp(p.y + (dy / dist) * step, 10, 86),
      };
      walkerEl.style.left = save.playerPos.x + '%';
      walkerEl.style.top  = save.playerPos.y + '%';
      walkerEl.classList.toggle('facing-left', facingLeft);
      walkerEl.classList.add('bobbing');
      setTimeout(() => walkerEl.classList.remove('bobbing'), 250);
      checkProximity();
    }, 120);
    persistSave(save);
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function currentGetSave() { return Game._currentSave(); }

  return { init, mount, walkTo };
})();

// Expose current save read-only for the walker
Game._currentSave = (function() {
  // Defined after Game; bind on init below
  return () => null;
})();

// Inject save accessor + island enter helper into game scope after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
  Game._currentSave = () => Game._save;
});

// Helper that lives outside Game closure (called by Walker) — enters an island by id
function enterIsland(islandId) {
  const island = getIslandById(islandId);
  if (!island) return;
  if (!isIslandUnlocked(island, Game._currentSave())) return;
  Audio.click();
  Game._enterIsland(island);
}

