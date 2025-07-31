import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchResults: []
}

export const getSearchResults = createAsyncThunk(
    "/search/getSearchResults",
    async ({ keyword, category, subcategory, sortBy }) => {
        let url = `http://localhost:5000/api/shop/search/${keyword}?`;
        if (category) {
            url += `category=${category}&`;
        }
        if (subcategory) {
            url += `subcategory=${subcategory}&`;
        }
        if (sortBy) {
            url += `sortBy=${sortBy}&`;
        }
        const result = await axios.get(url);
        return result?.data;
    }
)

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSearchResults.pending, (state) => {
            state.isLoading = true;
        }).addCase(getSearchResults.fulfilled, (state, action) => {
            state.isLoading = false;
            state.searchResults = action.payload.data
        }).addCase(getSearchResults.rejected, (state) => {
            state.isLoading = false;
            state.searchResults = []
        })
    }
})

export default searchSlice.reducer
