import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 60000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Automatically add Authorization header from localStorage
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            console.log("Sending multipart/form-data");
            delete config.headers["Content-Type"]; // Let browser set it automatically
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
