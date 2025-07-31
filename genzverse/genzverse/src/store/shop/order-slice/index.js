
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    approvalUrl: null,
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null
}


export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder",
    async (orderData) => {
        const result = await axios.post('http://localhost:5000/api/shop/order/create', orderData)
        return result?.data;
    }
)


export const capturePayment = createAsyncThunk(
    "/order/capturePayment",
    async ({ paymentId, orderId, payerId }) => {
        const result = await axios.post('http://localhost:5000/api/shop/order/capture', {
            paymentId,
            orderId,
            payerId
        });
        return result?.data;
    }
)


export const getAllOrdersByUserId = createAsyncThunk(
    "/order/getAllOrdersByUserId",
    async (userId) => {
        const result = await axios.get(`http://localhost:5000/api/shop/order/list/${userId}`);
        return result?.data;
    }
)


export const getOrderDetails = createAsyncThunk(
    "/order/getOrderDetails",
    async (id) => {
        const result = await axios.get(`http://localhost:5000/api/shop/order/details/${id}`);
        return result?.data;
    }
)



const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {
        resetOrderDetails: (state, action) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.approvalUrl = action.payload.approvalUrl
                state.orderId = action.payload.orderId
                sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
            })
            .addCase(createNewOrder.rejected, (state) => {
                state.isLoading = false
                state.approvalUrl = null
                state.orderId = null
            })
            .addCase(capturePayment.pending, (state) => {
                state.isLoading = true;
                state.isPaymentCaptured = false;
            })
            .addCase(capturePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isPaymentCaptured = action.payload.success;
            })
            .addCase(capturePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isPaymentCaptured = false;
                state.error = action.error.message;
            })
            .addCase(getAllOrdersByUserId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getAllOrdersByUserId.rejected, (state) => {
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            })

    }

})

export const { resetOrderDetails } = shoppingOrderSlice.actions

export default shoppingOrderSlice.reducer
