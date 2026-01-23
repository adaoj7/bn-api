import { loadUnits, toSummary } from '../utils/dataLoader';
import { fuzzyScore } from '../utils/fuzzyMatch';
import type { Unit, UnitSummary } from '../utils/types';

export interface SearchUnitsParams {
  query?: string;
  category?: string;
  building?: string;
  affiliation?: string;
  limit?: number;
}

export interface SearchUnitsResult {
  count: number;
  units: UnitSummary[];
  filters: {
    query?: string;
    category?: string;
    building?: string;
    affiliation?: string;
  };
}

/**
 * Search for units by various criteria
 */
export function searchUnits(params: SearchUnitsParams): SearchUnitsResult {
  const {
    query,
    category,
    building,
    affiliation,
    limit = 20,
  } = params;

  const allUnits = loadUnits();
  let results: Array<{ unit: Unit; score: number }> = [];

  for (const unit of allUnits) {
    // Apply filters
    if (category && unit.category.toLowerCase() !== category.toLowerCase()) {
      continue;
    }
    if (building && unit.building.toLowerCase() !== building.toLowerCase()) {
      continue;
    }
    if (affiliation && unit.affiliation.toLowerCase() !== affiliation.toLowerCase()) {
      continue;
    }

    // Apply text search
    if (query) {
      const queryLower = query.toLowerCase();
      const terms = queryLower.split(/\s+/).filter(t => t.length > 0);

      // Check if all terms match (AND logic)
      let allMatch = true;
      let totalScore = 0;

      for (const term of terms) {
        const nameScore = fuzzyScore(term, unit.name);
        const descContains = unit.description.toLowerCase().includes(term) ? 0.7 : 0;
        const termScore = Math.max(nameScore, descContains);

        if (termScore < 0.3) {
          allMatch = false;
          break;
        }
        totalScore += termScore;
      }

      if (allMatch) {
        results.push({
          unit,
          score: totalScore / terms.length,
        });
      }
    } else {
      // No query, include all matching filters
      results.push({
        unit,
        score: 1,
      });
    }
  }

  // Sort by score (desc) then name (asc)
  results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.unit.name.localeCompare(b.unit.name);
  });

  // Apply limit
  const limitedResults = results.slice(0, Math.min(limit, 50));

  return {
    count: results.length,
    units: limitedResults.map(r => toSummary(r.unit)),
    filters: {
      query,
      category,
      building,
      affiliation,
    },
  };
}
