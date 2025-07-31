
import { resetOrderDetails } from "@/store/shop/order-slice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orderList: [],
    orderDetails: null
}


export const getAllOrdersForAdmin = createAsyncThunk(
    "/order/getAllOrdersForAdmin",
    async () => {
        const result = await axios.get(`http://localhost:5000/api/admin/orders/get`);
        return result?.data;
    }
)


export const getOrderDetailsForAdmin = createAsyncThunk(
    "/order/getOrderDetailsForAdmin",
    async (id) => {
        const result = await axios.get(`http://localhost:5000/api/admin/orders/details/${id}`);
        return result?.data;
    }
)

export const updateOrderStatusForAdmin = createAsyncThunk(
    "/order/updateOrderStatusForAdmin",
    async ({ id, orderStatus }) => {
        const result = await axios.put(`http://localhost:5000/api/admin/orders/update/${id}`, { orderStatus });
        return result?.data;
    }
)



const adminOrderSlice = createSlice({
   name : 'adminOrderSlice',
   initialState,
   reducers: {
    resetAdminOrderDetails:(state)=>{
        state.orderDetails = null
    }
   },
   extraReducers: (builder) => {
           builder
               .addCase(getAllOrdersForAdmin.pending, (state) => {
                   state.isLoading = true;
               })
               .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
                   state.isLoading = false;
                   state.orderList = action.payload.data;
               })
               .addCase(getAllOrdersForAdmin.rejected, (state) => {
                   state.isLoading = false;
                   state.orderList = [];
               })
               .addCase(getOrderDetailsForAdmin.pending, (state) => {
                   state.isLoading = true;
               })
               .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
                   state.isLoading = false;
                   state.orderDetails = action.payload.data;
               })
               .addCase(getOrderDetailsForAdmin.rejected, (state) => {
                   state.isLoading = false;
                   state.orderDetails = null;
               })
   
       }
})



export const { resetAdminOrderDetails } = adminOrderSlice.actions


export default adminOrderSlice.reducer