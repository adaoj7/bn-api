import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Navigate,
    Outlet,
    ScrollRestoration,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import UnitsPage from "./components/UnitsPage";
import BuildingsPage from "./components/BuildingsPage";
import MissionsPage from "./components/MissionsPage";
import UnitDetail from "./components/UnitDetail";
import BuildingDetail from "./components/BuildingDetail";
import MissionDetail from "./components/MissionDetail";
import { ErrorBoundary } from "./components/ErrorBoundary";

/**
 * Root layout component that includes the navigation bar and main content area
 */

export default function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                refetchOnWindowFocus: false,
            },
        },
    });

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="units">
                    <Route index element={<UnitsPage />} />
                    <Route path=":id" element={<UnitDetail />} />
                </Route>
                <Route path="buildings">
                    <Route index element={<BuildingsPage />} />
                    <Route path=":id" element={<BuildingDetail />} />
                </Route>
                <Route path="missions">
                    <Route index element={<MissionsPage />} />
                    <Route path=":id" element={<MissionDetail />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        )
    );

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
function RootLayout() {
    return (
        <ErrorBoundary>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto p-4">
                    <Outlet />
                    <ScrollRestoration />
                </main>
                <footer className="bg-gray-800 text-white text-center py-4 mt-8">
                    <div className="container mx-auto">
                        <p>
                            Battle Nations Database © {new Date().getFullYear()}
                        </p>
                    </div>
                </footer>
            </div>
        </ErrorBoundary>
    );
}
