import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './Reducers/User'
import {productsReducer} from './Reducers/Product'
import {cartReducer} from './Reducers/Cart'
import {orderReducer} from'./Reducers/Order'


const store = configureStore({
    reducer: {
        user: userReducer,
        products:productsReducer,
        cart:cartReducer,
        order:orderReducer
    },
})

export default store