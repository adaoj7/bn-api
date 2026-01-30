const fs = require('fs');
const path = require('path');
const https = require('https');

// Units that need SP cost data
const unitsToUpdate = [
  'Light Tank', 'Medium Tank', 'Heavy Tank', 'Super Tank', 'Mega Tank',
  'Heavier Tank', 'Puma', 'Dragon', 'Firedrake', 'Tempest', 'Basilisk',
  'Frostbite', 'Lightning Tank', 'Railgun Tank', 'Arctic Tank',
  'Heavy Arctic Tank', 'Light Chemical Tank', 'Heavy Chemical Tank',
  'Heavy Flame Tank', 'Laser Tank', 'Plasma Tank', 'Gold Tank'
];

// Read units.json
const unitsPath = path.join(__dirname, '../public/data/units.json');
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

/**
 * Convert unit name to wiki URL format
 */
function unitNameToWikiUrl(name) {
  return name.replace(/\s+/g, '_');
}

/**
 * Fetch wiki page and extract SP costs from ranks table
 */
function fetchSPCosts(unitName) {
  return new Promise((resolve, reject) => {
    const wikiPath = `/wiki/${unitNameToWikiUrl(unitName)}`;
    console.log(`\nFetching ${unitName}...`);
    
    const options = {
      hostname: 'battlenations.miraheze.org',
      path: wikiPath,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };
    
    https.get(options, (res) => {
      let html = '';
      
      res.on('data', (chunk) => {
        html += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(parseSPCosts(html, unitName));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Parse SP costs from HTML
 */
function parseSPCosts(html, unitName) {
  // Find the ranks table - look for "SP" row
  const spRowMatch = html.match(/<tr>[\s\S]*?<th[^>]*>SP<\/th>[\s\S]*?<\/tr>/i);
  if (!spRowMatch) {
    console.log(`  ⚠ No SP row found for ${unitName}`);
    return null;
  }
  
  const spRow = spRowMatch[0];
  // Extract all <td> values from the SP row
  const tdMatches = spRow.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
  if (!tdMatches || tdMatches.length < 2) {
    console.log(`  ⚠ Could not parse SP values for ${unitName}`);
    return null;
  }
  
  // Parse SP values (skip first "N/A" for rank 1)
  const spCosts = [];
  for (let i = 1; i < tdMatches.length; i++) {
    const tdContent = tdMatches[i].replace(/<[^>]+>/g, '').trim();
    // Remove commas and parse number
    const spValue = parseInt(tdContent.replace(/,/g, ''), 10);
    if (isNaN(spValue)) {
      console.log(`  ⚠ Invalid SP value at rank ${i + 1}: "${tdContent}"`);
      spCosts.push(null);
    } else {
      spCosts.push(spValue);
    }
  }
  
  console.log(`  ✓ Found SP costs: ${spCosts.map((s, i) => `R${i+2}:${s || 'N/A'}`).join(', ')}`);
  return spCosts;
}

/**
 * Update unit with SP costs
 */
function updateUnitSPCosts(unit, spCosts) {
  if (!unit.stats || !unit.stats.ranks) {
    console.log(`  ⚠ Unit ${unit.name} has no ranks`);
    return 0;
  }
  
  let updated = 0;
  // Start from rank 2 (index 1)
  for (let i = 1; i < unit.stats.ranks.length && i - 1 < spCosts.length; i++) {
    const rank = unit.stats.ranks[i];
    const spCost = spCosts[i - 1];
    
    if (spCost !== null && rank.promotionCost) {
      if (rank.promotionCost.sp === 0 || rank.promotionCost.sp === undefined) {
        rank.promotionCost.sp = spCost;
        updated++;
        console.log(`    ✓ Updated rank ${rank.level} SP: ${spCost}`);
      } else if (rank.promotionCost.sp !== spCost) {
        console.log(`    ⚠ Rank ${rank.level} already has SP ${rank.promotionCost.sp}, wiki says ${spCost}`);
      }
    }
  }
  
  return updated;
}

// Process each unit sequentially
async function processUnits() {
  let totalUpdated = 0;
  
  for (const unitName of unitsToUpdate) {
    const unit = units.find(u => u.name === unitName);
    if (!unit) {
      console.log(`\n⚠ Unit "${unitName}" not found in units.json`);
      continue;
    }
    
    try {
      const spCosts = await fetchSPCosts(unitName);
      if (spCosts) {
        const updated = updateUnitSPCosts(unit, spCosts);
        totalUpdated += updated;
      }
    } catch (error) {
      console.error(`  ✗ Error processing ${unitName}:`, error.message);
    }
    
    // Small delay to avoid hammering the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return totalUpdated;
}

// Run the script
processUnits().then(totalUpdated => {
  // Write back to file
  if (totalUpdated > 0) {
    fs.writeFileSync(unitsPath, JSON.stringify(units, null, 2));
    console.log(`\n✓ Updated ${totalUpdated} rank entries with SP costs`);
    console.log(`✓ Saved to ${unitsPath}`);
  } else {
    console.log(`\n⚠ No updates made`);
  }
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
