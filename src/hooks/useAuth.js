import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import { setUser, clearAuth, setLoading, setError } from "../context/slices/authSlice";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    const verifyToken = async () => {
        try {
            dispatch(setLoading(true));

            const response = await axiosInstance.get("/auth/verify-token");

            if (response.data.success) {
                dispatch(setUser(response.data.data));
            } else {
                throw new Error("Invalid token");
            }
        } catch (err) {
            console.error("Auth verification failed:", err);
            dispatch(setError(err.message || "Authentication failed"));
            dispatch(clearAuth());
            navigate("/login");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        verifyToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { user, loading, error };
};

export default useAuth;
