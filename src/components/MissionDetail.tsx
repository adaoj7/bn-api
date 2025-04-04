import { useParams, Link } from "react-router-dom";
import { useMission } from "../hooks/useGameData";
import { MissionRequirement, MissionReward } from "../types/gameTypes";

/**
 * Component for displaying detailed information about a mission
 */
const MissionDetail = () => {
    // Get mission ID from URL params
    const { id } = useParams<{ id: string }>();
    const missionId = id ? parseInt(id, 10) : 0;

    // Fetch mission data
    const { data: mission, isLoading, error } = useMission(missionId);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !mission) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>
                    Error loading mission:{" "}
                    {error?.message || "Mission not found"}
                </p>
                <Link
                    to="/missions"
                    className="text-blue-500 hover:underline mt-2 inline-block"
                >
                    &larr; Back to Missions
                </Link>
            </div>
        );
    }

    // Helper function to render mission requirement
    const renderRequirement = (req: MissionRequirement, index: number) => {
        let requirementText = "";

        switch (req.type) {
            case "level":
                requirementText = `Player Level ${req.level}`;
                break;
            case "unit":
                requirementText = `${req.amount}x Unit ID: ${req.id}`;
                break;
            case "building":
                requirementText = `${req.amount}x Building ID: ${req.id}`;
                break;
            case "mission":
                requirementText = `Complete Mission ID: ${req.id}`;
                break;
            default:
                requirementText = "Unknown requirement";
        }

        return (
            <li key={index} className="mb-1">
                {requirementText}
                {(req.type === "unit" ||
                    req.type === "building" ||
                    req.type === "mission") &&
                    req.id && (
                        <Link
                            to={`/${req.type}s/${req.id}`}
                            className="ml-2 text-blue-500 hover:underline"
                        >
                            (View)
                        </Link>
                    )}
            </li>
        );
    };

    // Helper function to render mission reward
    const renderReward = (reward: MissionReward, index: number) => (
        <div key={index} className="flex items-center mr-4 mb-2">
            <span className="font-medium mr-1">{reward.type}:</span>
            <span>{reward.amount}</span>
        </div>
    );

    return (
        <div>
            <Link
                to="/missions"
                className="text-blue-500 hover:underline mb-4 inline-block"
            >
                &larr; Back to Missions
            </Link>

            <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-4">
                        {/* Mission image */}
                        <div className="flex-shrink-0">
                            <img
                                src={mission.imageUrl}
                                alt={mission.name}
                                className="w-32 h-32 object-contain rounded-lg bg-gray-100 dark:bg-gray-700"
                            />
                        </div>

                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold">
                                    {mission.name}
                                </h1>
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                    Level {mission.unlockLevel}
                                </span>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mt-2">
                                {mission.description}
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
                                    <span>{mission.category}</span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Type:
                                    </span>
                                    <span>{mission.type}</span>
                                </div>
                                <div className="flex">
                                    <span className="font-medium w-32">
                                        Estimated Time:
                                    </span>
                                    <span>{mission.estimatedTime} minutes</span>
                                </div>
                                {mission.previousMission && (
                                    <div className="flex">
                                        <span className="font-medium w-32">
                                            Previous Mission:
                                        </span>
                                        <Link
                                            to={`/missions/${mission.previousMission}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Mission ID:{" "}
                                            {mission.previousMission}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                            <h2 className="text-xl font-semibold mb-3">
                                Requirements
                            </h2>
                            {mission.requirementsToUnlock.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {mission.requirementsToUnlock.map(
                                        (req, index) =>
                                            renderRequirement(req, index)
                                    )}
                                </ul>
                            ) : (
                                <p>No special requirements.</p>
                            )}
                        </div>
                    </div>

                    {/* Rewards */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Rewards</h2>
                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                            <div className="flex flex-wrap">
                                {mission.rewards.map((reward, index) =>
                                    renderReward(reward, index)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionDetail;
