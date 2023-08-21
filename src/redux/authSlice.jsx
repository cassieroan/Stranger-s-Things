import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, { payload: { token } }) => {
            state.token = token
        },
        logout: (state) => {
            state.token = null;
        }
    },
});
  
export const { setCredentials, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.token !== null;
