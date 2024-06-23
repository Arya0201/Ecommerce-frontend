import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../Actions/Product';
import { addToCart } from '../../Actions/Cart'; 
import Loading from '../Loader/Loading'; 
const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      console.log(quantity)
      dispatch(addToCart({
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        selectedQuentity: quantity // Assuming quantity is defined in your component
      }, navigate('/cart')));
    } else {
      // Show login modal or pop-up message
      setShowLoginModal(true);
    }
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  if (loading) {
    return (
     <Loading/>
    );
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
    <div className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-w-full h-auto rounded-lg object-contain max-h-96"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <h2 className="text-2xl font-semibold mb-4">${product.price}</h2>
            <p className="mb-4">{product.desc}</p>
            <p className="text-sm text-gray-700 mb-2">Category: {product.categories}</p>
            <p className="text-sm text-gray-700 mb-2">Brand: {product.brand}</p>
            <p className="text-sm text-gray-700 mb-2">Color: {product.color}</p>
            <p className="text-sm text-gray-700 mb-2">Size: {product.size}</p>
            
            <div className="mt-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleChangeQuantity}
                className="block w-20 p-2 border border-gray-300 rounded-md"
              >
                {[...Array(product.quantity).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Login Required</p>
            <p className="text-sm mb-4">You need to login to add items to your cart.</p>
            <button
              onClick={() => setShowLoginModal(false)}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
