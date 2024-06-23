import { createReducer } from "@reduxjs/toolkit";
const initialState ={
    loading:false,
    error:null,
    orderItems:[]
}

export const orderReducer = createReducer(initialState,(builder) =>{
    builder
        .addCase('createOrderRequest',(state) =>{
            state.loading=true
            state.error=null
        })
        .addCase('createOrdeSuccess',(state) =>{
            state.loading=false
            state.error=null
        })
        .addCase('createOrderFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase('getUserOrderRequest',(state) =>{
            state.loading=true
            state.orderItems=null
            state.error=null
        })
        .addCase('getUserOrderSuccess',(state,action) =>{
            state.loading=false
            state.orderItems=action.payload
            state.error=null
        })
        .addCase('getUserOrderFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload.data
        })
        .addCase('clearOrder', (state) => {
            state.loading = false;
            state.error = null;
            state.orderItems = [];
        });
        
})