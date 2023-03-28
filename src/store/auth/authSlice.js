import { createSlice } from '@reduxjs/toolkit';
import { statuses } from './statuses';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: statuses.notAuthenticated,
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state, /* action */ ) => {
            state.status = statuses.checking;
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload } ) => {
            state.status = statuses.authenticated;
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = statuses.notAuthenticated;
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions; 