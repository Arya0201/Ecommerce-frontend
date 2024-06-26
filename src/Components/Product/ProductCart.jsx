// ProductCard.js (Component)

import React from 'react';
import { Link } from 'react-router-dom';
import { Button ,makeStyles } from '@material-ui/core';
import { Info as InfoIcon } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  customButton: {
      backgroundColor: '#2D3748', // bg-gray-800
      color: '#FFFFFF',
      '&:hover': {
          backgroundColor: '#4A5568', // bg-gray-700
      },
  },
}));


const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
    <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover object-center" />
    </Link>
    <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-1">${product.price}</p>
        <p className="text-gray-600 mb-3">{product.color}</p>
        <Link to={`/products/${product._id}`} className="block mt-3 bg-gray-800  hover:text-yellow-300 text-white font-semibold py-2 px-4 rounded-sm text-sm text-center">          
               <InfoIcon />  
                View Details
        </Link>
    </div>
    </div>
  );
};

export default ProductCard;
