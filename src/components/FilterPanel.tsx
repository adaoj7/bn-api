import { ChangeEvent } from "react";

interface FilterOption {
    value: string;
    label: string;
}

interface FilterPanelProps {
    categoryOptions: FilterOption[];
    typeOptions: FilterOption[];
    onCategoryChange: (category: string | undefined) => void;
    onTypeChange: (type: string | undefined) => void;
    onLevelChange: (level: number | undefined) => void;
    selectedCategory?: string;
    selectedType?: string;
    selectedLevel?: number;
    sortBy: "unlockLevel" | "name";
    sortDirection: "asc" | "desc";
    onSortByChange: (sortBy: "unlockLevel" | "name") => void;
    onSortDirectionChange: (direction: "asc" | "desc") => void;
}

/**
 * Filter panel component for filtering items by category, type, and level
 */
const FilterPanel = ({
    categoryOptions,
    typeOptions,
    onCategoryChange,
    onTypeChange,
    onLevelChange,
    selectedCategory,
    selectedType,
    selectedLevel,
    sortBy,
    sortDirection,
    onSortByChange,
    onSortDirectionChange,
}: FilterPanelProps) => {
    // Handle category filter change
    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onCategoryChange(value === "" ? undefined : value);
    };

    // Handle type filter change
    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onTypeChange(value === "" ? undefined : value);
    };

    // Handle level filter change
    const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onLevelChange(value === "" ? undefined : parseInt(value, 10));
    };



    return (
        <div className="p-4 rounded-lg mb-6 bg-gray-300">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Category filter */}
                <div>
                    <label
                        htmlFor="category-filter"
                        className="block mb-2 text-sm font-medium"
                    >
                        Category
                    </label>
                    <select
                        id="category-filter"
                        className="w-full p-2 border rounded-md"
                        value={selectedCategory || ""}
                        onChange={handleCategoryChange}
                    >
                        <option value="">All Categories</option>
                        {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type filter */}
                <div>
                    <label
                        htmlFor="type-filter"
                        className="block mb-2 text-sm font-medium"
                    >
                        Type
                    </label>
                    <select
                        id="type-filter"
                        className="w-full p-2 border rounded-md"
                        value={selectedType || ""}
                        onChange={handleTypeChange}
                    >
                        <option value="">All Types</option>
                        {typeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Level filter */}
                <div>
                    <label
                        htmlFor="level-filter"
                        className="block mb-2 text-sm font-medium"
                    >
                        Maximum Level ({selectedLevel || "Any"})
                    </label>
                    <input
                        id="level-filter"
                        type="range"
                        min="1"
                        max="75"
                        step="1"
                        className="w-full bg-white"
                        value={selectedLevel || 75}
                        onChange={handleLevelChange}
                    />
                </div>

                {/* Sort by */}
                <div>
                    <label
                        htmlFor="sort-by"
                        className="block mb-2 text-sm font-medium"
                    >
                        Sort By
                    </label>
                    <select
                        id="sort-by"
                        className="w-full p-2 border rounded-md"
                        value={sortBy}
                        onChange={(e) => onSortByChange(e.target.value as "unlockLevel" | "name")}
                    >
                        <option value="unlockLevel">Unlock Level</option>
                        <option value="name">Name</option>
                    </select>
                </div>

                {/* Sort direction */}
                <div>
                    <label
                        htmlFor="sort-direction"
                        className="block mb-2 text-sm font-medium"
                    >
                        Direction
                    </label>
                    <select
                        id="sort-direction"
                        className="w-full p-2 border rounded-md"
                        value={sortDirection}
                        onChange={(e) => onSortDirectionChange(e.target.value as "asc" | "desc")}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
