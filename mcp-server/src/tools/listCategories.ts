import { getCategories, getAffiliations, getBuildings, getUnitCount } from '../utils/dataLoader';

export interface ListCategoriesResult {
  totalUnits: number;
  categories: Array<{ name: string; count: number }>;
  affiliations: Array<{ name: string; count: number }>;
  buildings: Array<{ name: string; count: number }>;
}

/**
 * List all filterable values with unit counts
 */
export function listCategories(): ListCategoriesResult {
  const categories = getCategories();
  const affiliations = getAffiliations();
  const buildings = getBuildings();

  const mapToArray = (map: Map<string, number>) =>
    Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

  return {
    totalUnits: getUnitCount(),
    categories: mapToArray(categories),
    affiliations: mapToArray(affiliations),
    buildings: mapToArray(buildings),
  };
}
