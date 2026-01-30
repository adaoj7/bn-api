const fs = require('fs');

const unitsPath = './public/data/units.json';
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

const tanks = [
  {
    id: units.length + 1,
    name: "Light Chemical Tank",
    description: "A tank equipped with chemical weapons that poison enemies.",
    imageUrl: "/images/units/light_chemical_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 9,
    unlockLevel: 44,
    productionTime: 38700,
    cost: [{ type: "Gold", amount: 28800 }, { type: "Steel", amount: 3200 }, { type: "Oil", amount: 3000 }, { type: "Chemical Vials", amount: 20 }],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 250, armor: 150, bravery: 30, defense: 30, dodge: 15, abilitySlots: 1, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 275, armor: 165, bravery: 35, defense: 35, dodge: 20, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 300, armor: 180, bravery: 40, defense: 40, dodge: 25, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 325, armor: 195, bravery: 45, defense: 45, dodge: 30, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 350, armor: 210, bravery: 50, defense: 50, dodge: 35, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 375, armor: 225, bravery: 55, defense: 55, dodge: 40, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Chemical Burst",
        damageType: "Fire",
        lineOfFire: "Direct",
        ammo: 2,
        ammoUsed: 1,
        reloadTime: 3,
        cooldown: 2,
        weaponCooldown: 1,
        range: { min: 1, max: 4 },
        armorPiercing: 50,
        suppressionMod: { multiplier: 1.25 },
        statusEffect: { type: "Poison", chance: 100, duration: 3, damage: { min: 23, max: 105 } },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 56, max: 84 }, offense: 56, criticalChance: 0 },
          { level: 2, damage: { min: 61, max: 92 }, offense: 61, criticalChance: 0 },
          { level: 3, damage: { min: 67, max: 100 }, offense: 66, criticalChance: 0 },
          { level: 4, damage: { min: 72, max: 109 }, offense: 71, criticalChance: 0 },
          { level: 5, damage: { min: 78, max: 117 }, offense: 76, criticalChance: 0 },
          { level: 6, damage: { min: 84, max: 126 }, offense: 81, criticalChance: 0 }
        ]
      },
      {
        name: "Chemical Sweep",
        damageType: "Fire",
        lineOfFire: "Direct",
        unlockRank: 2,
        ammo: 2,
        ammoUsed: 1,
        reloadTime: 3,
        cooldown: 2,
        weaponCooldown: 1,
        range: { min: 1, max: 1 },
        armorPiercing: 50,
        suppressionMod: { multiplier: 1.25 },
        areaEffect: true,
        statusEffect: { type: "Poison", chance: 100, duration: 3, damage: { min: 23, max: 105 } },
        unlockCost: { time: 2880, nanos: 10 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 2, damage: { min: 61, max: 92 }, offense: 61, criticalChance: 0 },
          { level: 3, damage: { min: 67, max: 100 }, offense: 66, criticalChance: 0 },
          { level: 4, damage: { min: 72, max: 109 }, offense: 71, criticalChance: 0 },
          { level: 5, damage: { min: 78, max: 117 }, offense: 76, criticalChance: 0 },
          { level: 6, damage: { min: 84, max: 126 }, offense: 81, criticalChance: 0 }
        ]
      }
    ]
  },
  {
    id: units.length + 2,
    name: "Heavy Chemical Tank",
    description: "A heavily armored chemical tank with area-effect poison attacks.",
    imageUrl: "/images/units/heavy_chemical_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 10,
    unlockLevel: 45,
    unlockCost: [{ type: "Nanopods", amount: 70 }],
    productionTime: 51840,
    cost: [],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 300, armor: 180, bravery: 40, defense: 20, dodge: 10, abilitySlots: 1, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 330, armor: 200, bravery: 45, defense: 25, dodge: 15, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 360, armor: 215, bravery: 50, defense: 30, dodge: 20, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 390, armor: 235, bravery: 55, defense: 35, dodge: 25, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 420, armor: 250, bravery: 60, defense: 40, dodge: 30, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 450, armor: 270, bravery: 65, defense: 45, dodge: 35, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Eruption",
        damageType: "Fire",
        lineOfFire: "Direct",
        ammo: 4,
        ammoUsed: 2,
        reloadTime: 4,
        cooldown: 4,
        range: { min: 1, max: 3 },
        armorPiercing: 50,
        suppressionMod: { multiplier: 1.25 },
        areaEffect: true,
        statusEffect: { type: "Poison", chance: 100, duration: 3, damage: { min: 23, max: 105 } },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 56, max: 84 }, offense: 56, criticalChance: 0 },
          { level: 2, damage: { min: 61, max: 92 }, offense: 61, criticalChance: 0 },
          { level: 3, damage: { min: 67, max: 100 }, offense: 66, criticalChance: 0 },
          { level: 4, damage: { min: 72, max: 109 }, offense: 71, criticalChance: 0 },
          { level: 5, damage: { min: 78, max: 117 }, offense: 76, criticalChance: 0 },
          { level: 6, damage: { min: 84, max: 126 }, offense: 81, criticalChance: 0 }
        ]
      },
      {
        name: "Chemical Shell",
        damageType: "Fire",
        lineOfFire: "Indirect",
        unlockRank: 2,
        ammo: 2,
        ammoUsed: 1,
        reloadTime: 3,
        cooldown: 2,
        range: { min: 2, max: 4 },
        armorPiercing: 50,
        statusEffect: { type: "Poison", chance: 100, duration: 4, damage: { min: 16, max: 90 } },
        unlockCost: { time: 2880, nanos: 10 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 2, damage: { min: 52, max: 79 }, offense: 51, criticalChance: 0 },
          { level: 3, damage: { min: 57, max: 86 }, offense: 56, criticalChance: 0 },
          { level: 4, damage: { min: 62, max: 93 }, offense: 61, criticalChance: 0 },
          { level: 5, damage: { min: 67, max: 100 }, offense: 66, criticalChance: 0 },
          { level: 6, damage: { min: 72, max: 108 }, offense: 71, criticalChance: 0 }
        ]
      }
    ]
  },
  {
    id: units.length + 3,
    name: "Heavy Flame Tank",
    description: "A flamethrower tank with heavy armor and increased fire damage.",
    imageUrl: "/images/units/heavy_flame_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 8,
    unlockLevel: 40,
    productionTime: 77760,
    cost: [{ type: "Gold", amount: 30000 }, { type: "Steel", amount: 3375 }, { type: "Oil", amount: 3000 }, { type: "Gears", amount: 20 }],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 200, armor: 125, bravery: 50, defense: 15, dodge: 5, abilitySlots: 1, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 220, armor: 140, bravery: 55, defense: 20, dodge: 10, abilitySlots: 1, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 240, armor: 150, bravery: 60, defense: 25, dodge: 15, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 260, armor: 165, bravery: 70, defense: 30, dodge: 20, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 280, armor: 175, bravery: 100, defense: 35, dodge: 25, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 300, armor: 190, bravery: 100, defense: 40, dodge: 30, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Deep Flame",
        damageType: "Fire",
        lineOfFire: "Direct",
        ammo: 8,
        ammoUsed: 1,
        reloadTime: 8,
        cooldown: 2,
        range: { min: 1, max: 4 },
        armorPiercing: 25,
        suppressionMod: { multiplier: 1.25 },
        statusEffect: { type: "Fire", chance: 60, duration: 2, damage: { min: 26, max: 79 } },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 84, max: 126 }, offense: 56, criticalChance: 5 },
          { level: 2, damage: { min: 92, max: 138 }, offense: 56, criticalChance: 5 },
          { level: 3, damage: { min: 100, max: 151 }, offense: 61, criticalChance: 5 },
          { level: 4, damage: { min: 109, max: 163 }, offense: 66, criticalChance: 5 },
          { level: 5, damage: { min: 117, max: 176 }, offense: 76, criticalChance: 5 },
          { level: 6, damage: { min: 126, max: 189 }, offense: 81, criticalChance: 5 }
        ]
      }
    ]
  },
  {
    id: units.length + 4,
    name: "Laser Tank",
    description: "An advanced tank with powerful laser weapons and high anti-tank critical chance.",
    imageUrl: "/images/units/laser_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Optics Facility",
    buildingLevel: 4,
    unlockLevel: 53,
    unlockCost: [{ type: "Nanopods", amount: 70 }],
    productionTime: 58320,
    cost: [],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Plague"],
    resistances: {
      hp: { crushing: 50, fire: 150, piercing: 75 },
      armor: { crushing: 25, fire: 150, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 200, armor: 220, bravery: 45, defense: 20, dodge: 10, abilitySlots: 1, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 220, armor: 240, bravery: 50, defense: 25, dodge: 15, abilitySlots: 1, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 240, armor: 265, bravery: 55, defense: 30, dodge: 20, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 260, armor: 285, bravery: 60, defense: 35, dodge: 25, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 280, armor: 310, bravery: 65, defense: 40, dodge: 30, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 300, armor: 330, bravery: 70, defense: 45, dodge: 35, abilitySlots: 2, range: 4, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Laser Blast",
        damageType: "Fire",
        lineOfFire: "Direct",
        ammo: 4,
        ammoUsed: 1,
        reloadTime: 4,
        cooldown: 0,
        weaponCooldown: 2,
        range: { min: 1, max: 2 },
        armorPiercing: 90,
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 80, max: 120 }, offense: 28, criticalChance: 75, critVsTanks: 75 },
          { level: 2, damage: { min: 88, max: 132 }, offense: 33, criticalChance: 75, critVsTanks: 75 },
          { level: 3, damage: { min: 96, max: 144 }, offense: 38, criticalChance: 75, critVsTanks: 75 },
          { level: 4, damage: { min: 104, max: 156 }, offense: 43, criticalChance: 75, critVsTanks: 75 },
          { level: 5, damage: { min: 112, max: 168 }, offense: 48, criticalChance: 75, critVsTanks: 75 },
          { level: 6, damage: { min: 120, max: 180 }, offense: 53, criticalChance: 75, critVsTanks: 75 }
        ]
      },
      {
        name: "Penetrating Beam",
        damageType: "Fire",
        lineOfFire: "Indirect",
        unlockRank: 2,
        ammo: 4,
        ammoUsed: 1,
        reloadTime: 4,
        cooldown: 6,
        weaponCooldown: 3,
        range: { min: 1, max: 4 },
        armorPiercing: 100,
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 2, damage: { min: 61, max: 92 }, offense: 33, criticalChance: 35, critVsTanks: 35 },
          { level: 3, damage: { min: 67, max: 100 }, offense: 38, criticalChance: 35, critVsTanks: 35 },
          { level: 4, damage: { min: 72, max: 109 }, offense: 43, criticalChance: 35, critVsTanks: 35 },
          { level: 5, damage: { min: 78, max: 117 }, offense: 48, criticalChance: 35, critVsTanks: 35 },
          { level: 6, damage: { min: 84, max: 126 }, offense: 53, criticalChance: 35, critVsTanks: 35 }
        ]
      }
    ]
  },
  {
    id: units.length + 5,
    name: "Plasma Tank",
    description: "An advanced tank with devastating plasma weapons and excellent resistances.",
    imageUrl: "/images/units/plasma_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Plasma Weapons Factory",
    buildingLevel: 1,
    unlockLevel: 68,
    unlockCost: [{ type: "Nanopods", amount: 88 }],
    productionTime: 69120,
    cost: [],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Explosive", "Freeze", "Plague"],
    resistances: {
      hp: { cold: 70, crushing: 80, explosive: 80, fire: 90, piercing: 50 },
      armor: { cold: 70, crushing: 80, explosive: 80, fire: 90, piercing: 50 }
    },
    stats: {
      ranks: [
        { level: 1, health: 450, armor: 300, bravery: 50, defense: 30, dodge: 10, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 475, armor: 315, bravery: 55, defense: 35, dodge: 15, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 500, armor: 330, bravery: 60, defense: 40, dodge: 20, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 525, armor: 345, bravery: 65, defense: 45, dodge: 25, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 550, armor: 360, bravery: 70, defense: 50, dodge: 30, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 575, armor: 375, bravery: 70, defense: 55, dodge: 35, abilitySlots: 3, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Plasma Cannon",
        damageType: "Explosive",
        lineOfFire: "Indirect",
        ammo: 2,
        ammoUsed: 1,
        reloadTime: 4,
        cooldown: 3,
        prepTime: 1,
        range: { min: 1, max: 2 },
        armorPiercing: 55,
        suppressionMod: { flat: 15 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 200, max: 300 }, offense: 56, criticalChance: 0, critVsVehicles: 10 },
          { level: 2, damage: { min: 220, max: 330 }, offense: 61, criticalChance: 0, critVsVehicles: 10 },
          { level: 3, damage: { min: 240, max: 360 }, offense: 66, criticalChance: 0, critVsVehicles: 10 },
          { level: 4, damage: { min: 260, max: 390 }, offense: 66, criticalChance: 0, critVsVehicles: 10 },
          { level: 5, damage: { min: 280, max: 420 }, offense: 71, criticalChance: 0, critVsVehicles: 10 },
          { level: 6, damage: { min: 300, max: 450 }, offense: 76, criticalChance: 0, critVsVehicles: 10 }
        ]
      },
      {
        name: "Dual Shot",
        damageType: "Explosive",
        lineOfFire: "Indirect",
        ammo: 2,
        ammoUsed: 1,
        reloadTime: 4,
        cooldown: 6,
        prepTime: 1,
        range: { min: 1, max: 4 },
        armorPiercing: 50,
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 90, max: 150 }, offense: 51, criticalChance: 0, critVsSoldiers: -5, critVsVehicles: 10, hits: 2 },
          { level: 2, damage: { min: 99, max: 165 }, offense: 56, criticalChance: 0, critVsSoldiers: -5, critVsVehicles: 10, hits: 2 },
          { level: 3, damage: { min: 108, max: 180 }, offense: 61, criticalChance: 0, critVsSoldiers: -5, critVsVehicles: 10, hits: 2 },
          { level: 4, damage: { min: 117, max: 195 }, offense: 61, criticalChance: 0, critVsSoldiers: -5, critVsVehicles: 10, hits: 2 },
          { level: 5, damage: { min: 126, max: 210 }, offense: 66, criticalChance: 0, critVsSoldiers: -5, critVsVehicles: 10, hits: 2 },
          { level: 6, damage: { min: 135, max: 225 }, offense: 71, criticalChance: 0, critVsSoldiers: -5, critVsVehicles: 10, hits: 2 }
        ]
      },
      {
        name: "Plasma Fissure",
        damageType: "Explosive",
        lineOfFire: "Indirect",
        unlockRank: 4,
        ammo: 1,
        ammoUsed: 1,
        reloadTime: 6,
        cooldown: 0,
        prepTime: 3,
        range: { min: 1, max: 5 },
        armorPiercing: 55,
        areaEffect: true,
        unlockCost: { time: 4320, nanos: 20 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 4, damage: { min: 189, max: 317 }, offense: 61, criticalChance: 0, hits: 6 },
          { level: 5, damage: { min: 204, max: 341 }, offense: 66, criticalChance: 0, hits: 6 },
          { level: 6, damage: { min: 219, max: 366 }, offense: 71, criticalChance: 0, hits: 6 }
        ]
      }
    ]
  }
];

units.push(...tanks);
fs.writeFileSync(unitsPath, JSON.stringify(units, null, 2));
console.log(`Added ${tanks.length} tanks. Total units: ${units.length}`);
