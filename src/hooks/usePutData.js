import { useMutation } from "@tanstack/react-query";
import { putData } from "../config/apiService";

export const usePutData = (url) => {
    return useMutation({
        mutationFn: (body) => putData(url, body),
        onSuccess: (data) => {
            console.log("Mutation successful:", data);
        },
        onError: (error) => {
            console.error("Mutation error:", error.response || error.message);
        },
    });
};