/* =====================================================
   PhilipG — Spell System
   Each spell: id, name, icon, mpCost, damage, subject
   The subject determines which question pool you draw from.
   Subject "any" means random across all subjects.
   ===================================================== */

const SPELLS = [
  // Starter spells — always unlocked
  {
    id: 'spark',
    name: 'Spark',
    icon: '✨',
    mpCost: 5,
    damage: 15,
    subject: 'any',
    desc: 'A small magical spark. Costs 5 MP.',
    unlockedFromStart: true,
  },
  {
    id: 'fireball',
    name: 'Fireball',
    icon: '🔥',
    mpCost: 10,
    damage: 25,
    subject: 'math',
    desc: 'Hurl a fireball. Math question. 25 damage.',
    unlockedFromStart: true,
  },
  // Unlocked by clearing islands
  {
    id: 'wave',
    name: 'Tidal Wave',
    icon: '🌊',
    mpCost: 12,
    damage: 30,
    subject: 'reading',
    desc: 'A great wave. Reading question. 30 damage.',
    unlockedBy: 'math',
  },
  {
    id: 'leaf',
    name: 'Leaf Storm',
    icon: '🍃',
    mpCost: 14,
    damage: 32,
    subject: 'spelling',
    desc: 'Sharp leaves. Spelling question. 32 damage.',
    unlockedBy: 'reading',
  },
  {
    id: 'thunder',
    name: 'Thunder',
    icon: '⚡',
    mpCost: 16,
    damage: 38,
    subject: 'grammar',
    desc: 'Lightning strike. Grammar question. 38 damage.',
    unlockedBy: 'spelling',
  },
  {
    id: 'meteor',
    name: 'Meteor',
    icon: '☄️',
    mpCost: 22,
    damage: 55,
    subject: 'any',
    desc: 'Massive impact. Tough question, big damage.',
    unlockedBy: 'grammar',
  },
  // Always-available restore
  {
    id: 'heal',
    name: 'Heal',
    icon: '💚',
    mpCost: 8,
    damage: 0,
    heal: 25,
    subject: 'any',
    desc: 'Restore 25 HP. Costs 8 MP.',
    unlockedFromStart: true,
  },
];

function getSpellById(id) {
  return SPELLS.find(s => s.id === id);
}

function getUnlockedSpells(clearedIslandSubjects) {
  return SPELLS.filter(s =>
    s.unlockedFromStart || clearedIslandSubjects.includes(s.unlockedBy)
  );
}
