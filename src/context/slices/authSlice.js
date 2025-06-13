import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("token"), // ✔️ Pre-fill based on token
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
            state.isAuthenticated = true; // ✅ Ensure login persists across reloads
        },
        clearAuth(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
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
