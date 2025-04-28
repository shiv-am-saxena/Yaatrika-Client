import { toast } from "react-toastify";

// Success Toast
export const showSuccessToast = (message) => {
    toast.success(message);
};

// Error Toast
export const showErrorToast = (message) => {
    toast.error(message);
};

// Info Toast
export const showInfoToast = (message) => {
    toast.info(message);
};
