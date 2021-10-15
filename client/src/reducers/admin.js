import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';

const initialState = {
    status: 'idle',
    updating: false,
    errors: null,
    user: null,
    token: null,
    connected: false,
    disconnecting: false
};

export const getConnectedAdmin = createAsyncThunk(
    'user/get connected one',
    async () => {
        const response = await axios.get('/admin');
        return response.data;
    }
);

export const loginAdmin = createAsyncThunk(
    'user/login',
    async (body) => {
        const response = await axios.post('/admin/login', body);
        return response.data;
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        const response = await axios.delete('/admin/logout');
        return response.data;
    }
);

export const updateAdmin = createAsyncThunk(
    'user/signup',
    async (body) => {
        const response = await axios.post('/admin/update', body);
        return response.data;
    }
);

export const { reducer, actions } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
        },
        resetErrors: (state) => {
            state.errors = null;
        }
    },
    extraReducers: {
        [getConnectedAdmin.pending]: (state) => {
            state.status = 'loading';
        },
        [getConnectedAdmin.fulfilled]: (state, action) => {
            if (action.payload.code) {
                state.user = null;
                state.connected = false;
                state.status = 'failed';
            } else {
                state.user = action.payload;
                state.connected = true;
                state.status = 'fulfilled';
            }
        },
        [getConnectedAdmin.rejected]: (state, action) => {
            state.status = 'failed';
            state.errors = action.payload;
        },
        [loginAdmin.pending]: (state) => {
            state.status = 'loading';
        },
        [loginAdmin.fulfilled]: (state, action) => {
            if (action.payload.code) {
                state.user = null;
                state.connected = false;
                state.errors = action.payload;
                state.status = 'failed';
            } else {
                state.user = action.payload.user;
                state.connected = true;
                state.token = action.payload.tokens.accessToken;
                state.status = 'fulfilled';
                state.errors = null;
            }
        },
        [loginAdmin.rejected]: (state, action) => {
            state.status = 'failed';
            state.errors = action.payload;
        },
        [logoutUser.pending]: (state) => {
            state.disconnecting = true;
        },
        [logoutUser.fulfilled]: (state, action) => {
            if (action.payload.code) {
                state.errors = action.payload;
            } else {
                state.user = null;
                state.connected = false;
                state.errors = null;
            }
            state.disconnecting = false;
        },
        [logoutUser.rejected]: (state, action) => {
            state.disconnecting = false;
            state.errors = action.payload;
        },
        [updateAdmin.pending]: (state) => {
            state.updating = true;
        },
        [updateAdmin.fulfilled]: (state, action) => {
            if (action.payload.code) {
                state.status = 'failed';
                state.errors = action.payload.message;
            } else {
                state.user = action.payload;
                state.status = 'fulfilled';
            }
            state.updating = false;
        },
        [updateAdmin.rejected]: (state, action) => {
            state.status = 'failed';
            state.updating = false;
            state.errors = action.payload;
        },
    }
});

export const getReqStatus = state => state.admin.status;
export const getErrors = state => state.admin.errors;
export const getConnectionState = state => state.admin.connected;
export const getUser = state => state.admin.user;
export const isUpdating = state => state.admin.updating;
export const isLogingOut = state => state.admin.disconnecting;