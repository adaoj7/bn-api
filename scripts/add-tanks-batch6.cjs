const fs = require('fs');

const unitsPath = './public/data/units.json';
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

const tanks = [
  {
    id: units.length + 1,
    name: "Gold Tank",
    description: "A prestige variant of the Heavy Tank with identical stats.",
    imageUrl: "/images/units/gold_tank.png",
    category: "Tank",
    unitType: "tank",
    affiliation: "Frontier",
    building: "Prestigious Academy",
    buildingLevel: 1,
    unlockLevel: 65,
    productionTime: 64800,
    cost: [{ type: "Gold", amount: 50000 }, { type: "Steel", amount: 3375 }, { type: "Oil", amount: 3000 }, { type: "Prestige Stars", amount: 20 }],
    blocking: "Full",
    maxRank: 6,
    immunities: ["Plague"],
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
        name: "Tank Gun",
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
        name: "Machine Gun",
        damageType: "Piercing",
        lineOfFire: "Direct",
        unlockRank: 3,
        ammo: 3,
        ammoUsed: 1,
        reloadTime: 5,
        cooldown: 2,
        range: { min: 1, max: 2 },
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
