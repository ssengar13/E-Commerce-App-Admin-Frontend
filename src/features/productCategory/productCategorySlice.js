import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import productCategoryService from './productCategoryService'

export const getProductsCategory = createAsyncThunk('category/get-categories', async (thunkAPI) => {
    try {
        return await productCategoryService.getProductsCategory();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProductCategory = createAsyncThunk('category/create-category', async (categoryData, thunkAPI) => {
    try {
        return await productCategoryService.createProductCategory(categoryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("reset_all");
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
            })
            .addCase(createProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProductCategory = action.payload;
            })
            .addCase(createProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default productCategorySlice.reducer;