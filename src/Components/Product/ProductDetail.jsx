import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../Actions/Product';
import { addToCart } from '../../Actions/Cart'; 
import Loading from '../Loader/Loading'; 
import { Button, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import { ShoppingCart, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#1f2937',
    color: '#FFFFFF',
    '&:hover': {
      color:'#fde047',
      backgroundColor: '#1f2937',
    },
  },
  modalButton: {
    backgroundColor: '#03A9F4',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#29B6F6',
    },
  },
  select: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FF5722',
      },
      '&:hover fieldset': {
        borderColor: '#FF7043',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FF7043',
      },
    },
  },
}));

const ProductDetailPage = () => {
  const classes = useStyles();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product,products, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [ quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    dispatch(getProductById(productId,products));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(addToCart({
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        selectedQuentity: quantity,
      }, navigate('/cart')));
    } else {
      setShowLoginModal(true);
    }
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto mt-4">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="container mx-auto mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white p-6 rounded-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-w-full h-auto rounded-lg object-contain max-h-96 mr-2"
            />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.title}</h1>
            <h2 className="text-2xl font-semibold mb-4 text-gray-600">${product.price}</h2>
            <p className="mb-4 text-gray-700">{product.desc}</p>
            <p className="text-sm text-gray-700 mb-2">Category: {product.categories}</p>
            <p className="text-sm text-gray-700 mb-2">Brand: {product.brand}</p>
            <p className="text-sm text-gray-700 mb-2">Color: {product.color}</p>
            <p className="text-sm text-gray-700 mb-2">Size: {product.size}</p>
            
            <div className="mt-4 mb-2">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <Select
                id="quantity"
                value={quantity}
                onChange={handleChangeQuantity}
                variant="outlined"
                className={`${classes.select} w-20`}
              >
                {[...Array(product.quantity).keys()].map((num) => (
                  <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
                ))}
              </Select>
            </div>

            <Button
              onClick={handleAddToCart}
              variant="contained"
              className={`${classes.button} mt-6 bg-gray-800`}
              startIcon={<ShoppingCart />}
              fullWidth
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>

      <Dialog open={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to login to add items to your cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowLoginModal(false)}
            variant="contained"
            className={classes.modalButton}
            startIcon={<Close />}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default ProductDetailPage;
