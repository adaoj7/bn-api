import { useQuery } from "@tanstack/react-query";
import { Unit } from "../types/gameTypes";

/**
 * Fetches data from a JSON file
 * @param path - The path to the JSON file
 * @returns The data from the JSON file
 */
async function fetchData<T>(path: string): Promise<T> {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${path}`);
    }
    return response.json();
}

/**
 * Custom hook for fetching units data
 * @returns A query result object with units data
 */
export function useUnits() {
    return useQuery({
        queryKey: ["units"],
        queryFn: () => fetchData<Unit[]>("/data/units.json"),
    });
}

/**
 * Custom hook for fetching a specific unit by ID
 * @param id - The ID of the unit to fetch
 * @returns A query result object with the specific unit
 */
export function useUnit(id: number) {
    return useQuery({
        queryKey: ["units", id],
        queryFn: async () => {
            const data = await fetchData<Unit[]>("/data/units.json");
            const unit = data.find((unit) => unit.id === id);

            if (!unit) {
                throw new Error(`Unit with ID ${id} not found`);
            }

            return unit;
        },
        enabled: !!id, // Only run the query if an ID is provided
    });
}
