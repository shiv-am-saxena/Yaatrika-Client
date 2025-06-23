// src/hooks/useSendOtp.js
import { useMutation } from "@tanstack/react-query";
import { postData } from "../config/apiService";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../context/slices/authSlice";
import { showErrorToast, showSuccessToast } from "../lib/toast";

export const useSendOtp = ({ phone, setClicks, setDisabled }) => {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: () => postData("/auth/send-otp", { phoneNumber: phone }),
		onMutate: () => dispatch(setLoading(true)),

		onSuccess: (res) => {
			if (res.success) {
				showSuccessToast(res.message);
				setDisabled(true);
				setTimeout(() => setDisabled(false), 30000);
				setClicks((prev) => prev + 1);

				if (import.meta.env.VITE_ENV !== "production") {
					alert("OTP: " + res.data);
				}
				dispatch(setUser(res.data.user));
			}
		},

		onError: (err) => {
			const message = err?.response?.data?.message || "Failed to send OTP";
			showErrorToast(message);
		},

		onSettled: () => dispatch(setLoading(false)),
	});
};
