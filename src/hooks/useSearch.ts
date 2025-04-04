import { useMemo } from "react";
import { useUnits, useBuildings, useMissions } from "./useGameData";
import { Unit, Building, Mission } from "../types/gameTypes";

// Common search filter options interface
interface SearchFilterOptions {
    searchTerm: string;
    filterByCategory?: string;
    filterByType?: string;
    filterByLevel?: number;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
}

// Type to represent an item with a type property
interface WithType {
    type: string;
}

/**
 * Generic search and filter function
 */
function applySearchAndFilters<T extends Unit | Building | Mission>(
    items: T[] | undefined,
    options: SearchFilterOptions
): T[] {
    if (!items || items.length === 0) return [];

    let result = [...items];

    // Filter by search term using regex for more efficient search
    if (options.searchTerm) {
        const searchRegex = new RegExp(options.searchTerm, "i");
        result = result.filter((item) => {
            return (
                searchRegex.test(item.name) ||
                searchRegex.test(item.description)
            );
        });
    }

    // Apply category filter if provided
    if (options.filterByCategory) {
        result = result.filter(
            (item) => item.category === options.filterByCategory
        );
    }

    // Apply type filter if provided
    if (options.filterByType && result.length > 0 && "type" in result[0]) {
        result = result.filter((item) => {
            return (item as T & WithType).type === options.filterByType;
        });
    }

    // Apply level filter if provided
    if (typeof options.filterByLevel === "number") {
        const level = options.filterByLevel;
        result = result.filter((item) => item.unlockLevel <= level);
    }

    // Apply sorting if provided
    if (options.sortBy) {
        result.sort((a, b) => {
            const valueA = options.sortBy ? a[options.sortBy as keyof T] : null;
            const valueB = options.sortBy ? b[options.sortBy as keyof T] : null;

            if (typeof valueA === "string" && typeof valueB === "string") {
                return options.sortDirection === "desc"
                    ? valueB.localeCompare(valueA)
                    : valueA.localeCompare(valueB);
            }

            if (typeof valueA === "number" && typeof valueB === "number") {
                return options.sortDirection === "desc"
                    ? valueB - valueA
                    : valueA - valueB;
            }

            return 0;
        });
    }

    return result;
}

// Create a generic search hook to reduce code duplication
function useGameSearch<T extends Unit | Building | Mission>(
    useDataHook: () => {
        data: T[] | undefined;
        isLoading: boolean;
        error: Error | null;
    },
    options: SearchFilterOptions
) {
    const { data, isLoading, error } = useDataHook();

    const filteredData = useMemo(() => {
        return applySearchAndFilters<T>(data, options);
    }, [data, options]);

    return {
        data: filteredData,
        isLoading,
        error,
        count: filteredData.length,
    };
}

/**
 * Custom hook for searching and filtering units
 */
export function useUnitsSearch(options: SearchFilterOptions) {
    return useGameSearch<Unit>(useUnits, options);
}

/**
 * Custom hook for searching and filtering buildings
 */
export function useBuildingsSearch(options: SearchFilterOptions) {
    return useGameSearch<Building>(useBuildings, options);
}

/**
 * Custom hook for searching and filtering missions
 */
export function useMissionsSearch(options: SearchFilterOptions) {
    return useGameSearch<Mission>(useMissions, options);
}
