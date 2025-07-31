import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    cart: null
}


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity, size }) => {
        const response = await axios.post(`http://localhost:5000/api/shop/cart/add`,
            { userId, productId, quantity, size }
        )
        return response?.data
    }
)

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`)
        console.log("Response from fetchCartItems API:", response.data)
        return response?.data
    }
)
export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId, size }) => {
        const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}/${size}`)
        return response?.data
    }
)

export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(`http://localhost:5000/api/shop/cart/update-cart`,
            { userId, productId, quantity }
        )
        return response?.data
    }
)


const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = null;
        }
    },
        extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload.data
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cart = null;
        }).addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload.data
        }).addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cart = null;
        }).addCase(updateCartQuantity.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload.data
        }).addCase(updateCartQuantity.rejected, (state) => {
            state.isLoading = false;
            state.cart = null;
        }).addCase(deleteCartItem.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload.data
        }).addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cart = null;
        })
    }
})

export const { removeFromCart, clearCart } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer
