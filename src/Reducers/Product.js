// products.js (Reducer)

import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
  product:null
};

export const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('GetProductsRequest', (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase('GetProductsSuccess', (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    })
    .addCase('GetProductsFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('GetProductByIdRequest',(state,action)=>{
      state.loading=true;
      state.errro=null;
      state.product = null;
    })
    .addCase('GetProductByIdSuccess',(state,action)=>{
      state.loading=false;
      state.product=action.payload;
      state.error = null;
    })
    .addCase('GetProductByIdFailure',(state,action)=>{
      state.loading=false;
      state.error=action.payload;
      state.product = null;
    });
});
