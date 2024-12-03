import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productCategoryService from './productCategoryService'

export const getProductsCategory = createAsyncThunk('category/get-categories', async (thunkAPI) => {
    try {
        return await productCategoryService.getProductsCategory();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    categories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const productCategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductsCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categories = action.payload;
            })
            .addCase(getProductsCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default productCategorySlice.reducer;