/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Info as InfoIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const ProductCard = ({ product }) => {
  return (
    <motion.div 
      className="bg-gray-100 rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/products/${product._id}`}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48  object-center object-fill" 
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-1">${product.price}</p>
        <p className="text-gray-600 mb-3">{product.color}</p>
        <Link 
          to={`/products/${product._id}`} 
          className="block mt-3 bg-gray-800 hover:text-yellow-300 text-white font-semibold py-2 px-4 rounded-sm text-sm text-center"
        >
          <InfoIcon />  
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
