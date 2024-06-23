import axios from "axios";
import showToast from '../Utils/toast';

 export const addToCart =({_id, title, price, image,selectedQuentity},navigate) => async (dispatch) =>{
    try{      
        dispatch({
            type:'addToCartRequest'
        });
         
        console.log(selectedQuentity)

        let accessToken =  localStorage.getItem("token");// Retrieve access token from localStorage

        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json' // Adjust content type if necessary
            }
        };


        const payload = {productId:_id, title, price, image,selectedQuentity};
        // console.log(payload)
        const response = await axios.post('http://localhost:5000/carts/', payload, config); // Adjust URL and endpoint as per your API setup
        dispatch({
            type: 'addToCartSuccess',
            payload: response.data.updatedCart // Assuming your API returns data on successful addition
        });
        showToast('Product added to cart successfully!', 'success');
        navigate('/cart');        
    }catch(error){
        // showToast('Failed to add product to cart.', 'error');
        dispatch({
            type: 'addToCartFailure',
            payload: error.response 
        });
    }
 }

 export const getCart = () => async (dispatch) =>{
    try{      
        dispatch({
            type:'getCartRequest'
        });
         

        let accessToken =  localStorage.getItem("token");

        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json' 
            }
        };


        const response = await axios.get('http://localhost:5000/carts/get-cart', config); // Adjust URL and endpoint as per your API setup
        console.log(response.data)

        if (response.data.message === 'Cart not found for this user') {
            dispatch({
              type: 'getCartSuccess',
              payload: [], 
            });
          } else {
            dispatch({
              type: 'getCartSuccess',
              payload:  response.data  
            });
          }

          

    }catch(error){
        dispatch({
            type: 'getCartFailure',
            payload: error.response
        });
    }
 }

 export const removeFromCart = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'removeFromCartRequest' });

        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.post('http://localhost:5000/carts/remove-cart-item', { productId }, config);
        console.log(response.data);

        dispatch({
            type: 'removeFromCartSuccess',
            payload: response.data,
        });
        showToast('Product is removed from cart.', 'success');

    } catch (error) {
       
        showToast('Failed to remove product from cart.', 'error');
        dispatch({
            type: 'removeFromCartFailure',
            payload: error.response,
        });
    }
};

export const updateCartQuantity = (productId, quantity) => async (dispatch) => {
    try {
        dispatch({ type: 'updateCartQuantityRequest' });

        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.post('http://localhost:5000/carts/update-cart-item-quantity', { productId, quantity }, config);
        console.log(response.data);

        dispatch({
            type: 'updateCartQuantitySuccess',
            payload: response.data,
        });

    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }

        dispatch({
            type: 'updateCartQuantityFailure',
            payload: { message: errorMessage },
        });
    }
};
export const deleteCart = ()=> async(dispatch)=>{
    try{

        dispatch({
            type:"deleteCartRequest"
        });
        
        const accessToken = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.delete('http://localhost:5000/carts/delete-cart', config);
        
        dispatch({
            type:"deleteCartSuccess"
        });

    }catch(error){
        console.log(error)
        dispatch({
            type:"deleteCartFailuer",
            payload:error.response
        })
    }

 }
export const clearCart = ()=> async(dispatch)=>{
   dispatch({
    type:"clearCart"
   })
}