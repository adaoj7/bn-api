import { loadUnits } from '../utils/dataLoader';
import type { Unit } from '../utils/types';

export interface RandomUnitParams {
  category?: string;
}

export interface RandomUnitResult {
  unit: Unit | null;
  category?: string;
  error?: string;
}

/**
 * Get a random unit, optionally filtered by category
 */
export function randomUnit(params: RandomUnitParams): RandomUnitResult {
  const { category } = params;

  let units = loadUnits();

  // Filter by category if specified
  if (category) {
    units = units.filter(
      u => u.category.toLowerCase() === category.toLowerCase()
    );

    if (units.length === 0) {
      return {
        unit: null,
        category,
        error: `No units found in category "${category}". Use list_categories to see available categories.`,
      };
    }
  }

  // Pick a random unit
  const randomIndex = Math.floor(Math.random() * units.length);
  const unit = units[randomIndex];

  return {
    unit,
    category,
  };
}
