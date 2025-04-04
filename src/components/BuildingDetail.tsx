import { useParams, Link } from "react-router-dom";
import { useBuilding } from "../hooks/useGameData";
import { Resource } from "../types/gameTypes";

/**
 * Component for displaying detailed information about a building
 */
const BuildingDetail = () => {
    // Get building ID from URL params
    const { id } = useParams<{ id: string }>();
    const buildingId = id ? parseInt(id, 10) : 0;

    // Fetch building data
    const { data: building, isLoading, error } = useBuilding(buildingId);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !building) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>
                    Error loading building:{" "}
                    {error?.message || "Building not found"}
                </p>
                <Link
                    to="/buildings"
                    className="text-blue-500 hover:underline mt-2 inline-block"
                >
                    &larr; Back to Buildings
                </Link>
            </div>
        );
    }

    // Helper function to render resource costs
    const renderResourceCosts = (resources: Resource[]) => {
        return resources.map((resource, index) => (
            <div key={index} className="flex items-center mr-4">
                <span className="font-medium mr-1">{resource.type}:</span>
                <span>{resource.amount}</span>
            </div>
        ));
    };

    return (
        <div>
            <Link
                to="/buildings"
                className="text-blue-500 hover:underline mb-4 inline-block"
            >
                &larr; Back to Buildings
            </Link>

            <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-4">
                        {/* Building image */}
                        <div className="flex-shrink-0">
                            <img
                                src={building.imageUrl}
                                alt={building.name}
                                className="w-32 h-32 object-contain rounded-lg bg-gray-100 dark:bg-gray-700"
                            />
                        </div>

                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold">
                                    {building.name}
                                </h1>
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                    Level {building.unlockLevel}
                                </span>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mt-2">
                                {building.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Basic information */}
                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                            <h2 className="text-xl font-semibold mb-3">
                                Basic Information
                            </h2>
                            <div className="space-y-2">
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Category:
                                    </span>
                                    <span>{building.category}</span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Type:
                                    </span>
                                    <span>{building.type}</span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Footprint:
                                    </span>
                                    <span>
                                        {building.footprint.width}x
                                        {building.footprint.height}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Construction Time:
                                    </span>
                                    <span>
                                        {building.constructionTime} seconds
                                    </span>
                                </div>
                                {building.populationBonus && (
                                    <div className="flex">
                                        <span className="font-medium w-32">
                                            Population Bonus:
                                        </span>
                                        <span>+{building.populationBonus}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resource costs */}
                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                            <h2 className="text-xl font-semibold mb-3">
                                Resource Costs
                            </h2>
                            <div className="flex flex-wrap">
                                {renderResourceCosts(building.cost)}
                            </div>
                        </div>
                    </div>

                    {/* Production */}
                    {building.production && building.production.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3">
                                Production
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                                <div className="space-y-2">
                                    {building.production.map((prod, index) => (
                                        <div key={index} className="flex">
                                            <span className="font-medium w-32">
                                                {prod.resourceType}:
                                            </span>
                                            <span>
                                                {prod.amountPerHour} per hour
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Building requirements */}
                    {building.buildingRequirements &&
                        building.buildingRequirements.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-3">
                                    Requirements
                                </h2>
                                <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                                    <p>
                                        This building requires the following
                                        buildings:
                                    </p>
                                    <ul className="list-disc pl-5 mt-2">
                                        {building.buildingRequirements.map(
                                            (reqId, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={`/buildings/${reqId}`}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Building ID: {reqId}
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default BuildingDetail;
