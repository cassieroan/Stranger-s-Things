import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        username: null
    },
    reducers: {
        setCredentials: (state, { payload: { token, username } }) => {
            state.token = token;
            state.username = username;
        },
        logout: (state) => {
            state.token = null;
            state.username = null;
        }
    },
});
  
export const { setCredentials, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.token !== null;
