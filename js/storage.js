/* =====================================================
   PhilipG — Save System
   localStorage per player profile. Schema-versioned so we can
   migrate later without wiping kids' progress.
   ===================================================== */

const SAVE_VERSION = 1;
const SAVE_KEY_PREFIX = 'philipg.save.v1.';

function defaultSave(player) {
  return {
    version: SAVE_VERSION,
    player,                         // 'philip' | 'owen'
    grade: player === 'philip' ? 'grade1' : 'grade4',
    level: 1,
    xp: 0,
    hp: 100, maxHp: 100,
    mp: 30,  maxMp: 30,
    defeatedEnemies: [],            // enemy ids
    clearedIslands: [],             // island ids (subjects: math/reading/spelling/grammar/boss)
    spellsKnown: ['spark', 'fireball', 'heal'],
    pets: [],                       // pet ids owned (each unlocked by clearing a boss)
    playerPos: { x: 50, y: 50 },    // % position on world map
    darkLocation: 'boss',           // where the dark wizard currently lives
    darkDefeats: 0,                 // times the dark wizard has been beaten
    stats: { correct: 0, wrong: 0, battles: 0 },
    updatedAt: Date.now(),
  };
}

function loadSave(player) {
  try {
    const raw = localStorage.getItem(SAVE_KEY_PREFIX + player);
    if (!raw) return defaultSave(player);
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== SAVE_VERSION) return defaultSave(player);
    // hydrate missing fields (forward-compatible)
    return Object.assign(defaultSave(player), parsed);
  } catch (e) {
    console.warn('Save load failed, starting fresh:', e);
    return defaultSave(player);
  }
}

function persistSave(save) {
  save.updatedAt = Date.now();
  try {
    localStorage.setItem(SAVE_KEY_PREFIX + save.player, JSON.stringify(save));
  } catch (e) {
    console.warn('Save persist failed:', e);
  }
}

function wipeSave(player) {
  try { localStorage.removeItem(SAVE_KEY_PREFIX + player); }
  catch (e) { /* noop */ }
}

function wipeAllSaves() {
  ['philip', 'owen'].forEach(wipeSave);
}

function getSaveSummary(player) {
  const s = loadSave(player);
  const total = (typeof ISLANDS !== 'undefined') ? ISLANDS.length - 1 : 4; // exclude boss island
  const cleared = s.clearedIslands.filter(id => id !== 'boss').length;
  if (s.defeatedEnemies.length === 0) return 'New Game';
  if (s.clearedIslands.includes('boss')) return 'Game Cleared!';
  return `Lv ${s.level} • ${cleared}/${total} islands`;
}
