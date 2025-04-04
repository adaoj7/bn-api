import { useState } from "react";
import { useUnitsSearch } from "../hooks/useSearch";
import { Unit, StatRange } from "../types/gameTypes";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import ItemList from "./ItemList";

// Type guard function to check if a value is a StatRange
function isStatRange(value: unknown): value is StatRange {
    return (
        value !== null &&
        typeof value === "object" &&
        "base" in (value as object)
    );
}

/**
 * Units page component for displaying and filtering units
 */
const UnitsPage = () => {
    // State for search and filter options
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >(undefined);
    const [selectedType, setSelectedType] = useState<string | undefined>(
        undefined
    );
    const [selectedLevel, setSelectedLevel] = useState<number | undefined>(
        undefined
    );

    // Fetch and filter units
    const {
        data: units,
        isLoading,
        error,
    } = useUnitsSearch({
        searchTerm,
        filterByCategory: selectedCategory,
        filterByType: selectedType,
        filterByLevel: selectedLevel,
        sortBy: "name",
        sortDirection: "asc",
    });

    // Unit categories and types for filters
    const categoryOptions = [
        { value: "Infantry", label: "Infantry" },
        { value: "Vehicles", label: "Vehicles" },
        { value: "Air", label: "Air Units" },
        { value: "Special", label: "Special Units" },
    ];

    const typeOptions = [
        { value: "infantry", label: "Infantry" },
        { value: "vehicle", label: "Vehicle" },
        { value: "air", label: "Air" },
        { value: "special", label: "Special" },
    ];

    // Render additional unit info
    const renderUnitInfo = (unit: Unit) => (
        <div className="flex justify-between text-sm">
            <div>
                <span className="font-medium">Health:</span>{" "}
                {isStatRange(unit.stats.health)
                    ? unit.stats.health.base
                    : unit.stats.health}
            </div>
            <div>
                <span className="font-medium">Attack:</span>{" "}
                {isStatRange(unit.stats.attack)
                    ? unit.stats.attack.base
                    : unit.stats.attack}
            </div>
            <div>
                <span className="font-medium">Type:</span> {unit.type}
            </div>
        </div>
    );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Units</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Browse all available units in Battle Nations.
                </p>
            </div>

            <div className="mb-6">
                <SearchBar
                    onSearch={setSearchTerm}
                    placeholder="Search units by name or description..."
                />
            </div>

            <FilterPanel
                categoryOptions={categoryOptions}
                typeOptions={typeOptions}
                onCategoryChange={setSelectedCategory}
                onTypeChange={setSelectedType}
                onLevelChange={setSelectedLevel}
                selectedCategory={selectedCategory}
                selectedType={selectedType}
                selectedLevel={selectedLevel}
            />

            <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Found {units.length} units
                </p>
            </div>

            <ItemList<Unit>
                items={units}
                basePath="/units"
                isLoading={isLoading}
                error={error}
                renderAdditionalInfo={renderUnitInfo}
            />
        </div>
    );
};

export default UnitsPage;
