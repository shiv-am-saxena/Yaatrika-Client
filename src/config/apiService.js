import axiosInstance from "./axiosInstance";

// GET request
export const getData = async (url, params = {}) => {
    const response = await axiosInstance.get(url, { params });
    return response.data;
};

// POST request
export const postData = async (url, body = {}) => {
    const response = await axiosInstance.post(url, body);
    return response.data;

};
export const putData = async (url, body = {}) => {
    const response = await axiosInstance.put(url, body);
    return response.data;
};

// Multipart POST (for file uploads)
export const deleteData = async (url, body = {}) => {
    const response = await axiosInstance.delete(url, {
        data: body,
    });
    return response.data;
};
export const postMultipartData = async (url, body = {}, files = []) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(body)) {
        formData.append(key, value);
    }

    for (const { key, file } of files) {
        formData.append(key, file);
    }

    const response = await axiosInstance.post(url, formData);
    return response.data;
};
