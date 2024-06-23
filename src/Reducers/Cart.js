import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    cartItems: [],
    cartId: null,
};

export const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('addToCartRequest', (state) => {
            state.loading = true
            state.error = null
        })
        .addCase('addToCartSuccess', (state, action) => {
            state.loading = false
            state.cartItems = action.payload.products
            state.cartId = action.payload._id
        })
        .addCase('addToCartFailure', (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase('getCartRequest', (state) => {
            state.loading = true
            state.error = null
        })
        .addCase('getCartSuccess', (state, action) => {
            state.loading = false
            state.cartItems = action.payload.cart.products
            state.cartId = action.payload.cart._id
        })
        .addCase('getCartFailure', (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
        .addCase('removeFromCartRequest', (state) => {
            state.loading = true
            state.error = null
        })
        .addCase('removeFromCartSuccess', (state, action) => {
            state.loading = false
            state.cartItems = action.payload.updatedCart.products
            state.cartId = action.payload.updatedCart._id
        })
        .addCase('removeFromCartFailure', (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
        .addCase('updateCartQuantityRequest', (state) => {
            state.loading = true
            state.error = null
        })
        .addCase('updateCartQuantitySuccess', (state, action) => {
            state.loading = false
            state.cartItems = action.payload.updatedCart.products
            state.cartId = action.payload.updatedCart._id
        })
        .addCase('updateCartQuantityFailure', (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
        .addCase('deleteCartRequest',(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase('deleteCartSuccess',(state)=>{
            state.loading = false
            state.error = null
            state.cartItems = []
            state.cartId = null
        })
        .addCase('deleteCartFailuer',(state,action)=>{
            state.loading = false
            state.error = action.payload
         
        })
        .addCase('clearCart', (state) => {
            state.loading = false
            state.error = null
            state.cartItems = []
            state.cartId = null
        })
        .addDefaultCase((state) => state)
});

export default cartReducer;
