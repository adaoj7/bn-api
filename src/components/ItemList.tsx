import { Link } from "react-router-dom";
import { BaseGameItem } from "../types/gameTypes";

interface ItemListProps<T extends BaseGameItem> {
    items: T[];
    basePath: string;
    isLoading: boolean;
    error: Error | null;
    renderAdditionalInfo?: (item: T) => React.ReactNode;
}

/**
 * Generic list component for displaying items
 */
const ItemList = <T extends BaseGameItem>({
    items,
    basePath,
    isLoading,
    error,
    renderAdditionalInfo,
}: ItemListProps<T>) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>Error loading data: {error.message}</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    No items found matching your criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <Link
                    key={item.id}
                    to={`${basePath}/${item.id}`}
                    className="block bg-white border rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden dark:bg-gray-700 dark:border-gray-600"
                >
                    <div className="flex">
                        {/* Item image */}
                        <div className="w-24 h-24 flex-shrink-0">
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-contain bg-gray-100 p-2 dark:bg-gray-800"
                            />
                        </div>

                        <div className="p-4 flex-grow">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold mb-2">
                                    {item.name}
                                </h3>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                    Level {item.unlockLevel}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                                {item.description}
                            </p>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.category}
                            </div>

                            {/* Optional additional information */}
                            {renderAdditionalInfo && (
                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                    {renderAdditionalInfo(item)}
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ItemList;
