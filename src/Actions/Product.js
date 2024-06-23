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

export const getProductById = (id) => async (dispatch) => {
  try {
      dispatch({
          type: 'GetProductByIdRequest',
      })

      const { data } = await axios.get(`http://localhost:5000/products/get/${id}`)

      dispatch({
          type: 'GetProductByIdSuccess',
          payload: data,
      })
  } catch (error) {
      dispatch({
          type: 'GetProductByIdFailure',
          payload: error.response.data,
      })
  }
}
