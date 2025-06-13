import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a better loader component
    }

    // 🔒 Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    // ✅ Render the protected content
    return <Outlet />;
};

export default ProtectedRoute;
