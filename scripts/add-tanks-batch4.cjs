const fs = require('fs');

const unitsPath = './public/data/units.json';
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

const tanks = [
  {
    id: units.length + 1,
    name: "Frostbite",
    description: "A cryo tank that can freeze enemies solid with its cryogenic cannon.",
    imageUrl: "/images/units/frostbite.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 11,
    unlockLevel: 48,
    unlockCost: [{ type: "Nanopods", amount: 65 }],
    productionTime: 45360,
    cost: [],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Cold", "Plague"],
    resistances: {
      hp: { cold: 50, crushing: 50, fire: 125, piercing: 75 },
      armor: { cold: 50, crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 190, armor: 100, bravery: 25, defense: 30, dodge: 15, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 210, armor: 110, bravery: 30, defense: 35, dodge: 20, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 230, armor: 120, bravery: 35, defense: 40, dodge: 25, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 245, armor: 130, bravery: 40, defense: 45, dodge: 30, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 265, armor: 140, bravery: 45, defense: 50, dodge: 35, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 285, armor: 150, bravery: 50, defense: 55, dodge: 40, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Cryogenic Cannon",
        damageType: "Explosive",
        lineOfFire: "Direct",
        ammo: 3,
        ammoUsed: 1,
        reloadTime: 4,
        cooldown: 0,
        range: { min: 1, max: 3 },
        armorPiercing: 20,
        suppressionMod: { multiplier: 0.5 },
        statusEffect: { type: "Freeze", chance: 100, duration: 3 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 60, max: 90 }, offense: 46, criticalChance: 5 },
          { level: 2, damage: { min: 66, max: 99 }, offense: 46, criticalChance: 5 },
          { level: 3, damage: { min: 72, max: 108 }, offense: 51, criticalChance: 5 },
          { level: 4, damage: { min: 78, max: 117 }, offense: 56, criticalChance: 5 },
          { level: 5, damage: { min: 84, max: 126 }, offense: 66, criticalChance: 5 },
          { level: 6, damage: { min: 90, max: 135 }, offense: 71, criticalChance: 5 }
        ]
      }
    ]
  },
  {
    id: units.length + 2,
    name: "Lightning Tank",
    description: "An electric tank that can stun enemies and deal extra damage to tanks.",
    imageUrl: "/images/units/lightning_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 12,
    unlockLevel: 49,
    unlockCost: [{ type: "Nanopods", amount: 60 }],
    productionTime: 38880,
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
        { level: 1, health: 200, armor: 110, bravery: 35, defense: 30, dodge: 15, abilitySlots: 1, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 220, armor: 120, bravery: 40, defense: 35, dodge: 20, abilitySlots: 1, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 240, armor: 130, bravery: 45, defense: 40, dodge: 25, abilitySlots: 1, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 260, armor: 145, bravery: 50, defense: 45, dodge: 30, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 280, armor: 155, bravery: 55, defense: 50, dodge: 35, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 300, armor: 165, bravery: 60, defense: 55, dodge: 40, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "Heavy Shock",
        damageType: "Explosive",
        lineOfFire: "Indirect",
        ammo: -1,
        ammoUsed: 1,
        reloadTime: 0,
        cooldown: 4,
        range: { min: 1, max: 5 },
        armorPiercing: 25,
        suppressionMod: { multiplier: 1.25 },
        statusEffect: { type: "Stun", chance: 30, duration: 3 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 77, max: 104 }, offense: 46, criticalChance: 5, critVsTanks: 20 },
          { level: 2, damage: { min: 84, max: 114 }, offense: 46, criticalChance: 5, critVsTanks: 20 },
          { level: 3, damage: { min: 92, max: 124 }, offense: 51, criticalChance: 5, critVsTanks: 20 },
          { level: 4, damage: { min: 100, max: 135 }, offense: 56, criticalChance: 5, critVsTanks: 20 },
          { level: 5, damage: { min: 107, max: 145 }, offense: 66, criticalChance: 5, critVsTanks: 20 },
          { level: 6, damage: { min: 115, max: 156 }, offense: 71, criticalChance: 5, critVsTanks: 20 }
        ]
      }
    ]
  },
  {
    id: units.length + 3,
    name: "Railgun Tank",
    description: "A high-velocity piercing tank with exceptional armor penetration and anti-vehicle capabilities.",
    imageUrl: "/images/units/railgun_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 11,
    unlockLevel: 62,
    unlockCost: [{ type: "Nanopods", amount: 75 }],
    productionTime: 45360,
    cost: [],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Plague"],
    resistances: {
      hp: { crushing: 150, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 325, armor: 200, bravery: 50, defense: 30, dodge: 10, abilitySlots: 1, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 360, armor: 220, bravery: 55, defense: 35, dodge: 15, abilitySlots: 1, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 390, armor: 240, bravery: 60, defense: 40, dodge: 20, abilitySlots: 1, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 425, armor: 260, bravery: 65, defense: 45, dodge: 25, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 455, armor: 280, bravery: 70, defense: 50, dodge: 30, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 490, armor: 300, bravery: 70, defense: 55, dodge: 35, abilitySlots: 2, range: 5, pvpValue: 0, spReward: 0, goldReward: 0 }
      ]
    },
    actions: [
      {
        name: "High Velocity Bolt",
        damageType: "Piercing",
        lineOfFire: "Direct",
        ammo: -1,
        ammoUsed: 1,
        reloadTime: 0,
        cooldown: 4,
        range: { min: 1, max: 5 },
        armorPiercing: 80,
        suppressionMod: { multiplier: 0 },
        targetableTypes: { Soldier: true, Sniper: true, Vehicle: true, Tank: true, Critter: true },
        ranks: [
          { level: 1, damage: { min: 120, max: 180 }, offense: 56, criticalChance: 10, critVsSoldiers: 5, critVsVehicles: 20 },
          { level: 2, damage: { min: 132, max: 198 }, offense: 61, criticalChance: 10, critVsSoldiers: 5, critVsVehicles: 20 },
          { level: 3, damage: { min: 144, max: 216 }, offense: 66, criticalChance: 10, critVsSoldiers: 5, critVsVehicles: 20 },
          { level: 4, damage: { min: 156, max: 234 }, offense: 71, criticalChance: 10, critVsSoldiers: 5, critVsVehicles: 20 },
          { level: 5, damage: { min: 168, max: 252 }, offense: 76, criticalChance: 10, critVsSoldiers: 5, critVsVehicles: 20 },
          { level: 6, damage: { min: 180, max: 270 }, offense: 81, criticalChance: 10, critVsSoldiers: 5, critVsVehicles: 20 }
        ]
      }
    ]
  },
  {
    id: units.length + 4,
    name: "Arctic Tank",
    description: "A specialized tank designed for cold environments with cryo-resistant armor.",
    imageUrl: "/images/units/arctic_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 11,
    unlockLevel: 55,
    productionTime: 45360,
    cost: [{ type: "Gold", amount: 22500 }, { type: "Steel", amount: 3600 }, { type: "Oil", amount: 7200 }],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Cold", "Freeze", "Plague"],
    resistances: {
      hp: { crushing: 50, fire: 100, piercing: 75 },
      armor: { crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 155, armor: 135, bravery: 35, defense: 25, dodge: 10, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 180, armor: 145, bravery: 40, defense: 30, dodge: 15, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 195, armor: 155, bravery: 45, defense: 35, dodge: 20, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 215, armor: 170, bravery: 50, defense: 40, dodge: 25, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 225, armor: 180, bravery: 55, defense: 45, dodge: 30, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 245, armor: 200, bravery: 55, defense: 50, dodge: 35, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
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
          { level: 1, damage: { min: 75, max: 125 }, offense: 30, criticalChance: 5 },
          { level: 2, damage: { min: 82, max: 137 }, offense: 35, criticalChance: 5 },
          { level: 3, damage: { min: 90, max: 150 }, offense: 40, criticalChance: 5 },
          { level: 4, damage: { min: 97, max: 162 }, offense: 45, criticalChance: 5 },
          { level: 5, damage: { min: 105, max: 175 }, offense: 50, criticalChance: 5 },
          { level: 6, damage: { min: 112, max: 187 }, offense: 55, criticalChance: 5 }
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
          { level: 1, damage: { min: 27, max: 33 }, offense: 46, criticalChance: 5, hits: 3 },
          { level: 2, damage: { min: 30, max: 36 }, offense: 51, criticalChance: 5, hits: 3 },
          { level: 3, damage: { min: 32, max: 39 }, offense: 56, criticalChance: 5, hits: 3 },
          { level: 4, damage: { min: 35, max: 43 }, offense: 61, criticalChance: 5, hits: 3 },
          { level: 5, damage: { min: 37, max: 46 }, offense: 66, criticalChance: 5, hits: 3 },
          { level: 6, damage: { min: 40, max: 49 }, offense: 71, criticalChance: 5, hits: 3 }
        ]
      }
    ]
  },
  {
    id: units.length + 5,
    name: "Heavy Arctic Tank",
    description: "A heavily armored arctic tank with cold resistance and powerful weapons.",
    imageUrl: "/images/units/heavy_arctic_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Vehicle Factory",
    buildingLevel: 11,
    unlockLevel: 55,
    unlockCost: [{ type: "Nanopods", amount: 50 }],
    productionTime: 30240,
    cost: [],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Cold", "Plague"],
    resistances: {
      hp: { cold: 60, crushing: 50, fire: 100, piercing: 75 },
      armor: { cold: 65, crushing: 25, fire: 75, piercing: 25 }
    },
    stats: {
      ranks: [
        { level: 1, health: 200, armor: 155, bravery: 40, defense: 20, dodge: 10, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 2, health: 220, armor: 170, bravery: 45, defense: 25, dodge: 15, abilitySlots: 1, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 3, health: 240, armor: 185, bravery: 50, defense: 30, dodge: 20, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 4, health: 260, armor: 200, bravery: 55, defense: 35, dodge: 25, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 5, health: 280, armor: 215, bravery: 60, defense: 40, dodge: 30, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 },
        { level: 6, health: 300, armor: 235, bravery: 60, defense: 45, dodge: 35, abilitySlots: 2, range: 3, pvpValue: 0, spReward: 0, goldReward: 0 }
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
          { level: 1, damage: { min: 88, max: 132 }, offense: 25, criticalChance: 5 },
          { level: 2, damage: { min: 96, max: 145 }, offense: 25, criticalChance: 5 },
          { level: 3, damage: { min: 105, max: 158 }, offense: 30, criticalChance: 5 },
          { level: 4, damage: { min: 114, max: 171 }, offense: 35, criticalChance: 5 },
          { level: 5, damage: { min: 123, max: 184 }, offense: 45, criticalChance: 5 },
          { level: 6, damage: { min: 132, max: 198 }, offense: 50, criticalChance: 5 }
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
          { level: 1, damage: { min: 36, max: 44 }, offense: 46, criticalChance: 5, hits: 3 },
          { level: 2, damage: { min: 39, max: 48 }, offense: 46, criticalChance: 5, hits: 3 },
          { level: 3, damage: { min: 43, max: 52 }, offense: 51, criticalChance: 5, hits: 3 },
          { level: 4, damage: { min: 46, max: 57 }, offense: 56, criticalChance: 5, hits: 3 },
          { level: 5, damage: { min: 50, max: 61 }, offense: 66, criticalChance: 5, hits: 3 },
          { level: 6, damage: { min: 54, max: 66 }, offense: 71, criticalChance: 5, hits: 3 }
        ]
      }
    ]
  }
];

units.push(...tanks);
fs.writeFileSync(unitsPath, JSON.stringify(units, null, 2));
console.log(`Added ${tanks.length} tanks. Total units: ${units.length}`);
