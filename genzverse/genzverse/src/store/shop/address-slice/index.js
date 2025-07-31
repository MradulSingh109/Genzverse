import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    addressList: []
}

export const addNewAddress = createAsyncThunk(
    "/address/addNewAddress",
    async (formData) => {
        const result = await axios.post('http://localhost:5000/api/shop/address/add', formData)
        return result?.data;
    }
)

export const fetchAddress = createAsyncThunk(
    "/address/fetchAddress",
    async (userId) => {
        const result = await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`)
        return result?.data;
    }
)

export const editAddress = createAsyncThunk(
    "/address/editAddress",
    async ({ addressId, formData , userId}) => {
        const result = await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`, formData)
        return result?.data;
    }
)

export const deleteAddress = createAsyncThunk(
    "/address/deleteAddress",
    async ({addressId,userId}) => {
        const result = await axios.delete(`http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`)
        return result?.data;
    }
)



const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.addressList = action.payload.data;
            })
            .addCase(addNewAddress.rejected, (state) => {
                state.isLoading = false;
                // state.addressList = [];
            })
            .addCase(fetchAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(fetchAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                const deletedId = action.payload?.deletedAddress?._id;
                if (deletedId) {
                    state.addressList = state.addressList.filter(address => address._id !== deletedId);
                }
            })

    }
})

export default addressSlice.reducer