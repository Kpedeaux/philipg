/* =====================================================
   PhilipG — Islands & Enemies
   Tier 1: 4 themed islands + Dark Citadel
   Tier 2: 4 advanced islands the dark wizard escapes to.

   The dark wizard is player-aware:
     - When Philip plays, the boss is Dark Owen
     - When Owen plays, the boss is Dark Philip
   Look for darkWizard: true on enemies. Sprite/name resolved at render.
   ===================================================== */

const ISLANDS = [
  // ===== Tier 1: original 4 themed islands =====
  {
    id: 'math',
    name: 'Math Mountain',
    subject: 'math',
    tier: 1,
    pos: { x: 16, y: 22 },
    sprite: 'islandMath',
    bg: 'bgMathMountain',
    enemies: [
      { id: 'm1', name: 'Counting Slime',      sprite: 'countingSlime',  hp: 40,  dmg: 10, pos: { x: 22, y: 50 } },
      { id: 'm2', name: 'Number Golem',        sprite: 'numberGolem',    hp: 55,  dmg: 12, pos: { x: 50, y: 60 } },
      { id: 'm3', name: 'Geometro Beast',      sprite: 'geometroBeast',  hp: 70,  dmg: 14, pos: { x: 78, y: 50 } },
      { id: 'wp-math', name: 'Wild Pyro Drake',sprite: 'petDrake',       hp: 80,  dmg: 14, wildPet: 'drake', pos: { x: 50, y: 80 } },
      { id: 'mb', name: 'Math Master',         sprite: 'mathMasterBoss', hp: 110, dmg: 18, boss: true, requiresPet: 'drake', pos: { x: 50, y: 22 } },
    ],
  },
  {
    id: 'reading',
    name: 'Reading Reef',
    subject: 'reading',
    tier: 1,
    pos: { x: 84, y: 22 },
    sprite: 'islandReading',
    bg: 'bgReadingReef',
    enemies: [
      { id: 'r1', name: 'Story Eel',           sprite: 'storyEel',         hp: 50,  dmg: 12, pos: { x: 22, y: 50 } },
      { id: 'r2', name: 'Vocab Siren',         sprite: 'vocabSiren',       hp: 65,  dmg: 14, pos: { x: 50, y: 60 } },
      { id: 'r3', name: 'Book Kraken',         sprite: 'bookKraken',       hp: 80,  dmg: 16, pos: { x: 78, y: 50 } },
      { id: 'wp-reading', name: 'Wild Wise Owl',sprite: 'petOwl',          hp: 95,  dmg: 16, wildPet: 'owl', pos: { x: 50, y: 80 } },
      { id: 'rb', name: 'Reading Titan',       sprite: 'readingTitanBoss', hp: 120, dmg: 20, boss: true, requiresPet: 'owl', pos: { x: 50, y: 22 } },
    ],
  },
  {
    id: 'spelling',
    name: 'Spelling Swamp',
    subject: 'spelling',
    tier: 1,
    pos: { x: 16, y: 55 },
    sprite: 'islandSpelling',
    bg: 'bgSpellingSwamp',
    enemies: [
      { id: 's1', name: 'Letter Imp',          sprite: 'letterImp',         hp: 60,  dmg: 13, pos: { x: 22, y: 50 } },
      { id: 's2', name: 'Silent E Goblin',     sprite: 'silentEGoblin',     hp: 75,  dmg: 15, pos: { x: 50, y: 60 } },
      { id: 's3', name: 'Punctuation Ghost',   sprite: 'punctuationGhost',  hp: 90,  dmg: 17, pos: { x: 78, y: 50 } },
      { id: 'wp-spelling', name: 'Wild Toxic Toad', sprite: 'petToad',      hp: 105, dmg: 17, wildPet: 'toad', pos: { x: 50, y: 80 } },
      { id: 'sb', name: 'Spelling Hydra',      sprite: 'spellingHydraBoss', hp: 135, dmg: 22, boss: true, requiresPet: 'toad', pos: { x: 50, y: 22 } },
    ],
  },
  {
    id: 'grammar',
    name: 'Grammar Grove',
    subject: 'grammar',
    tier: 1,
    pos: { x: 84, y: 55 },
    sprite: 'islandGrammar',
    bg: 'bgGrammarGrove',
    enemies: [
      { id: 'g1', name: 'Noun Nymph',          sprite: 'nounNymph',         hp: 70,  dmg: 14, pos: { x: 22, y: 50 } },
      { id: 'g2', name: 'Verb Vixen',          sprite: 'verbVixen',         hp: 85,  dmg: 16, pos: { x: 50, y: 60 } },
      { id: 'g3', name: 'Adjective Axolotl',   sprite: 'adjectiveAxolotl',  hp: 100, dmg: 18, pos: { x: 78, y: 50 } },
      { id: 'wp-grammar', name: 'Wild Storm Wolf', sprite: 'petWolf',       hp: 115, dmg: 18, wildPet: 'wolf', pos: { x: 50, y: 80 } },
      { id: 'gb', name: 'Grammar Dragon',      sprite: 'grammarDragonBoss', hp: 150, dmg: 24, boss: true, requiresPet: 'wolf', pos: { x: 50, y: 22 } },
    ],
  },

  // ===== Dark Citadel (first dark wizard fight) =====
  {
    id: 'boss',
    name: 'Dark Citadel',
    subject: 'any',
    tier: 'dark',
    pos: { x: 50, y: 38 },
    sprite: 'islandBoss',
    bg: 'bgFinalBoss',
    requiresAll: true,
    enemies: [
      { id: 'dark-boss', name: '', sprite: '', boss: true, darkWizard: true, hp: 250, dmg: 28, pos: { x: 50, y: 45 } },
    ],
  },

  // ===== Tier 2: dark wizard escapes here as the player keeps winning =====
  {
    id: 'atoll',
    name: 'Algebra Atoll',
    subject: 'math',
    tier: 2,
    tier2Index: 0,   // unlocks after 1st dark defeat
    pos: { x: 14, y: 80 },
    sprite: 'islandMath',
    bg: 'bgMathMountain',
    enemies: [
      { id: 'a1', name: 'Shadow Cipher',  sprite: 'numberGolem',   hp: 90,  dmg: 18, pos: { x: 22, y: 50 } },
      { id: 'a2', name: 'Equation Wraith', sprite: 'geometroBeast', hp: 110, dmg: 20, pos: { x: 78, y: 50 } },
      { id: 'dark-atoll', name: '', sprite: '', boss: true, darkWizard: true, hp: 300, dmg: 30, pos: { x: 50, y: 25 } },
    ],
  },
  {
    id: 'mystery',
    name: 'Mystery Mountain',
    subject: 'reading',
    tier: 2,
    tier2Index: 1,
    pos: { x: 38, y: 88 },
    sprite: 'islandReading',
    bg: 'bgReadingReef',
    enemies: [
      { id: 'my1', name: 'Riddle Wraith', sprite: 'storyEel',   hp: 100, dmg: 19, pos: { x: 22, y: 50 } },
      { id: 'my2', name: 'Plot Phantom',  sprite: 'bookKraken', hp: 125, dmg: 21, pos: { x: 78, y: 50 } },
      { id: 'dark-mystery', name: '', sprite: '', boss: true, darkWizard: true, hp: 330, dmg: 32, pos: { x: 50, y: 25 } },
    ],
  },
  {
    id: 'sanctum',
    name: 'Storyteller Sanctum',
    subject: 'spelling',
    tier: 2,
    tier2Index: 2,
    pos: { x: 62, y: 88 },
    sprite: 'islandSpelling',
    bg: 'bgSpellingSwamp',
    enemies: [
      { id: 'st1', name: 'Cursed Quill',    sprite: 'letterImp',         hp: 115, dmg: 20, pos: { x: 22, y: 50 } },
      { id: 'st2', name: 'Whispering Ghost',sprite: 'punctuationGhost',  hp: 140, dmg: 22, pos: { x: 78, y: 50 } },
      { id: 'dark-sanctum', name: '', sprite: '', boss: true, darkWizard: true, hp: 360, dmg: 34, pos: { x: 50, y: 25 } },
    ],
  },
  {
    id: 'woods',
    name: 'Wisdom Woods',
    subject: 'grammar',
    tier: 2,
    tier2Index: 3,
    pos: { x: 86, y: 80 },
    sprite: 'islandGrammar',
    bg: 'bgGrammarGrove',
    enemies: [
      { id: 'w1', name: 'Phrase Phantom',  sprite: 'nounNymph',         hp: 130, dmg: 22, pos: { x: 22, y: 50 } },
      { id: 'w2', name: 'Clause Beast',    sprite: 'verbVixen',         hp: 155, dmg: 24, pos: { x: 78, y: 50 } },
      { id: 'dark-woods', name: '', sprite: '', boss: true, darkWizard: true, hp: 400, dmg: 36, pos: { x: 50, y: 25 } },
    ],
  },
];

// Ordered list of tier-2 island ids the dark wizard escapes through
const DARK_PROGRESSION = ['boss', 'atoll', 'mystery', 'sanctum', 'woods'];

function getIslandById(id) {
  return ISLANDS.find(i => i.id === id);
}

function isIslandUnlocked(island, save) {
  if (island.requiresAll) {
    // Dark Citadel needs all 4 tier-1 islands cleared
    return ISLANDS
      .filter(i => i.tier === 1)
      .every(i => save.clearedIslands.includes(i.id));
  }
  if (island.tier === 2) {
    // Tier-2 island unlocks once the dark wizard has fled to it.
    // tier2Index 0 unlocks after 1 dark defeat, etc.
    return (save.darkDefeats || 0) > island.tier2Index;
  }
  return true; // tier-1 always unlocked
}

function isIslandCleared(island, save) {
  const cleared = save.defeatedEnemies || [];
  return island.enemies.every(e => cleared.includes(e.id));
}

// Boss locked because the player hasn't tamed the required wild pet?
function isEnemyLocked(enemy, save) {
  if (enemy.requiresPet) {
    return !(save.pets || []).includes(enemy.requiresPet);
  }
  return false;
}

// Resolve the dark wizard's appearance based on the active player.
// Philip fights Dark Owen. Owen fights Dark Philip.
function resolveDarkWizard(enemy, save) {
  if (!enemy.darkWizard) return enemy;
  const isPhilip = save.player === 'philip';
  const oppositeName = isPhilip ? 'Dark Owen' : 'Dark Philip';
  const oppositeSprite = isPhilip ? 'darkOwen' : 'darkPhilip';
  return Object.assign({}, enemy, {
    name: oppositeName,
    sprite: oppositeSprite,
  });
}

// Where the dark wizard currently lives
function getDarkLocation(save) {
  return save.darkLocation || 'boss';
}

// Move the dark wizard to the next island. Returns the new location (or null if done).
function advanceDarkLocation(save) {
  const cur = getDarkLocation(save);
  const i = DARK_PROGRESSION.indexOf(cur);
  if (i < 0 || i >= DARK_PROGRESSION.length - 1) {
    save.darkLocation = 'done';
    return null;
  }
  save.darkLocation = DARK_PROGRESSION[i + 1];
  return save.darkLocation;
}
