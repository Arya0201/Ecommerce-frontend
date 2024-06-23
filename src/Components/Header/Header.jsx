import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Actions/User';

const Header = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <header className="bg-purple-700 text-white py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-4">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" // Replace with your logo URL
                        alt="Logo"
                        className="h-8 w-8"
                    />
                    <h1 className="text-2xl font-bold">My Shopping</h1>
                </Link>
                
                <nav className="hidden md:flex space-x-4 self-center" >
                    <Link to="/" className="hover:text-gray-300  mt-3">Shop</Link>
                    <Link to="/cart" className="hover:text-gray-300 mt-3">Cart</Link>
                    <Link to="/orders" className="hover:text-gray-300 mt-3">Orders</Link>
                    {isAuthenticated ? (
                        <>
                            
                            <button
                                onClick={handleLogout}
                                className="hover:text-gray-300"
                            >
                                <Avatar src="/broken-image.jpg" />
                                {/* <span className="hover:text-gray-300">{user.username}</span> */}
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-gray-300 mt-3">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
