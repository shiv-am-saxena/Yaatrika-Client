import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        clearAuth(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            state.isAuthenticated = false;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setUser, setToken, clearAuth, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
