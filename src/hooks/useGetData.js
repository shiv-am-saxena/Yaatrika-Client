import { useQuery } from "@tanstack/react-query";
import { getData } from "../config/apiService";

export const useGetData = (key, url, params = {}) => {
    return useQuery({
        queryKey: [key, params], // This is the new way to pass query keys in React Query v5
        queryFn: () => getData(url, params), // The function that fetches the data
    });
};
