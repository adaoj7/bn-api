import { getUnit, GetUnitResult } from './getUnit';
import type { Unit } from '../utils/types';

export interface GetUnitsBatchParams {
  identifiers: string[];
}

export interface GetUnitsBatchResult {
  found: number;
  notFound: string[];
  units: Unit[];
}

/**
 * Get multiple units at once by name or ID
 */
export function getUnitsBatch(params: GetUnitsBatchParams): GetUnitsBatchResult {
  const { identifiers } = params;

  if (!Array.isArray(identifiers) || identifiers.length === 0) {
    return {
      found: 0,
      notFound: [],
      units: [],
    };
  }

  // Limit batch size to prevent abuse
  const limitedIdentifiers = identifiers.slice(0, 20);

  const units: Unit[] = [];
  const notFound: string[] = [];

  for (const identifier of limitedIdentifiers) {
    const result = getUnit({ identifier });
    if (result.found && result.unit) {
      units.push(result.unit);
    } else {
      notFound.push(identifier);
    }
  }

  return {
    found: units.length,
    notFound,
    units,
  };
}
