import { useMutation } from "@tanstack/react-query";
import { postData } from "../config/apiService";

export const usePostData = (url) => {
    return useMutation({
        mutationFn: (body) => postData(url, body),
        onSuccess: (data) => {
            console.log("Mutation successful:", data);
        },
        onError: (error) => {
            console.error("Mutation error:", error.response || error.message);
        },
    });
};