import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogCategoryService from './blogCategoryService'

export const getBlogsCategory = createAsyncThunk('blogcategory/get-blogcategories', async (thunkAPI) => {
    try {
        return await blogCategoryService.getBlogsCategory();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

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
            });
    },
});

export default blogCategorySlice.reducer;