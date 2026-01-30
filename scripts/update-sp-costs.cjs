const fs = require('fs');
const path = require('path');

// SP costs extracted from wiki pages
const spCosts = {
  "Light Tank": [null, 3305, 7550, 17925, 39650, 138950],
  "Medium Tank": [null, 4560, 10560, 23050, 53750, 184325],
  "Heavy Tank": [null, 6070, 14260, 31675, 69700, 243300],
  "Super Tank": [null, 8570, 19660, 43350, 96775, 335450],
  "Mega Tank": [null, 12310, 27860, 60900, 134775, 472775],
  "Heavier Tank": [null, 11015, 24620, 54425, 121825, 423025],
  "Puma": [null, 2545, 5940, 14425, 32225, 113975],
  "Dragon": [null, 5100, 11400, 26400, 60000, 165880],
  "Tempest": [null, 3415, 8300, 18550, 41000, 143675],
  "Basilisk": [null, 6810, 15390, 34325, 75775, 212180],
  "Frostbite": [null, 6640, 15270, 34525, 77025, 217580],
  "Lightning Tank": [null, 7730, 17470, 38975, 86025, 240840],
  "Railgun Tank": [null, 11650, 26620, 58250, 129800, 457925],
  "Arctic Tank": [null, 6915, 16020, 34950, 78625, 270225],
  "Heavy Arctic Tank": [null, 8010, 18200, 42225, 93175, 326150],
  "Light Chemical Tank": [null, 9985, 22460, 51175, 112325, 313100],
  "Heavy Chemical Tank": [null, 12325, 27810, 60675, 133975, 368880],
  "Firedrake": [null, 3300, 7480, 17600, 38725, 135175],
  "Heavy Flame Tank": [null, 5840, 13430, 30375, 67750, 239200],
  "Laser Tank": [null, 10555, 23300, 52425, 116475, 410000],
  "Plasma Tank": [null, 30745, 66530, 141125, 298375, 943500],
  "Gold Tank": [null, 6070, 14260, 31675, 69700, 243300]
};

// Read units.json
const unitsPath = path.join(__dirname, '../public/data/units.json');
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

let updated = 0;

// Update units with SP costs
units.forEach(unit => {
  if (spCosts[unit.name]) {
    const costs = spCosts[unit.name];
    if (unit.stats && unit.stats.ranks) {
      unit.stats.ranks.forEach((rank, index) => {
        if (costs[index] !== null && costs[index] !== undefined && rank.promotionCost) {
          if (rank.promotionCost.sp === 0 || rank.promotionCost.sp === undefined) {
            rank.promotionCost.sp = costs[index];
            updated++;
            console.log(`✓ Updated ${unit.name} rank ${rank.level} SP: ${costs[index]}`);
          }
        }
      });
    }
  }
});

// Write back to file
fs.writeFileSync(unitsPath, JSON.stringify(units, null, 2));
console.log(`\n✓ Updated ${updated} rank entries with SP costs`);
