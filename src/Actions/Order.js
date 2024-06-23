import axios from "axios";
import {deleteCart} from './Cart';
import showToast from '../Utils/toast';

export const  createOrder = ({email, address,  contact, cartTotal},navigate) => async(dispatch)=>{
   try{
       
       dispatch({
           type:'createOrderRequest'
        });
        
        let accessToken =  localStorage.getItem("token");// Retrieve access token from localStorage
        
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json' // Adjust content type if necessary
            }
        };
        
        const payload ={address, email, contact, cartTotal}
        
        const response = await axios.post('http://localhost:5000/orders/', payload, config); // Adjust URL and endpoint as per your API setup
        
        dispatch({
            type: 'createOrderSuccess',
            payload: response.data 
        });

    dispatch(deleteCart());

    showToast('Order created successfully','success');

    navigate("/orders")

   }catch(error){
    dispatch({
        type: 'createOrderFailure',
        payload: error.response 
    });
    showToast('Failed to create order','error'); 
   }
}
export const  getUserOrder = () => async(dispatch)=>{
    try{
        
        dispatch({
            type:'getUserOrderRequest'
         });
         
         let accessToken =  localStorage.getItem("token");// Retrieve access token from localStorage
         
         const config = {
             headers: {
                 'Authorization': `Bearer ${accessToken}`,
                 'Content-Type': 'application/json' // Adjust content type if necessary
             }
         };
         
         
         const response = await axios.get('http://localhost:5000/orders/user-orders', config); // Adjust URL and endpoint as per your API setup
         
          console.log(response.data[0])

    if (response.data.msg === 'No Orders Found') {
        dispatch({
          type: 'getUserOrderSuccess',
          payload: [], // Set payload to an empty array if no orders are found
        });
      } else {
        dispatch({
          type: 'getUserOrderSuccess',
          payload:  response.data[0]   
        });
      }

    //  dispatch({
    //      type: 'getUserOrderSuccess',
    //      payload: response.data[0]  
    //  });
 
    }catch(error){
     dispatch({
         type: 'getUserOrderFailure',
         payload: error.response 
     });
    }
 }

 export const clearOrder =()=> async(dispatch)=>{
    dispatch({type:"clearOrder"})
 }