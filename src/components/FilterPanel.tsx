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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        max="20"
                        step="1"
                        className="w-full bg-white"
                        value={selectedLevel || 20}
                        onChange={handleLevelChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
