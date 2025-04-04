import { NavLink } from "react-router-dom";

/**
 * Home page component with an introduction to the Battle Nations Database
 */
const HomePage = () => {
    // Define the categories for easy navigation
    const categories = [
        {
            name: "Units",
            description:
                "Browse all military units including infantry, vehicles, and air units.",
            path: "/units",
            icon: "🪖",
        },
        {
            name: "Buildings",
            description:
                "Explore resource, military, and special buildings for your base.",
            path: "/buildings",
            icon: "🏢",
        },
        {
            name: "Missions",
            description:
                "Find details on story missions, side quests, and special events.",
            path: "/missions",
            icon: "🎯",
        },
    ];

    return (
        <div className="space-y-8">
            <div className="text-center py-12 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
                <h1 className="text-4xl font-bold mb-4">
                    Battle Nations Database
                </h1>
                <p className="text-xl max-w-3xl mx-auto mb-6">
                    Your comprehensive resource for units, buildings, and
                    missions in the Battle Nations game.
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-6">Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <NavLink
                            key={category.name}
                            to={category.path}
                            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow dark:bg-gray-700"
                        >
                            <div className="flex items-center mb-2">
                                <span className="text-3xl mr-2">
                                    {category.icon}
                                </span>
                                <h3 className="text-xl font-semibold">
                                    {category.name}
                                </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                {category.description}
                            </p>
                        </NavLink>
                    ))}
                </div>
            </section>

            <section className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="mb-4">
                    Battle Nations Database is a fan-made project designed to
                    provide detailed information about game elements in Battle
                    Nations.
                </p>
                <p>
                    Use the search and filter functions to quickly find exactly
                    what you're looking for, or browse through the categories to
                    discover new game content.
                </p>
            </section>
        </div>
    );
};

export default HomePage;
