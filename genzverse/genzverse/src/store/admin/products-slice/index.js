import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: []
}


export const addNewProduct = createAsyncThunk(
    "/products/addNewproduct",
    async (formData) => {
        const result = await axios.post('http://localhost:5000/api/admin/products/add', formData, {
            headers: {
                'Content-Type': "application/json"
            }
        })
        return result?.data;
    }
)

export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {
        const result = await axios.get('http://localhost:5000/api/admin/products/get').catch(err => console.log(err))
        return result?.data;
    }
)

export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({ id, formData }) => {
        const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
            headers: {
                'Content-Type': "application/json"
            }
        })
        return result?.data;
    }
)

export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async ({ id }) => {
        const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)
        return result?.data;
    }
)


const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const deletedId = action.payload?.deletedProduct?._id;
                if (deletedId) {
                    state.productList = state.productList.filter(product => product._id !== deletedId);
                }
            })
            // .addCase(deleteProduct.fulfilled, (state, action) => {
            //     const deletedId = action.payload?.deletedProduct?._id;
            //     if (deletedId) {
            //         state.productList = state.productList.filter(product => product._id !== deletedId);
            //     }
            // })
    }
})

export default AdminProductsSlice.reducer