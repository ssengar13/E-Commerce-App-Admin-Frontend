import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    user: getUserFromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                // Decide the condition for success or error here
                if (action.payload?.error) {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.payload.error;
                    state.user = null;
                } else {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.user = action.payload;
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Something went wrong!";
                state.user = null;
            });
    },
});


export default authSlice.reducer;