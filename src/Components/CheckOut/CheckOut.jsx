import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../Actions/Order';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
  const [form, setForm] = useState({
    email: '',
    address: '',
    contact: ''
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Email is invalid';
    }
    if (!form.address) {
      errors.address = 'Address is required';
    }
    if (!form.contact) {
      errors.contact = 'Contact is required';
    } else if (!/^\d{10}$/.test(form.contact)) {
      errors.contact = 'Contact is invalid';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(createOrder({ ...form, cartTotal: calculateTotalPrice() },navigate));
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const totalAmount = calculateTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition duration-300"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-600">Address And Payment</h1>
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="bg-purple-700 text-white shadow-md rounded-lg p-8 w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Shipping Address</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Enter Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium">
                  Enter Your Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
                  required
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium">
                  Enter Your Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
                  required
                />
                {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="bg-purple-700 text-white shadow-md rounded-lg p-8 w-full lg:w-1/2 mt-4 lg:mt-0 text-center">
            <h2 className="text-2xl font-bold">Total Amount:</h2>
            <p className="text-4xl mt-2 mb-4">${totalAmount.toFixed(2)}</p>
            <h2 className="text-2xl font-bold">Payment Method:</h2>
            <p className="text-2xl mt-2">Pay On Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
