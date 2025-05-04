import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import { setUser, clearAuth, setLoading, setError, setToken } from "../context/slices/authSlice";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);
    const token = localStorage.getItem('token');
    const verifyToken = async () => {
        try {
            dispatch(setLoading(true));

            const res = await axiosInstance.get("/verify-token",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },});
            const response = await res.data;
            if (response.success) {
                dispatch(setUser(response.data.user));
                dispatch(setToken(response.data.token))
            } else {
                throw new Error("Invalid token");
            }
        } catch (err) {
            console.error("Auth verification failed:", err);
            dispatch(setError(err.message || "Authentication failed"));
            dispatch(clearAuth());
            navigate("/auth/login");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        verifyToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { user, loading, error, isAuthenticated };
};

export default useAuth;
