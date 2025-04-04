import { useQuery } from "@tanstack/react-query";
import { Unit, Building, Mission } from "../types/gameTypes";

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
 * Custom hook for fetching buildings data
 * @returns A query result object with buildings data
 */
export function useBuildings() {
    return useQuery({
        queryKey: ["buildings"],
        queryFn: () => fetchData<Building[]>("/data/buildings.json"),
    });
}

/**
 * Custom hook for fetching missions data
 * @returns A query result object with missions data
 */
export function useMissions() {
    return useQuery({
        queryKey: ["missions"],
        queryFn: () => fetchData<Mission[]>("/data/missions.json"),
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

/**
 * Custom hook for fetching a specific building by ID
 * @param id - The ID of the building to fetch
 * @returns A query result object with the specific building
 */
export function useBuilding(id: number) {
    return useQuery({
        queryKey: ["buildings", id],
        queryFn: async () => {
            const data = await fetchData<Building[]>("/data/buildings.json");
            const building = data.find((building) => building.id === id);

            if (!building) {
                throw new Error(`Building with ID ${id} not found`);
            }

            return building;
        },
        enabled: !!id, // Only run the query if an ID is provided
    });
}

/**
 * Custom hook for fetching a specific mission by ID
 * @param id - The ID of the mission to fetch
 * @returns A query result object with the specific mission
 */
export function useMission(id: number) {
    return useQuery({
        queryKey: ["missions", id],
        queryFn: async () => {
            const data = await fetchData<Mission[]>("/data/missions.json");
            const mission = data.find((mission) => mission.id === id);

            if (!mission) {
                throw new Error(`Mission with ID ${id} not found`);
            }

            return mission;
        },
        enabled: !!id, // Only run the query if an ID is provided
    });
}
