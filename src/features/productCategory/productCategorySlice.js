import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import productCategoryService from './productCategoryService'

export const getProductsCategory = createAsyncThunk('category/get-categories', async (thunkAPI) => {
    try {
        return await productCategoryService.getProductsCategory();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getProductCategory = createAsyncThunk('category/get-category', async (id, thunkAPI) => {
    try {
        return await productCategoryService.getProductCategory(id);
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

export const updateProductCategory = createAsyncThunk('category/update-category', async (category, thunkAPI) => {
    try {
        return await productCategoryService.updateProductCategory(category);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteProductCategory = createAsyncThunk('category/delete-category', async (id, thunkAPI) => {
    try {
        return await productCategoryService.deleteProductCategory(id);
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
            .addCase(getProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categoryName = action.payload.title;
            })
            .addCase(getProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProductCategory = action.payload;
            })
            .addCase(updateProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProductCategory = action.payload;
            })
            .addCase(deleteProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default productCategorySlice.reducer;