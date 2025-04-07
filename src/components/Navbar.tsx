import { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Main navigation component for the Battle Nations Database
 */
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Define navigation links
    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/units", label: "Units" },
        { path: "/buildings", label: "Buildings" },
        { path: "/missions", label: "Missions" },
    ];

    return (
        <nav className="bg-secondary text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center">
                        <NavLink to="/" className="font-bold text-xl">
                            Battle Nations DB
                        </NavLink>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex space-x-4">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `py-2 px-3 rounded hover:bg-gray-700 transition-colors ${
                                        isActive ? "bg-primary font-medium" : ""
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pb-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors ${
                                        isActive ? "bg-primary font-medium" : ""
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
