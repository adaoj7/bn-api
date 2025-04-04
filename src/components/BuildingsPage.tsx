import { useState } from "react";
import { useBuildingsSearch } from "../hooks/useSearch";
import { Building } from "../types/gameTypes";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import ItemList from "./ItemList";

/**
 * Buildings page component for displaying and filtering buildings
 */
const BuildingsPage = () => {
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

    // Fetch and filter buildings
    const {
        data: buildings,
        isLoading,
        error,
    } = useBuildingsSearch({
        searchTerm,
        filterByCategory: selectedCategory,
        filterByType: selectedType,
        filterByLevel: selectedLevel,
        sortBy: "name",
        sortDirection: "asc",
    });

    // Building categories and types for filters
    const categoryOptions = [
        { value: "Resource", label: "Resource" },
        { value: "Military", label: "Military" },
        { value: "Core", label: "Core" },
        { value: "Decoration", label: "Decoration" },
    ];

    const typeOptions = [
        { value: "resource", label: "Resource" },
        { value: "military", label: "Military" },
        { value: "decoration", label: "Decoration" },
        { value: "special", label: "Special" },
    ];

    // Render additional building info
    const renderBuildingInfo = (building: Building) => (
        <div className="flex justify-between text-sm">
            <div>
                <span className="font-medium">Size:</span>{" "}
                {building.footprint.width}x{building.footprint.height}
            </div>
            <div>
                <span className="font-medium">Time:</span>{" "}
                {building.constructionTime} sec
            </div>
            <div>
                <span className="font-medium">Type:</span> {building.type}
            </div>
        </div>
    );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Buildings</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Browse all available buildings in Battle Nations.
                </p>
            </div>

            <div className="mb-6">
                <SearchBar
                    onSearch={setSearchTerm}
                    placeholder="Search buildings by name or description..."
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
                    Found {buildings.length} buildings
                </p>
            </div>

            <ItemList<Building>
                items={buildings}
                basePath="/buildings"
                isLoading={isLoading}
                error={error}
                renderAdditionalInfo={renderBuildingInfo}
            />
        </div>
    );
};

export default BuildingsPage;
