import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiChevronRight, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

const OrderOverviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if we have state from "Buy Now" button
    if (location.state?.fromBuyNow && location.state?.product) {
      setProduct(location.state.product);
      setLoading(false);
    } else {
      // If no direct product, check if we have items in cart
      if (cart.length > 0) {
        setLoading(false);
      } else {
        // If no items in cart, redirect to products
        navigate('/products');
      }
    }
  }, [location.state, cart, navigate]);
  
  const handleContinue = () => {
    navigate('/checkout');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-soft"></div>
      </div>
    );
  }
  
  // If coming from "Buy Now", only show that product
  const itemsToShow = product ? [product] : cart;
  
  const calculateSubtotal = () => {
    if (product) {
      return product.price * product.quantity;
    } else {
      return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.11; // 11% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
  return (
    <div className="container-custom py-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-pink-soft">Home</Link>
        <FiChevronRight className="mx-2" />
        <Link to="/cart" className="hover:text-pink-soft">Cart</Link>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-700">Order Overview</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-navy mb-2">Order Overview</h1>
        <p className="text-gray-600 mb-8">Review your order before proceeding to checkout</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">
                  Order Details
                </h2>
              </div>
              
              {itemsToShow.map((item) => (
                <div 
                  key={item.id}
                  className="p-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-full sm:w-1/4 mb-4 sm:mb-0">
                      <img 
                        src={item.image || '/assets/images/placeholder.jpg'} 
                        alt={item.name} 
                        className="w-full h-40 sm:h-32 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-grow sm:ml-6">
                      <h3 className="text-lg font-bold text-navy mb-2">{item.name}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Product Type</h4>
                          <p>{item.variantName || 'Standard'}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                          <p>{item.duration || '30 days'}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
                          <p>{item.quantity}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Price</h4>
                          <p className="font-medium text-purple-dark">
                            {formatPrice(item.price)} x {item.quantity} = {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-pink-soft/10 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-navy mb-2">What You'll Get:</h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center gap-2">
                            <FiCheck className="text-green-500" />
                            Account credentials delivered after payment
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheck className="text-green-500" />
                            Setup instructions and support
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheck className="text-green-500" />
                            {item.duration || '30 days'} of premium access
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (11%)</span>
                    <span className="font-medium">{formatPrice(calculateTax())}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between font-bold">
                      <span className="text-navy">Total</span>
                      <span className="text-lg text-purple-dark">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg text-blue-700 mt-4">
                    <div className="flex items-start gap-2">
                      <FiShoppingBag className="mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        This is a digital product. After payment, you will receive your account details via email or WhatsApp.
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    className="w-full mt-4 bg-purple-dark hover:bg-navy text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
                  >
                    Continue to Checkout
                  </motion.button>
                  
                  <Link
                    to="/cart"
                    className="block w-full text-center text-purple-dark hover:text-navy font-medium"
                  >
                    Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderOverviewPage; 