import { useState } from "react";
import { useUnitsSearch } from "../../hooks/useSearch";
import { Unit } from "../../types/gameTypes";
import SearchBar from "../SearchBar";
import FilterPanel from "../FilterPanel";
import ItemList from "../ItemList";

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
                {unit.stats.ranks[0].health}
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
                <p className="text-lg">
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
                <p className="text-lg">Found {units.length} units</p>
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
