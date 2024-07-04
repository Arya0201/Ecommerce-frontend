import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, IconButton, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Actions/User';
import { ShoppingCart, Store, ExitToApp, AccountBox, Login, Menu } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
    root: {
        background:"#1f2937",
        color:"#ffffff"
    }
  }));

  const Header = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const classes = useStyles();




    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center space-x-4 text-white no-underline">
                    <Store fontSize="large" />
                    <Typography variant="h6">My Shopping</Typography>
                </Link>

                <Hidden mdUp>
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <Menu />
                    </IconButton>
                </Hidden>

                <Hidden smDown>
                    <nav className="flex space-x-6 items-center ml-auto">
                        <Link to="/" className="hover:text-yellow-300 flex items-center space-x-2 text-white no-underline">
                            <Store />
                            <span>Shop</span>
                        </Link>
                        <Link to="/cart" className="hover:text-yellow-300 flex items-center space-x-2 text-white no-underline">
                            <ShoppingCart />
                            <span>Cart</span>
                        </Link>
                        <Link to="/orders" className="hover:text-yellow-300 flex items-center space-x-2 text-white no-underline">
                            <AccountBox />
                            <span>Orders</span>
                        </Link>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="hover:text-yellow-300 flex items-center space-x-2 text-white no-underline"
                            >
                                <Avatar src="/broken-image.jpg" />
                                <ExitToApp />
                            </button>
                        ) : (
                            <Link to="/login" className="hover:text-yellow-300 flex items-center space-x-2 text-white no-underline">
                                <Login />
                                <span>Login</span>
                            </Link>
                        )}
                    </nav>
                </Hidden>

                <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                    <List className="w-64">
                        <ListItem button component={Link} to="/" onClick={toggleDrawer}>
                            <ListItemIcon><Store /></ListItemIcon>
                            <ListItemText primary="Shop" />
                        </ListItem>
                        <ListItem button component={Link} to="/cart" onClick={toggleDrawer}>
                            <ListItemIcon><ShoppingCart /></ListItemIcon>
                            <ListItemText primary="Cart" />
                        </ListItem>
                        <ListItem button component={Link} to="/orders" onClick={toggleDrawer}>
                            <ListItemIcon><AccountBox /></ListItemIcon>
                            <ListItemText primary="Orders" />
                        </ListItem>
                        {isAuthenticated ? (
                            <ListItem button onClick={() => { handleLogout(); toggleDrawer(); }}>
                                <ListItemIcon><ExitToApp /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        ) : (
                            <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
                                <ListItemIcon><Login /></ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItem>
                        )}
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
