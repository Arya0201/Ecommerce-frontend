import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder } from '../../Actions/Order'; // Adjust the path as per your file structure
import Loading from '../Loader/Loading'; 
const Orders = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { orderItems, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserOrder()); // Dispatch the action to fetch user orders
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-10 text-purple-600">Your Orders</h1>
      <div className="w-full max-w-4xl">
        {loading ? (
          <Loading/>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : orderItems.length === 0 ? (
          <div className="text-center text-gray-500">No orders found</div>
        ) : (
          orderItems.map((orderArray, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg mb-6 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>
                <p className="text-gray-600"><span className="font-bold">Order ID:</span> {orderArray._id}</p>
                <p className="text-gray-600"><span className="font-bold">Total Amount:</span> ${orderArray.paymentIntent.amount.toFixed(2)}</p>
                <p className="text-gray-600"><span className="font-bold">Contact:</span> {orderArray.contact}</p>
                <p className="text-gray-600"><span className="font-bold">Address:</span> {orderArray.address}</p>
                <p className="text-gray-600"><span className="font-bold">Email:</span> {orderArray.email}</p>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Products</h3>
                  <ul className="space-y-2">
                    {orderArray.products.map((product) => (
                      <li key={product._id} className="flex items-center space-x-4">
                        <img src={product.productId.image} alt={product.productId.title} className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <h4 className="text-lg font-semibold text-gray-700">{product.productId.title}</h4>
                          <p className="text-gray-600">Quantity: {product.quantity}</p>
                          <p className="text-gray-600">Price: ${product.productId.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
