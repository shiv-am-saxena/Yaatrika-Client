import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const ProtectedRoute = () => {
    const { isAuthenticated, loading, role } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    // Restrict "user" role from accessing /captain/* routes
    if (role === "user" && location.pathname.startsWith("/captain/")) {
        return <Navigate to="/user/home" replace />;
    }
    // Restrict "user" role from accessing /captain/* routes
    if (role === "captain" && location.pathname.startsWith("/user/")) {
        return <Navigate to="/captain/home" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
