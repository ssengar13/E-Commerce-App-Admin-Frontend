import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import blogCategoryService from './blogCategoryService'

export const getBlogsCategory = createAsyncThunk('blogcategory/get-blogcategories', async (thunkAPI) => {
    try {
        return await blogCategoryService.getBlogsCategory();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlogCategory = createAsyncThunk('blogcategory/create-blogcategory', async (blogCategoryData, thunkAPI) => {
    try {
        return await blogCategoryService.createBlogCategory(blogCategoryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("reset_all");
const initialState = {
    blogcategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const blogCategorySlice = createSlice({
    name: 'blogcategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogsCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogsCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogcategories = action.payload;
            })
            .addCase(getBlogsCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlogCategory = action.payload;
            })
            .addCase(createBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);;
    },
});

export default blogCategorySlice.reducer;