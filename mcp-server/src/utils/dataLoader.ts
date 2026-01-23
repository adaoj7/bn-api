import { readFileSync } from 'fs';
import { join } from 'path';
import type { Unit, UnitSummary } from './types';

let unitsData: Unit[] | null = null;
let unitsByName: Map<string, Unit> | null = null;
let unitsById: Map<number, Unit> | null = null;

/**
 * Get the path to the units data file.
 * In development: reads from public/data/units.json (source of truth)
 * In production/bundled: reads from the bundled data/units.json
 */
function getDataPath(): string {
  // Allow override via environment variable for flexibility
  if (process.env.UNITS_DATA_PATH) {
    return process.env.UNITS_DATA_PATH;
  }

  // In development, read from the source of truth
  if (process.env.NODE_ENV !== 'production') {
    // Try to find the public/data path relative to workspace root
    const devPath = join(__dirname, '..', '..', '..', 'public', 'data', 'units.json');
    try {
      readFileSync(devPath, 'utf-8'); // Test if it exists
      return devPath;
    } catch {
      // Fall through to bundled path
    }
  }

  // Default: bundled data path (__dirname points to dist/ after bundling)
  return join(__dirname, '..', 'data', 'units.json');
}

/**
 * Load units data from the JSON file
 */
export function loadUnits(): Unit[] {
  if (unitsData) {
    return unitsData;
  }

  const dataPath = getDataPath();
  console.error(`[DataLoader] Loading units from: ${dataPath}`);
  const rawData = readFileSync(dataPath, 'utf-8');
  unitsData = JSON.parse(rawData) as Unit[];

  // Build indexes
  unitsByName = new Map();
  unitsById = new Map();

  for (const unit of unitsData) {
    unitsByName.set(unit.name.toLowerCase(), unit);
    unitsById.set(unit.id, unit);
  }

  return unitsData;
}

/**
 * Get a unit by name (case-insensitive)
 */
export function getUnitByName(name: string): Unit | undefined {
  loadUnits();
  return unitsByName?.get(name.toLowerCase());
}

/**
 * Get a unit by ID
 */
export function getUnitById(id: number): Unit | undefined {
  loadUnits();
  return unitsById?.get(id);
}

/**
 * Get all unit names for fuzzy matching
 */
export function getAllUnitNames(): string[] {
  const units = loadUnits();
  return units.map(u => u.name);
}

/**
 * Get unique categories with counts
 */
export function getCategories(): Map<string, number> {
  const units = loadUnits();
  const categories = new Map<string, number>();

  for (const unit of units) {
    const count = categories.get(unit.category) || 0;
    categories.set(unit.category, count + 1);
  }

  return categories;
}

/**
 * Get unique affiliations with counts
 */
export function getAffiliations(): Map<string, number> {
  const units = loadUnits();
  const affiliations = new Map<string, number>();

  for (const unit of units) {
    const count = affiliations.get(unit.affiliation) || 0;
    affiliations.set(unit.affiliation, count + 1);
  }

  return affiliations;
}

/**
 * Get unique buildings with counts
 */
export function getBuildings(): Map<string, number> {
  const units = loadUnits();
  const buildings = new Map<string, number>();

  for (const unit of units) {
    const count = buildings.get(unit.building) || 0;
    buildings.set(unit.building, count + 1);
  }

  return buildings;
}

/**
 * Convert a unit to a summary (less data for search results)
 */
export function toSummary(unit: Unit): UnitSummary {
  const maxRankStats = unit.stats.ranks[unit.stats.ranks.length - 1];

  let totalSpCost = 0;
  let totalPromotionTime = 0;
  for (const rank of unit.stats.ranks) {
    if (rank.promotionCost) {
      totalSpCost += rank.promotionCost.sp;
      totalPromotionTime += rank.promotionCost.time;
    }
  }

  return {
    id: unit.id,
    name: unit.name,
    description: unit.description,
    category: unit.category,
    affiliation: unit.affiliation,
    building: unit.building,
    maxRank: unit.maxRank,
    maxHealth: maxRankStats?.health ?? 0,
    maxDefense: maxRankStats?.defense ?? 0,
    totalSpCost,
    totalPromotionTime,
  };
}

/**
 * Get the total number of units
 */
export function getUnitCount(): number {
  return loadUnits().length;
}
