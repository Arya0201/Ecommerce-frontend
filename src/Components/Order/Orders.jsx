import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder } from '../../Actions/Order'; // Adjust the path as per your file structure
import Loading from '../Loader/Loading';
import {
  Container,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  makeStyles
} from '@material-ui/core';
import {
  Assignment,
  AttachMoney,
  ContactPhone,
  Home,
  Email as EmailIcon,
  ShoppingCart,
} from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6', // Light gray background
    padding: theme.spacing(4),
  },
  container: {
    maxWidth: '900px',
    width: '100%',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
    color: '#1f2937', // Indigo color for title
  },
  paper: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
  },
  orderDetails: {
    marginBottom: theme.spacing(2),
  },
  orderText: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  productImage: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  },
}));

const Orders = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { orderItems, loading, error } = useSelector((state) => state.order);
  const classes = useStyles();

  useEffect(() => {
    console.log("hello" , orderItems)
    if (isAuthenticated && orderItems) {
      dispatch(getUserOrder()); // Dispatch the action to fetch user orders
      console.log("after" , orderItems)
    }
  }, []);

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h1" className={classes.title} align="center">
          Your Orders
        </Typography>
        {loading ? (
          <Loading />
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : orderItems.length === 0 ? (
          <Typography color="textSecondary" align="center">No orders found</Typography>
        ) : (
          orderItems.map((orderArray, index) => (
            <Paper key={index} className={classes.paper}>
              <div className={classes.orderDetails}>
                <Typography variant="h2" className={classes.orderText}>
                  <Assignment className={classes.icon} /> Order Details
                </Typography>
                <Typography className={classes.orderText}>
                  <strong>Order ID:</strong> {orderArray._id}
                </Typography>
                <Typography className={classes.orderText}>
                  <AttachMoney className={classes.icon} /> <strong>Total Amount:</strong> ${orderArray.paymentIntent.amount.toFixed(2)}
                </Typography>
                <Typography className={classes.orderText}>
                  <ContactPhone className={classes.icon} /> <strong>Contact:</strong> {orderArray.contact}
                </Typography>
                <Typography className={classes.orderText}>
                  <Home className={classes.icon} /> <strong>Address:</strong> {orderArray.address}
                </Typography>
                <Typography className={classes.orderText}>
                  <EmailIcon className={classes.icon} /> <strong>Email:</strong> {orderArray.email}
                </Typography>
              </div>
              <Divider />
              <div className={classes.orderDetails}>
                <Typography variant="h3" className={classes.orderText}>
                  <ShoppingCart className={classes.icon} /> Products
                </Typography>
                <List>
                  {orderArray.products.map((product) => (
                    <ListItem key={product._id}>
                      <ListItemAvatar>
                        <Avatar src={product.productId.image} className={classes.productImage} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.productId.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="textPrimary">
                              Quantity: {product.quantity}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              Price: ${product.productId.price}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Paper>
          ))
        )}
      </Container>
    </div>
  );
};

export default Orders;
