import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart, updateCartQuantity } from '../../Actions/Cart'; // Adjust path as per your project structure
import { useNavigate } from 'react-router-dom';
import Loading from '../Loader/Loading'; 

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartQuantity(productId, quantity));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className=" py-6">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">Your Cart</h1>
        {loading ? (
        <Loading />
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-500">No items in cart</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div key={item.productId} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <label htmlFor={`quantity-${item.productId}`} className="text-sm text-gray-600 mr-2">Quantity:</label>
                        <input
                          type="number"
                          id={`quantity-${item.productId}`}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                          className="border rounded-md w-16 text-center"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => handleRemoveFromCart(item.productId)}
                      className="mt-2 text-red-500 hover:text-red-700 transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-8 flex justify-end">
            <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-96">
              <h2 className="text-xl font-semibold mb-4">Total Price: ${calculateTotalPrice().toFixed(2)}</h2>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
