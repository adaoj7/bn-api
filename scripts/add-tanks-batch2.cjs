const fs = require('fs');

const unitsPath = './public/data/units.json';
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

const tanks = [
  {
    id: units.length + 1,
    name: "Super Tank",
    description: "An elite tank with exceptional durability and firepower.",
    imageUrl: "/images/units/super_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 7,
    unlockLevel: 32,
    unlockCost: [{ type: "Nanopods", amount: 70 }],
    productionTime: 50400,
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
        { level: 1, health: 340, armor: 225, bravery: 50, defense: 20, dodge: 10, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 375, armor: 250, bravery: 55, defense: 25, dodge: 15, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 405, armor: 270, bravery: 60, defense: 30, dodge: 20, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 445, armor: 295, bravery: 65, defense: 35, dodge: 25, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 475, armor: 315, bravery: 70, defense: 40, dodge: 30, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 510, armor: 340, bravery: 70, defense: 45, dodge: 35, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Tank Shell",
        damageType: "Explosive",
        lineOfFire: "Direct",
        ammo: -1,
        ammoUsed: 1,
        reloadTime: 0,
        cooldown: 2,
        range: { min: 1, max: 3 },
        armorPiercing: 75,
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 100, max: 150 }, offense: 25, criticalChance: 5 },
          { level: 2, damage: { min: 110, max: 165 }, offense: 25, criticalChance: 5 },
          { level: 3, damage: { min: 120, max: 180 }, offense: 30, criticalChance: 5 },
          { level: 4, damage: { min: 130, max: 195 }, offense: 35, criticalChance: 5 },
          { level: 5, damage: { min: 140, max: 210 }, offense: 45, criticalChance: 5 },
          { level: 6, damage: { min: 150, max: 225 }, offense: 50, criticalChance: 5 }
        ]
      },
      {
        name: "Auto-Fire",
        damageType: "Piercing",
        lineOfFire: "Direct",
        unlockRank: 2,
        ammo: 3,
        ammoUsed: 1,
        reloadTime: 5,
        cooldown: 2,
        range: { min: 1, max: 2 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Air: true, Critter: true },
        ranks: [
          { level: 2, damage: { min: 13, max: 15 }, offense: 46, criticalChance: 5, hits: 3 },
          { level: 3, damage: { min: 14, max: 16 }, offense: 51, criticalChance: 5, hits: 3 },
          { level: 4, damage: { min: 15, max: 18 }, offense: 56, criticalChance: 5, hits: 3 },
          { level: 5, damage: { min: 16, max: 19 }, offense: 66, criticalChance: 5, hits: 3 },
          { level: 6, damage: { min: 18, max: 21 }, offense: 71, criticalChance: 5, hits: 3 }
        ]
      }
    ]
  },
  {
    id: units.length + 2,
    name: "Mega Tank",
    description: "One gigantic cannon, machine guns AND rocket launchers provide versatile combat capabilities.",
    imageUrl: "/images/units/mega_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 11,
    unlockLevel: 50,
    unlockCost: [{ type: "Nanopods", amount: 85 }],
    productionTime: 45360,
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
        { level: 1, health: 375, armor: 250, bravery: 50, defense: 20, dodge: 10, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 415, armor: 275, bravery: 55, defense: 25, dodge: 15, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 450, armor: 300, bravery: 60, defense: 30, dodge: 20, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 490, armor: 325, bravery: 65, defense: 35, dodge: 25, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 525, armor: 350, bravery: 70, defense: 40, dodge: 30, abilitySlots: 3, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 565, armor: 375, bravery: 70, defense: 45, dodge: 35, abilitySlots: 3, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Tank Shell",
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
          { level: 1, damage: { min: 120, max: 180 }, offense: 30, criticalChance: 5 },
          { level: 2, damage: { min: 132, max: 198 }, offense: 35, criticalChance: 5 },
          { level: 3, damage: { min: 144, max: 216 }, offense: 40, criticalChance: 5 },
          { level: 4, damage: { min: 156, max: 234 }, offense: 45, criticalChance: 5 },
          { level: 5, damage: { min: 168, max: 252 }, offense: 50, criticalChance: 5 },
          { level: 6, damage: { min: 180, max: 270 }, offense: 55, criticalChance: 5 }
        ]
      },
      {
        name: "Auto-Fire",
        damageType: "Piercing",
        lineOfFire: "Direct",
        ammo: 3,
        ammoUsed: 1,
        reloadTime: 5,
        cooldown: 2,
        range: { min: 1, max: 2 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Air: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 25, max: 31 }, offense: 46, criticalChance: 5, hits: 3 },
          { level: 2, damage: { min: 27, max: 34 }, offense: 51, criticalChance: 5, hits: 3 },
          { level: 3, damage: { min: 30, max: 37 }, offense: 56, criticalChance: 5, hits: 3 },
          { level: 4, damage: { min: 32, max: 40 }, offense: 61, criticalChance: 5, hits: 3 },
          { level: 5, damage: { min: 35, max: 43 }, offense: 66, criticalChance: 5, hits: 3 },
          { level: 6, damage: { min: 37, max: 46 }, offense: 71, criticalChance: 5, hits: 3 }
        ]
      },
      {
        name: "Explosive Shell",
        damageType: "Explosive",
        lineOfFire: "Indirect",
        unlockRank: 3,
        ammo: 2,
        ammoUsed: 1,
        reloadTime: 3,
        cooldown: 3,
        range: { min: 2, max: 4 },
        armorPiercing: 50,
        unlockCost: { time: 4320, nanos: 15 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 3, damage: { min: 86, max: 129 }, offense: 56, criticalChance: 0 },
          { level: 4, damage: { min: 93, max: 140 }, offense: 61, criticalChance: 0 },
          { level: 5, damage: { min: 100, max: 151 }, offense: 66, criticalChance: 0 },
          { level: 6, damage: { min: 108, max: 162 }, offense: 71, criticalChance: 0 }
        ]
      }
    ]
  },
  {
    id: units.length + 3,
    name: "Heavier Tank",
    description: "An upgraded version of the Heavy Tank with even more armor and firepower.",
    imageUrl: "/images/units/heavier_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 10,
    unlockLevel: 47,
    productionTime: 51840,
    cost: [{ type: "Gold", amount: 42750 }, { type: "Steel", amount: 4750 }, { type: "Oil", amount: 3800 }, { type: "Widgets", amount: 4 }],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Breach", "Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 350, armor: 210, bravery: 40, defense: 20, dodge: 10, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 385, armor: 230, bravery: 45, defense: 25, dodge: 15, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 420, armor: 250, bravery: 50, defense: 30, dodge: 20, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 455, armor: 275, bravery: 55, defense: 35, dodge: 25, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 490, armor: 295, bravery: 60, defense: 40, dodge: 30, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 525, armor: 315, bravery: 60, defense: 45, dodge: 35, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "60mm Cannon",
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
          { level: 1, damage: { min: 88, max: 132 }, offense: 25, criticalChance: 5 },
          { level: 2, damage: { min: 96, max: 145 }, offense: 30, criticalChance: 5 },
          { level: 3, damage: { min: 105, max: 158 }, offense: 35, criticalChance: 5 },
          { level: 4, damage: { min: 114, max: 171 }, offense: 40, criticalChance: 5 },
          { level: 5, damage: { min: 123, max: 184 }, offense: 45, criticalChance: 5 },
          { level: 6, damage: { min: 132, max: 198 }, offense: 50, criticalChance: 5 }
        ]
      },
      {
        name: "Machine Guns",
        damageType: "Piercing",
        lineOfFire: "Direct",
        ammo: 3,
        ammoUsed: 1,
        reloadTime: 5,
        cooldown: 2,
        range: { min: 1, max: 2 },
        suppressionMod: { multiplier: 0 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Air: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 16, max: 20 }, offense: 46, criticalChance: 5, hits: 3 },
          { level: 2, damage: { min: 18, max: 22 }, offense: 51, criticalChance: 5, hits: 3 },
          { level: 3, damage: { min: 19, max: 24 }, offense: 56, criticalChance: 5, hits: 3 },
          { level: 4, damage: { min: 21, max: 26 }, offense: 61, criticalChance: 5, hits: 3 },
          { level: 5, damage: { min: 22, max: 28 }, offense: 66, criticalChance: 5, hits: 3 },
          { level: 6, damage: { min: 24, max: 30 }, offense: 71, criticalChance: 5, hits: 3 }
        ]
      }
    ]
  }
];

units.push(...tanks);
fs.writeFileSync(unitsPath, JSON.stringify(units, null, 2));
console.log(`Added ${tanks.length} tanks. Total units: ${units.length}`);
