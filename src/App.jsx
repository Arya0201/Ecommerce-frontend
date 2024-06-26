import "./App.css";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

import ProductPage from "./Components/Product/ProductPage";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetail from "./Components/Product/ProductDetail";
import SignUp from "./Components/SignUp/SignUp";
import CartPage from "./Components/Cart/CartPage";
import CheckOut from "./Components/CheckOut/CheckOut";
import Orders from "./Components/Order/Orders";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
   const dispatch =useDispatch();
   useEffect(()=>{
    let user=localStorage.getItem('user');
    if(user)
      {
        dispatch({
          type:"LoadUserSuccess",
          payload:user
        })
      }
   },[]);

    return(
      <Router>
      { <Header />}

      <Routes>
        <Route path="/" element={<ProductPage/>} />
        <Route path="/checkout" element={<CheckOut/>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products/:productId" element={<ProductDetail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
     
    </Router>
    );
}

export default App;