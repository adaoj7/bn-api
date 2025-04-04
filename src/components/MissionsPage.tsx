import { useState } from "react";
import { useMissionsSearch } from "../hooks/useSearch";
import { Mission } from "../types/gameTypes";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import ItemList from "./ItemList";

/**
 * Missions page component for displaying and filtering missions
 */
const MissionsPage = () => {
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

    // Fetch and filter missions
    const {
        data: missions,
        isLoading,
        error,
    } = useMissionsSearch({
        searchTerm,
        filterByCategory: selectedCategory,
        filterByType: selectedType,
        filterByLevel: selectedLevel,
        sortBy: "name",
        sortDirection: "asc",
    });

    // Mission categories and types for filters
    const categoryOptions = [
        { value: "Story", label: "Story" },
        { value: "Side", label: "Side Quest" },
        { value: "Tutorial", label: "Tutorial" },
        { value: "Special", label: "Special Event" },
    ];

    const typeOptions = [
        { value: "story", label: "Story" },
        { value: "side", label: "Side Quest" },
        { value: "special", label: "Special" },
    ];

    // Render additional mission info
    const renderMissionInfo = (mission: Mission) => (
        <div className="flex justify-between text-sm">
            <div>
                <span className="font-medium">Time:</span>{" "}
                {mission.estimatedTime} min
            </div>
            <div>
                <span className="font-medium">Rewards:</span>{" "}
                {mission.rewards.length}
            </div>
            <div>
                <span className="font-medium">Type:</span> {mission.type}
            </div>
        </div>
    );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Missions</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Browse all available missions in Battle Nations.
                </p>
            </div>

            <div className="mb-6">
                <SearchBar
                    onSearch={setSearchTerm}
                    placeholder="Search missions by name or description..."
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
                    Found {missions.length} missions
                </p>
            </div>

            <ItemList<Mission>
                items={missions}
                basePath="/missions"
                isLoading={isLoading}
                error={error}
                renderAdditionalInfo={renderMissionInfo}
            />
        </div>
    );
};

export default MissionsPage;
