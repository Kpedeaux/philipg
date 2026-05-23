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
    document.getElementById('hud-player-name').textContent =
      player === 'philip' ? 'Philip' : 'Owen';
    refreshHud();
    UI.showScreen('map');
    renderMap();
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
        Audio.click();
        currentIsland = island;
        UI.showScreen('island');
        renderIsland();
      });
      container.appendChild(el);
    });
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

  // ---------- Spellbook ----------
  function openSpellbook() {
    Audio.click();
    const list = document.getElementById('spellbook-list');
    list.innerHTML = '';
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
    document.getElementById('spellbook-modal').hidden = false;
  }

  return { init };
})();

// Boot
document.addEventListener('DOMContentLoaded', Game.init);
