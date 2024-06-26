import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Actions/User';
import { ShoppingCart, Store, ExitToApp, AccountBox, Login } from '@mui/icons-material';

const Header = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <header className="bg-gray-800 text-white py-4 shadow-lg overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4">
                <Store fontSize="large" />
                <h1 className="text-2xl font-bold">My Shopping</h1>
            </Link>
            
            <nav className="hidden md:flex space-x-6 items-center">
                <Link to="/" className="hover:text-yellow-300 flex items-center space-x-2">
                    <Store />
                    <span>Shop</span>
                </Link>
                <Link to="/cart" className="hover:text-yellow-300 flex items-center space-x-2">
                    <ShoppingCart />
                    <span>Cart</span>
                </Link>
                <Link to="/orders" className="hover:text-yellow-300 flex items-center space-x-2">
                    <AccountBox />
                    <span>Orders</span>
                </Link>
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="hover:text-yellow-300 flex items-center space-x-2"
                    >
                        <Avatar src="/broken-image.jpg" />
                        <ExitToApp />
                        {/* <span className="hover:text-yellow-300">{user.username}</span> */}
                    </button>
                ) : (
                    <Link to="/login" className="hover:text-yellow-300 flex items-center space-x-2">
                        <Login />
                        <span>Login</span>
                    </Link>
                )}
            </nav>
        </div>
    </header>
    );
};

export default Header;
