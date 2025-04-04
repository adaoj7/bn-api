import { useParams, Link } from "react-router-dom";
import { useUnit } from "../hooks/useGameData";
import { Resource, StatRange, DamageRange } from "../types/gameTypes";

// Type guard function to check if a value is a StatRange
function isStatRange(value: unknown): value is StatRange {
    return (
        value !== null &&
        typeof value === "object" &&
        "base" in (value as object)
    );
}

// Type guard function to check if a value is a DamageRange
function isDamageRange(value: unknown): value is DamageRange {
    return (
        value !== null &&
        typeof value === "object" &&
        "base" in (value as object)
    );
}

/**
 * Component for displaying detailed information about a unit
 */
const UnitDetail = () => {
    // Get unit ID from URL params
    const { id } = useParams<{ id: string }>();
    const unitId = id ? parseInt(id, 10) : 0;

    // Fetch unit data
    const { data: unit, isLoading, error } = useUnit(unitId);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !unit) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>Error loading unit: {error?.message || "Unit not found"}</p>
                <Link
                    to="/units"
                    className="text-blue-500 hover:underline mt-2 inline-block"
                >
                    &larr; Back to Units
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
                to="/units"
                className="text-blue-500 hover:underline mb-4 inline-block"
            >
                &larr; Back to Units
            </Link>

            <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-4">
                        {/* Unit image */}
                        <div className="flex-shrink-0">
                            <img
                                src={unit.imageUrl}
                                alt={unit.name}
                                className="w-32 h-32 object-contain rounded-lg bg-gray-100 dark:bg-gray-700"
                            />
                        </div>

                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold">
                                    {unit.name}
                                </h1>
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                    Level {unit.unlockLevel}
                                </span>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mt-2">
                                {unit.description}
                            </p>

                            {unit.motto && (
                                <div className="mt-2 italic text-gray-600 dark:text-gray-400">
                                    "{unit.motto}"
                                </div>
                            )}
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
                                    <span>{unit.category}</span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Type:
                                    </span>
                                    <span>{unit.type}</span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Production Time:
                                    </span>
                                    <span>{unit.productionTime} seconds</span>
                                </div>
                            </div>
                        </div>

                        {/* Unit stats */}
                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                            <h2 className="text-xl font-semibold mb-3">
                                Stats
                            </h2>
                            <div className="space-y-2">
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Health:
                                    </span>
                                    <span>
                                        {isStatRange(unit.stats.health)
                                            ? unit.stats.health.base
                                            : unit.stats.health}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Attack:
                                    </span>
                                    <span>
                                        {isStatRange(unit.stats.attack)
                                            ? unit.stats.attack.base
                                            : unit.stats.attack}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Defense:
                                    </span>
                                    <span>
                                        {isStatRange(unit.stats.defense)
                                            ? unit.stats.defense.base
                                            : unit.stats.defense}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Range:
                                    </span>
                                    <span>{unit.stats.range}</span>
                                </div>
                                {unit.stats.movementSpeed && (
                                    <div className="flex">
                                        <span className="font-medium w-32">
                                            Movement:
                                        </span>
                                        <span>{unit.stats.movementSpeed}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Resource costs */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">
                            Resource Costs
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                            <div className="flex flex-wrap">
                                {renderResourceCosts(unit.cost)}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">Actions</h2>
                        <div className="space-y-4">
                            {unit.actions.map((action, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700"
                                >
                                    <h3 className="text-lg font-semibold mb-1">
                                        {action.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        {action.description}
                                    </p>
                                    <div className="flex flex-wrap">
                                        {action.damage && (
                                            <div className="mr-4">
                                                <span className="font-medium">
                                                    Damage:
                                                </span>{" "}
                                                {isDamageRange(action.damage)
                                                    ? action.damage.base
                                                    : action.damage}
                                            </div>
                                        )}
                                        {action.cooldown && (
                                            <div className="mr-4">
                                                <span className="font-medium">
                                                    Cooldown:
                                                </span>{" "}
                                                {action.cooldown} turns
                                            </div>
                                        )}
                                        {action.areaEffect && (
                                            <div className="mr-4">
                                                <span className="font-medium">
                                                    Area Effect:
                                                </span>{" "}
                                                Yes
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Special abilities */}
                    {unit.specialAbilities &&
                        unit.specialAbilities.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-3">
                                    Special Abilities
                                </h2>
                                <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                        {unit.specialAbilities.map(
                                            (ability, index) => (
                                                <li key={index}>{ability}</li>
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

export default UnitDetail;
