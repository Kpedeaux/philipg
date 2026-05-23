/* =====================================================
   PhilipG — Islands & Enemies
   4 themed islands + final boss arena. Each island is now a
   walkable scene with enemies positioned absolutely (x%, y%).

   New fields on enemies:
     pos:         { x, y }   — position on the island canvas
     wildPet:     'drake'    — defeating this enemy joins this pet to your team
     requiresPet: 'drake'    — boss is locked until this pet is in your party
   ===================================================== */

const ISLANDS = [
  {
    id: 'math',
    name: 'Math Mountain',
    subject: 'math',
    pos: { x: 22, y: 30 },                    // position on the world map
    sprite: 'islandMath',
    bg: 'bgMathMountain',
    enemies: [
      { id: 'm1', name: 'Counting Slime',      sprite: 'countingSlime', hp: 40,  dmg: 10, pos: { x: 22, y: 50 } },
      { id: 'm2', name: 'Number Golem',        sprite: 'numberGolem',   hp: 55,  dmg: 12, pos: { x: 50, y: 60 } },
      { id: 'm3', name: 'Geometro Beast',      sprite: 'geometroBeast', hp: 70,  dmg: 14, pos: { x: 78, y: 50 } },
      { id: 'wp-math', name: 'Wild Pyro Drake',sprite: 'petDrake',      hp: 80,  dmg: 14, wildPet: 'drake',          pos: { x: 50, y: 80 } },
      { id: 'mb', name: 'Math Master',         sprite: 'mathMasterBoss',hp: 110, dmg: 18, boss: true, requiresPet: 'drake', pos: { x: 50, y: 22 } },
    ],
  },
  {
    id: 'reading',
    name: 'Reading Reef',
    subject: 'reading',
    pos: { x: 75, y: 28 },
    sprite: 'islandReading',
    bg: 'bgReadingReef',
    enemies: [
      { id: 'r1', name: 'Story Eel',           sprite: 'storyEel',         hp: 50,  dmg: 12, pos: { x: 22, y: 50 } },
      { id: 'r2', name: 'Vocab Siren',         sprite: 'vocabSiren',       hp: 65,  dmg: 14, pos: { x: 50, y: 60 } },
      { id: 'r3', name: 'Book Kraken',         sprite: 'bookKraken',       hp: 80,  dmg: 16, pos: { x: 78, y: 50 } },
      { id: 'wp-reading', name: 'Wild Wise Owl',sprite: 'petOwl',          hp: 95,  dmg: 16, wildPet: 'owl',           pos: { x: 50, y: 80 } },
      { id: 'rb', name: 'Reading Titan',       sprite: 'readingTitanBoss', hp: 120, dmg: 20, boss: true, requiresPet: 'owl', pos: { x: 50, y: 22 } },
    ],
  },
  {
    id: 'spelling',
    name: 'Spelling Swamp',
    subject: 'spelling',
    pos: { x: 25, y: 68 },
    sprite: 'islandSpelling',
    bg: 'bgSpellingSwamp',
    enemies: [
      { id: 's1', name: 'Letter Imp',          sprite: 'letterImp',         hp: 60,  dmg: 13, pos: { x: 22, y: 50 } },
      { id: 's2', name: 'Silent E Goblin',     sprite: 'silentEGoblin',     hp: 75,  dmg: 15, pos: { x: 50, y: 60 } },
      { id: 's3', name: 'Punctuation Ghost',   sprite: 'punctuationGhost',  hp: 90,  dmg: 17, pos: { x: 78, y: 50 } },
      { id: 'wp-spelling', name: 'Wild Toxic Toad', sprite: 'petToad',      hp: 105, dmg: 17, wildPet: 'toad',           pos: { x: 50, y: 80 } },
      { id: 'sb', name: 'Spelling Hydra',      sprite: 'spellingHydraBoss', hp: 135, dmg: 22, boss: true, requiresPet: 'toad', pos: { x: 50, y: 22 } },
    ],
  },
  {
    id: 'grammar',
    name: 'Grammar Grove',
    subject: 'grammar',
    pos: { x: 75, y: 68 },
    sprite: 'islandGrammar',
    bg: 'bgGrammarGrove',
    enemies: [
      { id: 'g1', name: 'Noun Nymph',          sprite: 'nounNymph',         hp: 70,  dmg: 14, pos: { x: 22, y: 50 } },
      { id: 'g2', name: 'Verb Vixen',          sprite: 'verbVixen',         hp: 85,  dmg: 16, pos: { x: 50, y: 60 } },
      { id: 'g3', name: 'Adjective Axolotl',   sprite: 'adjectiveAxolotl',  hp: 100, dmg: 18, pos: { x: 78, y: 50 } },
      { id: 'wp-grammar', name: 'Wild Storm Wolf', sprite: 'petWolf',       hp: 115, dmg: 18, wildPet: 'wolf',           pos: { x: 50, y: 80 } },
      { id: 'gb', name: 'Grammar Dragon',      sprite: 'grammarDragonBoss', hp: 150, dmg: 24, boss: true, requiresPet: 'wolf', pos: { x: 50, y: 22 } },
    ],
  },
  {
    id: 'boss',
    name: 'Dark Citadel',
    subject: 'any',
    pos: { x: 50, y: 50 },
    sprite: 'islandBoss',
    bg: 'bgFinalBoss',
    requiresAll: true,
    enemies: [
      { id: 'final', name: 'Dark Philip', sprite: 'darkPhilip', hp: 250, dmg: 28, boss: true, final: true, pos: { x: 50, y: 45 } },
    ],
  },
];

function getIslandById(id) {
  return ISLANDS.find(i => i.id === id);
}

function isIslandUnlocked(island, save) {
  if (island.requiresAll) {
    return ISLANDS
      .filter(i => i.id !== 'boss')
      .every(i => save.clearedIslands.includes(i.id));
  }
  return true;
}

function isIslandCleared(island, save) {
  const cleared = save.defeatedEnemies || [];
  return island.enemies.every(e => cleared.includes(e.id));
}

// New: is this boss locked because the player hasn't tamed the required wild pet?
function isEnemyLocked(enemy, save) {
  if (enemy.requiresPet) {
    return !(save.pets || []).includes(enemy.requiresPet);
  }
  return false;
}
