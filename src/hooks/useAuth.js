import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import {
    setUser,
    clearAuth,
    setLoading,
    setError,
    setRole
} from "../context/slices/authSlice";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error, isAuthenticated, role } = useSelector(
        (state) => state.auth
    );

    const verifyToken = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const token = localStorage.getItem("token");
            const res = await axiosInstance.get("/verify-token", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                // withCredentials: true,
            });

            const response = res.data;

            if (response.success) {
                dispatch(setUser(response.data.user));
                dispatch(setRole(response.data.role));
            } else {
                throw new Error("Invalid token");
            }
        } catch (err) {
            dispatch(setError(err?.response?.data?.message || "Authentication failed"));
            dispatch(clearAuth());
            navigate("/auth/login", { replace: true });
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    return { user, loading, error, isAuthenticated, role };
};

export default useAuth;
