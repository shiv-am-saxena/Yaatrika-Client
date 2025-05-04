import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000, // 10 seconds timeout
});

export default axiosInstance;
