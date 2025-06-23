// src/hooks/useLoginWithOtp.js
import { useMutation } from "@tanstack/react-query";
import { postData } from "../config/apiService";
import { useDispatch } from "react-redux";
import {
    setUser,
    setToken,
    setRole,
    setError,
    clearAuth,
    setLoading,
} from "../context/slices/authSlice";
import { showErrorToast, showSuccessToast } from "../lib/toast";
import { useNavigate } from "react-router-dom";

export const useLoginWithOtp = ({ phone, otp }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => postData("/auth/login", { phoneNumber: phone, otp }),
        onMutate: () => dispatch(setLoading(true)),

        onSuccess: (res) => {
            if (res.success) {
                localStorage.setItem("token", res.data.token);
                dispatch(setUser(res.data.user));
                dispatch(setToken(res.data.token));
                dispatch(setRole(res.data.role));
                showSuccessToast("OTP Verified");

                navigate(res.data.role === "user" ? "/user/home" : "/captain/home");
            }
        },

        onError: (err) => {
            const message = err?.response?.data?.message || "Login failed";
            dispatch(setError(message));
            showErrorToast(message);
            dispatch(clearAuth());
        },

        onSettled: () => dispatch(setLoading(false)),
    });
};
