import { getUnitByName, getUnitById, getAllUnitNames } from '../utils/dataLoader';
import { findBestMatch } from '../utils/fuzzyMatch';
import type { Unit } from '../utils/types';

export interface GetUnitParams {
  identifier: string;
}

export interface GetUnitResult {
  found: boolean;
  unit?: Unit;
  matchedName?: string;
  fuzzyMatch?: boolean;
  error?: string;
}

/**
 * Get a unit by name or ID with fuzzy matching support
 */
export function getUnit(params: GetUnitParams): GetUnitResult {
  const { identifier } = params;

  if (!identifier || typeof identifier !== 'string') {
    return {
      found: false,
      error: 'identifier is required and must be a string',
    };
  }

  // Try parsing as ID first
  const idNum = parseInt(identifier, 10);
  if (!isNaN(idNum)) {
    const unit = getUnitById(idNum);
    if (unit) {
      return {
        found: true,
        unit,
        matchedName: unit.name,
        fuzzyMatch: false,
      };
    }
  }

  // Try exact name match (case-insensitive)
  const exactMatch = getUnitByName(identifier);
  if (exactMatch) {
    return {
      found: true,
      unit: exactMatch,
      matchedName: exactMatch.name,
      fuzzyMatch: false,
    };
  }

  // Try fuzzy matching
  const allNames = getAllUnitNames();
  const fuzzyResult = findBestMatch(identifier, allNames, 0.4);

  if (fuzzyResult) {
    const unit = getUnitByName(fuzzyResult.name);
    if (unit) {
      return {
        found: true,
        unit,
        matchedName: unit.name,
        fuzzyMatch: true,
      };
    }
  }

  return {
    found: false,
    error: `No unit found matching "${identifier}". Try searching with search_units to find available units.`,
  };
}
