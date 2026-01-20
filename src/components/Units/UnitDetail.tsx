import { useParams, Link } from "react-router-dom";
import { useUnit } from "../../hooks/useGameData";
import { Resource, Unit, UnitAction, NumericRange } from "../../types/gameTypes";

// Helper to format NumericRange as string
const formatRange = (range: NumericRange): string => {
    if (range.min === range.max) {
        return String(range.min);
    }
    return `${range.min}-${range.max}`;
};

// Helper to format seconds as human-readable time
const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);

    return parts.length > 0 ? parts.join(" ") : "0m";
};

/**
 * Component for displaying detailed information about a unit
 */
const UnitDetail = () => {
    // Get unit ID from URL params
    const { id } = useParams<{ id: string }>();
    const unitId = id ? parseInt(id, 10) : 0;

    // Fetch unit data
    const { data: unit, isLoading, error } = useUnit(unitId);

    console.log(unit);

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

    // Update the stats section to handle rank-based progression
    const renderUnitStats = (unit: Unit) => {
        const baseStats = unit.stats.ranks[0]; // Level 1 stats
        return (
            <div className="space-y-2">
                <div className="flex">
                    <span className="font-medium w-32">Health:</span>
                    <span>{baseStats.health}</span>
                </div>
                <div className="flex">
                    <span className="font-medium w-32">Defense:</span>
                    <span>{baseStats.defense}</span>
                </div>
                <div className="flex">
                    <span className="font-medium w-32">Dodge:</span>
                    <span>{baseStats.dodge}</span>
                </div>
                <div className="flex">
                    <span className="font-medium w-32">Bravery:</span>
                    <span>{baseStats.bravery}</span>
                </div>
                <div className="flex">
                    <span className="font-medium w-32">Range:</span>
                    <span>{baseStats.range}</span>
                </div>
            </div>
        );
    };

    // Update the actions section to handle the new structure
    const renderAction = (action: UnitAction) => {
        const baseRank = action.ranks[0];
        return (
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold mb-1">
                        {action.name}
                    </h3>
                    {action.unlockRank && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                            Unlocks at Rank {action.unlockRank}
                        </span>
                    )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {action.description}
                </p>
                <div className="flex flex-wrap gap-4">
                    {baseRank.damage && (
                        <div>
                            <span className="font-medium">Damage:</span>{" "}
                            {formatRange(baseRank.damage)}
                            {baseRank.hits && baseRank.hits > 1 && (
                                <span className="text-gray-500">
                                    {" "}
                                    (x{baseRank.hits})
                                </span>
                            )}
                        </div>
                    )}
                    {baseRank.offense && (
                        <div>
                            <span className="font-medium">Offense:</span>{" "}
                            {baseRank.offense}
                        </div>
                    )}
                    {baseRank.criticalChance && (
                        <div>
                            <span className="font-medium">Critical:</span>{" "}
                            {baseRank.criticalChance}%
                        </div>
                    )}
                    {action.ammo && (
                        <div>
                            <span className="font-medium">Ammo:</span>{" "}
                            {action.ammo}/{action.ammoUsed}
                        </div>
                    )}
                    {action.reloadTime && (
                        <div>
                            <span className="font-medium">Reload:</span>{" "}
                            {action.reloadTime} turns
                        </div>
                    )}
                    {action.cooldown && (
                        <div>
                            <span className="font-medium">Cooldown:</span>{" "}
                            {action.cooldown} turns
                        </div>
                    )}
                    {action.range && (
                        <div>
                            <span className="font-medium">Range:</span>{" "}
                            {formatRange(action.range)}
                        </div>
                    )}
                    {action.areaEffect && (
                        <div>
                            <span className="font-medium">Area Effect:</span>{" "}
                            Yes
                        </div>
                    )}
                </div>
                {action.unlockCost && (
                    <div className="mt-2 text-sm text-gray-500">
                        <span className="font-medium">Unlock Cost:</span>{" "}
                        {action.unlockCost.nanos} nanos,{" "}
                        {formatTime(action.unlockCost.time)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <Link
                to="/units"
                className="text-primary hover:underline mb-4 inline-block"
            >
                &larr; Back to Units
            </Link>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-4">
                        {/* Unit image */}
                        <div className="flex-shrink-0">
                            <img
                                src={unit.imageUrl}
                                alt={unit.name}
                                className="w-32 h-32 object-contain rounded-lg bg-gray-100"
                            />
                        </div>

                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold">
                                    {unit.name}
                                </h1>
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                    Level {unit.unlockLevel}
                                </span>
                            </div>

                            <p className="text-gray-700 mt-2">
                                {unit.description}
                            </p>

                            {unit.motto && (
                                <div className="mt-2 italic text-gray-600">
                                    "{unit.motto}"
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Basic information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
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
                                    <span>{unit.unitType}</span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Production Time:
                                    </span>
                                    <span>{formatTime(unit.productionTime)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Unit stats */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3">
                                Base Stats
                            </h2>
                            {renderUnitStats(unit)}
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
                                <div key={index}>{renderAction(action)}</div>
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
