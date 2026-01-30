const fs = require('fs');

const unitsPath = './public/data/units.json';
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

const tanks = [
  {
    id: units.length + 1,
    name: "Light Tank",
    description: "A basic armored tank with a cannon and optional machine gun.",
    imageUrl: "/images/units/light_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 2,
    unlockLevel: 29,
    productionTime: 81000,
    cost: [{ type: "Gold", amount: 19000 }, { type: "Steel", amount: 2135 }, { type: "Oil", amount: 2000 }],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Breach", "Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 125, armor: 90, bravery: 30, defense: 30, dodge: 15, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 140, armor: 100, bravery: 35, defense: 35, dodge: 20, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 150, armor: 110, bravery: 40, defense: 40, dodge: 25, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 165, armor: 115, bravery: 45, defense: 45, dodge: 30, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 175, armor: 125, bravery: 50, defense: 50, dodge: 35, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 190, armor: 135, bravery: 50, defense: 55, dodge: 40, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
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
          { level: 1, damage: { min: 60, max: 90 }, offense: 30, criticalChance: 5 },
          { level: 2, damage: { min: 66, max: 99 }, offense: 35, criticalChance: 5 },
          { level: 3, damage: { min: 72, max: 108 }, offense: 40, criticalChance: 5 },
          { level: 4, damage: { min: 78, max: 117 }, offense: 45, criticalChance: 5 },
          { level: 5, damage: { min: 84, max: 126 }, offense: 50, criticalChance: 5 },
          { level: 6, damage: { min: 90, max: 135 }, offense: 55, criticalChance: 5 }
        ]
      },
      {
        name: "Auto-Fire",
        damageType: "Piercing",
        lineOfFire: "Direct",
        unlockRank: 5,
        ammo: 3,
        ammoUsed: 1,
        reloadTime: 5,
        cooldown: 2,
        range: { min: 1, max: 2 },
        unlockCost: { time: 5760, nanos: 5 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Air: true, Critter: true },
        ranks: [
          { level: 5, damage: { min: 16, max: 19 }, offense: 66, criticalChance: 5, hits: 3 },
          { level: 6, damage: { min: 18, max: 21 }, offense: 71, criticalChance: 5, hits: 3 }
        ]
      }
    ]
  },
  {
    id: units.length + 2,
    name: "Medium Tank",
    description: "A versatile tank with improved armor and firepower over the Light Tank.",
    imageUrl: "/images/units/medium_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 6,
    unlockLevel: 30,
    unlockCost: [{ type: "Nanopods", amount: 55 }],
    productionTime: 52920,
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
        { level: 1, health: 175, armor: 125, bravery: 35, defense: 25, dodge: 10, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 195, armor: 140, bravery: 40, defense: 30, dodge: 15, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 210, armor: 150, bravery: 45, defense: 35, dodge: 20, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 230, armor: 165, bravery: 50, defense: 40, dodge: 25, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 245, armor: 175, bravery: 55, defense: 45, dodge: 30, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 265, armor: 190, bravery: 55, defense: 50, dodge: 35, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
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
          { level: 1, damage: { min: 76, max: 114 }, offense: 30, criticalChance: 5 },
          { level: 2, damage: { min: 83, max: 125 }, offense: 30, criticalChance: 5 },
          { level: 3, damage: { min: 91, max: 136 }, offense: 35, criticalChance: 5 },
          { level: 4, damage: { min: 98, max: 148 }, offense: 40, criticalChance: 5 },
          { level: 5, damage: { min: 106, max: 159 }, offense: 50, criticalChance: 5 },
          { level: 6, damage: { min: 114, max: 171 }, offense: 55, criticalChance: 5 }
        ]
      },
      {
        name: "Auto-Fire",
        damageType: "Piercing",
        lineOfFire: "Direct",
        unlockRank: 4,
        ammo: 3,
        ammoUsed: 1,
        reloadTime: 5,
        cooldown: 2,
        range: { min: 1, max: 2 },
        unlockCost: { time: 4320, nanos: 8 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Air: true, Critter: true },
        ranks: [
          { level: 4, damage: { min: 15, max: 18 }, offense: 56, criticalChance: 5, hits: 3 },
          { level: 5, damage: { min: 16, max: 19 }, offense: 66, criticalChance: 5, hits: 3 },
          { level: 6, damage: { min: 18, max: 21 }, offense: 71, criticalChance: 5, hits: 3 }
        ]
      }
    ]
  },
  {
    id: units.length + 3,
    name: "Heavy Tank",
    description: "A heavily armored tank with devastating firepower.",
    imageUrl: "/images/units/heavy_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 7,
    unlockLevel: 35,
    productionTime: 64800,
    cost: [{ type: "Gold", amount: 30000 }, { type: "Steel", amount: 3375 }, { type: "Oil", amount: 3000 }, { type: "Gears", amount: 20 }],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Breach", "Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 225, armor: 150, bravery: 40, defense: 20, dodge: 10, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 250, armor: 165, bravery: 45, defense: 25, dodge: 15, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 270, armor: 180, bravery: 50, defense: 30, dodge: 20, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 295, armor: 195, bravery: 55, defense: 35, dodge: 25, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 315, armor: 210, bravery: 60, defense: 40, dodge: 30, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 340, armor: 225, bravery: 60, defense: 45, dodge: 35, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
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
          { level: 1, damage: { min: 84, max: 126 }, offense: 25, criticalChance: 5 },
          { level: 2, damage: { min: 92, max: 138 }, offense: 25, criticalChance: 5 },
          { level: 3, damage: { min: 100, max: 151 }, offense: 30, criticalChance: 5 },
          { level: 4, damage: { min: 109, max: 163 }, offense: 35, criticalChance: 5 },
          { level: 5, damage: { min: 117, max: 176 }, offense: 45, criticalChance: 5 },
          { level: 6, damage: { min: 126, max: 189 }, offense: 50, criticalChance: 5 }
        ]
      },
      {
        name: "Auto-Fire",
        damageType: "Piercing",
        lineOfFire: "Direct",
        unlockRank: 3,
        ammo: 3,
        ammoUsed: 1,
        reloadTime: 5,
        cooldown: 2,
        range: { min: 1, max: 2 },
        unlockCost: { time: 2880, nanos: 10 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Air: true, Critter: true },
        ranks: [
          { level: 3, damage: { min: 14, max: 16 }, offense: 51, criticalChance: 5, hits: 3 },
          { level: 4, damage: { min: 15, max: 18 }, offense: 56, criticalChance: 5, hits: 3 },
          { level: 5, damage: { min: 16, max: 19 }, offense: 66, criticalChance: 5, hits: 3 },
          { level: 6, damage: { min: 18, max: 21 }, offense: 71, criticalChance: 5, hits: 3 }
        ]
      }
    ]
  }
];

units.push(...tanks);
fs.writeFileSync(unitsPath, JSON.stringify(units, null, 2));
console.log(`Added ${tanks.length} tanks. Total units: ${units.length}`);
