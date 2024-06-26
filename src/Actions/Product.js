// products.js (Actions)

import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: 'GetProductsRequest',
    });

    const { data } = await axios.get('http://localhost:5000/products/');


    dispatch({
      type: 'GetProductsSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GetProductsFailure',
      payload: error.message,
    });
  }
};

export const getProductById = (id, products) => async (dispatch) => {
  try {
    dispatch({
      type: 'GetProductByIdRequest',
    })    


    const product = products.find((product) => product._id === id);

    if (!product) {
      dispatch({
        type: 'GetProductByIdFailure',
        payload: "Product not found",
      })
    }

    dispatch({
      type: 'GetProductByIdSuccess',
      payload: product,
    })
  } catch (error) {
    dispatch({
      type: 'GetProductByIdFailure',
      payload: error.response.data,
    })
  }
}
