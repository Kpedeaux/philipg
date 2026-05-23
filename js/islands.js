/* =====================================================
   PhilipG — Islands & Enemies
   4 themed islands + final boss arena.
   Position is percentage of map (x, y).
   ===================================================== */

const ISLANDS = [
  {
    id: 'math',
    name: 'Math Mountain',
    subject: 'math',
    pos: { x: 22, y: 30 },
    sprite: 'islandMath',
    bg: 'bgMathMountain',
    enemies: [
      { id: 'm1', name: 'Counting Slime', sprite: 'countingSlime', hp: 40, dmg: 10 },
      { id: 'm2', name: 'Number Golem',   sprite: 'numberGolem',   hp: 55, dmg: 12 },
      { id: 'm3', name: 'Geometro Beast', sprite: 'geometroBeast', hp: 70, dmg: 14 },
      { id: 'mb', name: 'Math Master',    sprite: 'mathMasterBoss', hp: 110, dmg: 18, boss: true },
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
      { id: 'r1', name: 'Story Eel',      sprite: 'storyEel',     hp: 50, dmg: 12 },
      { id: 'r2', name: 'Vocab Siren',    sprite: 'vocabSiren',   hp: 65, dmg: 14 },
      { id: 'r3', name: 'Book Kraken',    sprite: 'bookKraken',   hp: 80, dmg: 16 },
      { id: 'rb', name: 'Reading Titan',  sprite: 'readingTitanBoss', hp: 120, dmg: 20, boss: true },
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
      { id: 's1', name: 'Letter Imp',         sprite: 'letterImp',     hp: 60, dmg: 13 },
      { id: 's2', name: 'Silent E Goblin',    sprite: 'silentEGoblin', hp: 75, dmg: 15 },
      { id: 's3', name: 'Punctuation Ghost',  sprite: 'punctuationGhost', hp: 90, dmg: 17 },
      { id: 'sb', name: 'Spelling Hydra',     sprite: 'spellingHydraBoss', hp: 135, dmg: 22, boss: true },
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
      { id: 'g1', name: 'Noun Nymph',         sprite: 'nounNymph',         hp: 70, dmg: 14 },
      { id: 'g2', name: 'Verb Vixen',         sprite: 'verbVixen',         hp: 85, dmg: 16 },
      { id: 'g3', name: 'Adjective Axolotl',  sprite: 'adjectiveAxolotl',  hp: 100, dmg: 18 },
      { id: 'gb', name: 'Grammar Dragon',     sprite: 'grammarDragonBoss', hp: 150, dmg: 24, boss: true },
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
      { id: 'final', name: 'Dark Philip', sprite: 'darkPhilip', hp: 250, dmg: 28, boss: true, final: true },
    ],
  },
];

function getIslandById(id) {
  return ISLANDS.find(i => i.id === id);
}

function isIslandUnlocked(island, save) {
  if (island.requiresAll) {
    // Final boss requires all 4 main islands cleared
    return ISLANDS
      .filter(i => i.id !== 'boss')
      .every(i => save.clearedIslands.includes(i.id));
  }
  return true; // base islands are open from the start
}

function isIslandCleared(island, save) {
  const cleared = save.defeatedEnemies || [];
  return island.enemies.every(e => cleared.includes(e.id));
}
