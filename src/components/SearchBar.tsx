import { useState, ChangeEvent } from "react";

interface SearchBarProps {
    onSearch: (term: string) => void;
    placeholder?: string;
    initialValue?: string;
}

/**
 * Reusable search bar component with debounce functionality
 */
const SearchBar = ({
    onSearch,
    placeholder = "Search...",
    initialValue = "",
}: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    // Handle search input changes
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Use regex with debounce for more efficient search
        const debounceTime = setTimeout(() => {
            onSearch(value);
        }, 300);

        return () => clearTimeout(debounceTime);
    };

    return (
        <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <input
                type="search"
                className="w-full p-3 pl-10 text-md border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchBar;
