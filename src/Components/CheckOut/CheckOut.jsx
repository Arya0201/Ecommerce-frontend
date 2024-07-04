import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../Actions/Order';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Email, Home, Phone, Payment, ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
    color: '#1f2937', 
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: '#1f2937',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#1f2937',
      color:'#fde047' 
    },
    marginTop: theme.spacing(2),
  },
  totalAmount: {
    fontSize: '2rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paymentMethod: {
    fontSize: '1.5rem',
    marginTop: theme.spacing(2),
  },
}));

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
  const classes = useStyles();

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
      dispatch(createOrder({ ...form, cartTotal: calculateTotalPrice() }, navigate));
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const totalAmount = calculateTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div className={classes.root}>
        <div className="text-center">
          <Typography variant="h1" className={classes.title} align="center" color="error">
            Your cart is empty
          </Typography>
          <Button
            onClick={() => navigate('/')}
            variant="contained"
            className={classes.button}
            startIcon={<ShoppingCart />}
          >
            Go to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h1" className={classes.title} align="center">
          Address And Payment
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper className={classes.paper}>
                <Typography variant="h2" className={classes.formTitle} align="center">
                  <Home /> Add Shipping Address
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Enter Your Email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={classes.input}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: <Email style={{ marginRight: 8 }} />,
                    }}
                  />
                  {errors.email && <Typography color="error">{errors.email}</Typography>}
                  <TextField
                    fullWidth
                    label="Enter Your Address"
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className={classes.input}
                    variant="outlined"
                    required
                    multiline
                    rows={4}
                  />
                  {errors.address && <Typography color="error">{errors.address}</Typography>}
                  <TextField
                    fullWidth
                    label="Enter Your Contact"
                    id="contact"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    className={classes.input}
                    variant="outlined"
                    required
                    type='tel'
                    InputProps={{
                      startAdornment: <Phone style={{ marginRight: 8 }} />,
                    }}
                  />
                  {errors.contact && <Typography color="error">{errors.contact}</Typography>}
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    fullWidth
                  >
                    Submit
                  </Button>
                </form>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper className={classes.paper}>
                <Typography variant="h2" className={classes.formTitle} align="center">
                  <Payment /> Total Amount:
                </Typography>
                <Typography variant="h3" className={classes.totalAmount}>
                  ${totalAmount.toFixed(2)}
                </Typography>
                <Typography variant="h2" className={classes.formTitle} align="center">
                  Payment Method:
                </Typography>
                <Typography variant="h4" className={classes.paymentMethod}>
                  Pay On Delivery
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CheckOut;
