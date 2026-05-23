/* =====================================================
   PhilipG — Pet System
   Pets fight alongside the wizard. Each one unlocks
   when the matching island boss is defeated.
   Effects apply automatically every round.
   ===================================================== */

const PETS = [
  {
    id: 'drake',
    name: 'Pyro Drake',
    icon: '🐲',
    sprite: 'petDrake',
    unlockedBy: 'math',          // unlocked by clearing Math Mountain
    desc: 'Breathes fire on the enemy each round (+10 damage).',
    effect: { type: 'attack', value: 10 },
  },
  {
    id: 'owl',
    name: 'Wise Owl',
    icon: '🦉',
    sprite: 'petOwl',
    unlockedBy: 'reading',
    desc: 'Restores +5 extra MP each correct answer.',
    effect: { type: 'mpRegen', value: 5 },
  },
  {
    id: 'toad',
    name: 'Toxic Toad',
    icon: '🐸',
    sprite: 'petToad',
    unlockedBy: 'spelling',
    desc: 'Heals you for 4 HP each round.',
    effect: { type: 'heal', value: 4 },
  },
  {
    id: 'wolf',
    name: 'Storm Wolf',
    icon: '🐺',
    sprite: 'petWolf',
    unlockedBy: 'grammar',
    desc: 'Adds +8 damage to every spell you cast.',
    effect: { type: 'bonus', value: 8 },
  },

  // ===== Tier 2 pets — found on the advanced islands =====
  {
    id: 'fox',
    name: 'Crystal Fox',
    icon: '🦊',
    sprite: 'petCrystalFox',
    unlockedBy: 'atoll',
    desc: 'Shield reduces enemy attack damage by 5.',
    effect: { type: 'shield', value: 5 },
  },
  {
    id: 'phoenix',
    name: 'Aurora Phoenix',
    icon: '🦅',
    sprite: 'petPhoenix',
    unlockedBy: 'mystery',
    desc: '25% chance to land a critical strike (double spell damage).',
    effect: { type: 'crit', value: 25 },
  },
  {
    id: 'cat',
    name: 'Spectral Cat',
    icon: '🐈',
    sprite: 'petSpectralCat',
    unlockedBy: 'sanctum',
    desc: 'Heals you for an extra 6 HP each round.',
    effect: { type: 'heal', value: 6 },
  },
  {
    id: 'icewolf',
    name: 'Frost Wolf',
    icon: '🐺',
    sprite: 'petIceWolf',
    unlockedBy: 'woods',
    desc: 'Auto-attacks the enemy for 18 damage each round.',
    effect: { type: 'attack', value: 18 },
  },
];

function getPetById(id) {
  return PETS.find(p => p.id === id);
}

function getOwnedPets(save) {
  return (save.pets || []).map(getPetById).filter(Boolean);
}

// Sum up the effect of a given type across all owned pets.
// Used inline by the battle system.
function petEffectFor(save, type) {
  return getOwnedPets(save).reduce((sum, p) => {
    return sum + (p.effect.type === type ? p.effect.value : 0);
  }, 0);
}
