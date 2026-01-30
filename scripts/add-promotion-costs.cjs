const fs = require('fs');
const path = require('path');

// Promotion cost data extracted from wiki for tanks/vehicles
const promotionCosts = {
  "Light Tank": [
    null, // rank 1 has no promotion cost
    { time: 14400, resources: [{ type: "gold", amount: 11232 }, { type: "steel", amount: 3750 }], sp: 0 },
    { time: 43200, resources: [{ type: "gold", amount: 32352 }, { type: "steel", amount: 4950 }], sp: 0 },
    { time: 86400, resources: [{ type: "gold", amount: 87952 }, { type: "steel", amount: 6300 }, { type: "oil", amount: 9 }], sp: 0 },
    { time: 172800, resources: [{ type: "gold", amount: 213984 }, { type: "steel", amount: 7800 }, { type: "oil", amount: 25 }], sp: 0 },
    { time: 172800, resources: [{ type: "gold", amount: 706895 }, { type: "steel", amount: 9475 }, { type: "laurels", amount: 6 }], sp: 0 },
  ],
  "Medium Tank": [
    null,
    { time: 14400, resources: [{ type: "gold", amount: 15504 }, { type: "steel", amount: 3975 }], sp: 0 },
    { time: 43200, resources: [{ type: "gold", amount: 45240 }, { type: "steel", amount: 5200 }], sp: 0 },
    { time: 86400, resources: [{ type: "gold", amount: 112984 }, { type: "steel", amount: 6575 }, { type: "oil", amount: 9 }], sp: 0 },
    { time: 172800, resources: [{ type: "gold", amount: 290152 }, { type: "steel", amount: 8125 }, { type: "oil", amount: 25 }], sp: 0 },
    { time: 172800, resources: [{ type: "gold", amount: 669765 }, { type: "steel", amount: 9825 }, { type: "oil", amount: 7 }], sp: 0 },
  ],
  "Heavy Tank": [
    null,
    { time: 14400, resources: [{ type: "gold", amount: 20648 }, { type: "steel", amount: 5200 }], sp: 0 },
    { time: 43200, resources: [{ type: "gold", amount: 61072 }, { type: "steel", amount: 6575 }], sp: 0 },
    { time: 86400, resources: [{ type: "gold", amount: 155344 }, { type: "steel", amount: 8125 }, { type: "oil", amount: 10 }], sp: 0 },
    { time: 172800, resources: [{ type: "gold", amount: 376160 }, { type: "steel", amount: 9825 }, { type: "oil", amount: 28 }], sp: 0 },
    { time: 172800, resources: [{ type: "gold", amount: 707272 }, { type: "steel", amount: 11700 }, { type: "oil", amount: 6 }], sp: 0 },
  ],
};

// Read units.json
const unitsPath = path.join(__dirname, '../mcp-server/data/units.json');
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

let updated = 0;

// Update units with promotion costs
units.forEach(unit => {
  if (promotionCosts[unit.name]) {
    const costs = promotionCosts[unit.name];
    if (unit.stats && unit.stats.ranks) {
      unit.stats.ranks.forEach((rank, index) => {
        if (costs[index] && !rank.promotionCost) {
          rank.promotionCost = costs[index];
          updated++;
          console.log(`✓ Added promotion cost for ${unit.name} rank ${rank.level}`);
        }
      });
    }
  }
});

// Write back to file
fs.writeFileSync(unitsPath, JSON.stringify(units, null, 2));
console.log(`\n✓ Updated ${updated} rank entries with promotion costs`);
