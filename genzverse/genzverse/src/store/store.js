// this is a global store where all the slices will be stored to be used in the app

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import AdminProductsSlice from './admin/products-slice';
import adminOrderSlice from './admin/order-slice';
import shopProductsSlice from './shop/products-slice';
import shopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';
import shopSearchSlice from './shop/search-slice';


const store = configureStore({
    reducer:{
        auth  : authReducer,
        adminProducts : AdminProductsSlice,
        adminOrder : adminOrderSlice,
        shopProducts: shopProductsSlice,
        shoppingCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        shopSearch: shopSearchSlice
    }
})

export default store;
