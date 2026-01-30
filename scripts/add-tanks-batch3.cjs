const fs = require('fs');

const unitsPath = './public/data/units.json';
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

const tanks = [
  {
    id: units.length + 1,
    name: "Puma",
    description: "A fast, agile tank with high defense and dodge.",
    imageUrl: "/images/units/puma.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 5,
    unlockLevel: 27,
    productionTime: 67320,
    cost: [{ type: "Gold", amount: 17000 }, { type: "Steel", amount: 1750 }, { type: "Oil", amount: 1400 }, { type: "Merits", amount: 30 }],
    blocking: "Partial",
    maxRank: 6,
    immunities: ["Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 120, armor: 65, bravery: 30, defense: 45, dodge: 30, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 130, armor: 70, bravery: 35, defense: 50, dodge: 35, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 145, armor: 80, bravery: 40, defense: 55, dodge: 40, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 155, armor: 85, bravery: 45, defense: 60, dodge: 45, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 170, armor: 90, bravery: 50, defense: 65, dodge: 50, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 180, armor: 100, bravery: 50, defense: 70, dodge: 55, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Light Tank Gun",
        damageType: "Explosive",
        lineOfFire: "Direct",
        ammo: -1,
        ammoUsed: 1,
        reloadTime: 0,
        cooldown: 2,
        range: { min: 1, max: 3 },
        armorPiercing: 75,
        suppressionMod: { multiplier: 0.5 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 60, max: 90 }, offense: 30, criticalChance: 5 },
          { level: 2, damage: { min: 66, max: 99 }, offense: 30, criticalChance: 5 },
          { level: 3, damage: { min: 72, max: 108 }, offense: 35, criticalChance: 5 },
          { level: 4, damage: { min: 78, max: 117 }, offense: 40, criticalChance: 5 },
          { level: 5, damage: { min: 84, max: 126 }, offense: 50, criticalChance: 5 },
          { level: 6, damage: { min: 84, max: 126 }, offense: 50, criticalChance: 5 }
        ]
      }
    ]
  },
  {
    id: units.length + 2,
    name: "Dragon",
    description: "A rocket artillery tank that fires incendiary rockets with a chance to set targets on fire.",
    imageUrl: "/images/units/dragon.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 9,
    unlockLevel: 42,
    productionTime: 58320,
    cost: [{ type: "Gold", amount: 42000 }, { type: "Steel", amount: 3800 }, { type: "Oil", amount: 2900 }, { type: "Widgets", amount: 4 }],
    blocking: "Partial",
    maxRank: 6,
    immunities: ["Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 180, armor: 60, bravery: 25, defense: 25, dodge: 10, abilitySlots: 1, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 200, armor: 65, bravery: 30, defense: 25, dodge: 10, abilitySlots: 1, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 215, armor: 70, bravery: 35, defense: 25, dodge: 10, abilitySlots: 1, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 235, armor: 80, bravery: 40, defense: 25, dodge: 10, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 250, armor: 85, bravery: 45, defense: 25, dodge: 10, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 270, armor: 90, bravery: 50, defense: 25, dodge: 10, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Incendiary Rockets",
        damageType: "Fire",
        lineOfFire: "Indirect",
        ammo: 4,
        ammoUsed: 1,
        reloadTime: 8,
        cooldown: 0,
        prepTime: 1,
        range: { min: 2, max: 5 },
        armorPiercing: 25,
        statusEffect: { type: "Fire", chance: 80, duration: 3, damage: { min: 9, max: 41 } },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 44, max: 66 }, offense: 46, criticalChance: 5 },
          { level: 2, damage: { min: 48, max: 72 }, offense: 46, criticalChance: 5 },
          { level: 3, damage: { min: 52, max: 79 }, offense: 51, criticalChance: 5 },
          { level: 4, damage: { min: 57, max: 85 }, offense: 56, criticalChance: 5 },
          { level: 5, damage: { min: 61, max: 92 }, offense: 66, criticalChance: 5 },
          { level: 6, damage: { min: 66, max: 99 }, offense: 71, criticalChance: 5 }
        ]
      }
    ]
  },
  {
    id: units.length + 3,
    name: "Firedrake",
    description: "A flamethrower tank that excels at burning infantry at close to medium range.",
    imageUrl: "/images/units/firedrake.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 6,
    unlockLevel: 26,
    unlockCost: [{ type: "Nanopods", amount: 55 }],
    productionTime: 37800,
    cost: [],
    blocking: "Partial",
    maxRank: 6,
    immunities: ["Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 125, armor: 90, bravery: 30, defense: 30, dodge: 15, abilitySlots: 1, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 140, armor: 100, bravery: 35, defense: 35, dodge: 20, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 150, armor: 110, bravery: 40, defense: 40, dodge: 25, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 165, armor: 115, bravery: 45, defense: 45, dodge: 30, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 175, armor: 125, bravery: 50, defense: 50, dodge: 35, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 190, armor: 135, bravery: 50, defense: 55, dodge: 40, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Deep Flame",
        damageType: "Fire",
        lineOfFire: "Direct",
        ammo: 1,
        ammoUsed: 1,
        reloadTime: 2,
        cooldown: 0,
        range: { min: 1, max: 4 },
        armorPiercing: 25,
        suppressionMod: { multiplier: 1.25 },
        statusEffect: { type: "Fire", chance: 60, duration: 2, damage: { min: 11, max: 34 } },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 34, max: 56 }, offense: 56, criticalChance: 5 },
          { level: 2, damage: { min: 37, max: 61 }, offense: 61, criticalChance: 5 },
          { level: 3, damage: { min: 40, max: 67 }, offense: 66, criticalChance: 5 },
          { level: 4, damage: { min: 44, max: 72 }, offense: 71, criticalChance: 5 },
          { level: 5, damage: { min: 47, max: 78 }, offense: 76, criticalChance: 5 },
          { level: 6, damage: { min: 51, max: 84 }, offense: 81, criticalChance: 5 }
        ]
      },
      {
        name: "Spray Flame",
        damageType: "Fire",
        lineOfFire: "Direct",
        unlockRank: 3,
        ammo: 1,
        ammoUsed: 1,
        reloadTime: 2,
        cooldown: 0,
        range: { min: 1, max: 1 },
        armorPiercing: 25,
        suppressionMod: { multiplier: 1.25 },
        areaEffect: true,
        statusEffect: { type: "Fire", chance: 60, duration: 2, damage: { min: 11, max: 34 } },
        unlockCost: { time: 2160, nanos: 8 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 3, damage: { min: 40, max: 67 }, offense: 66, criticalChance: 5 },
          { level: 4, damage: { min: 44, max: 72 }, offense: 71, criticalChance: 5 },
          { level: 5, damage: { min: 47, max: 78 }, offense: 76, criticalChance: 5 },
          { level: 6, damage: { min: 51, max: 84 }, offense: 81, criticalChance: 5 }
        ]
      }
    ]
  },
  {
    id: units.length + 4,
    name: "Tempest",
    description: "A fast-firing machine gun tank with quad barrels for sustained suppression.",
    imageUrl: "/images/units/tempest.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 7,
    unlockLevel: 31,
    productionTime: 64800,
    cost: [{ type: "Gold", amount: 22000 }, { type: "Steel", amount: 2500 }, { type: "Oil", amount: 2500 }],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 130, armor: 90, bravery: 35, defense: 30, dodge: 15, abilitySlots: 1, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 145, armor: 100, bravery: 40, defense: 35, dodge: 20, abilitySlots: 1, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 155, armor: 110, bravery: 45, defense: 40, dodge: 25, abilitySlots: 1, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 170, armor: 115, bravery: 50, defense: 45, dodge: 30, abilitySlots: 2, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 180, armor: 125, bravery: 55, defense: 50, dodge: 35, abilitySlots: 2, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 195, armor: 135, bravery: 60, defense: 55, dodge: 40, abilitySlots: 2, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Quad Machine Guns",
        damageType: "Piercing",
        lineOfFire: "Direct",
        ammo: 5,
        ammoUsed: 1,
        reloadTime: 8,
        cooldown: 2,
        range: { min: 1, max: 2 },
        suppressionMod: { multiplier: 0.75 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 11, max: 13 }, offense: 36, criticalChance: 5, hits: 4 },
          { level: 2, damage: { min: 12, max: 14 }, offense: 41, criticalChance: 5, hits: 4 },
          { level: 3, damage: { min: 13, max: 15 }, offense: 46, criticalChance: 5, hits: 4 },
          { level: 4, damage: { min: 14, max: 17 }, offense: 51, criticalChance: 5, hits: 4 },
          { level: 5, damage: { min: 15, max: 18 }, offense: 56, criticalChance: 5, hits: 4 },
          { level: 6, damage: { min: 16, max: 19 }, offense: 61, criticalChance: 5, hits: 4 }
        ]
      }
    ]
  },
  {
    id: units.length + 5,
    name: "Basilisk",
    description: "A wide-spray machine gun tank that can hit multiple targets in a 2x5 area.",
    imageUrl: "/images/units/basilisk.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 9,
    unlockLevel: 41,
    unlockCost: [{ type: "Nanopods", amount: 60 }],
    productionTime: 58320,
    cost: [],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Breach", "Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 200, armor: 110, bravery: 35, defense: 30, dodge: 15, abilitySlots: 1, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 220, armor: 120, bravery: 40, defense: 35, dodge: 20, abilitySlots: 1, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 240, armor: 130, bravery: 45, defense: 40, dodge: 25, abilitySlots: 2, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 260, armor: 145, bravery: 50, defense: 45, dodge: 30, abilitySlots: 2, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 280, armor: 155, bravery: 55, defense: 50, dodge: 35, abilitySlots: 2, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 300, armor: 165, bravery: 60, defense: 55, dodge: 40, abilitySlots: 2, range: 2, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Wide Spray",
        damageType: "Piercing",
        lineOfFire: "Direct",
        ammo: 5,
        ammoUsed: 1,
        reloadTime: 8,
        cooldown: 2,
        range: { min: 1, max: 2 },
        suppressionMod: { multiplier: 0.75 },
        areaEffect: true,
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 21, max: 29 }, offense: 36, criticalChance: 5, hits: 4 },
          { level: 2, damage: { min: 23, max: 31 }, offense: 36, criticalChance: 5, hits: 4 },
          { level: 3, damage: { min: 25, max: 34 }, offense: 41, criticalChance: 5, hits: 4 },
          { level: 4, damage: { min: 27, max: 37 }, offense: 46, criticalChance: 5, hits: 4 },
          { level: 5, damage: { min: 29, max: 40 }, offense: 56, criticalChance: 5, hits: 4 },
          { level: 6, damage: { min: 31, max: 43 }, offense: 61, criticalChance: 5, hits: 4 }
        ]
      }
    ]
  }
];

units.push(...tanks);
fs.writeFileSync(unitsPath, JSON.stringify(units, null, 2));
console.log(`Added ${tanks.length} tanks. Total units: ${units.length}`);
