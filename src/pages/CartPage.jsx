import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2, FiChevronRight, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const applyPromo = (e) => {
    e.preventDefault();
    setPromoError('');

    if (promoCode.toLowerCase() === 'diskon10') {
      setPromoApplied(true);
    } else {
      setPromoError('Invalid promo code. Try "diskon10"');
    }
  };

  const calculateTax = () => {
    return total * 0.11; // 11% tax
  };

  const calculateDiscount = () => {
    return promoApplied ? total * 0.1 : 0; // 10% discount if promo applied
  };

  const calculateFinalTotal = () => {
    return total + calculateTax() - calculateDiscount();
  };

  if (cart.length === 0) {
    return (
      <div className="container-custom min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <FiShoppingCart className="w-24 h-24 text-gray-300 mb-6 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
            Looks like you haven't added any products to your shopping cart yet.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/products" className="btn-primary px-8 py-3 text-lg flex items-center justify-center mx-auto gap-2">
              Start Shopping <FiArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-custom min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-navy dark:text-gray-200 mb-2">Shopping Cart</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Review your items and proceed to checkout</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Your Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <FiTrash2 className="mr-1" />
                    Clear Cart
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mr-4 mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-bold text-navy dark:text-gray-200">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.variantName} · {item.duration || '30 days'}
                        </p>
                        <p className="font-medium text-purple-dark mt-1 dark:text-gray-200">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center mt-4 sm:mt-0 self-end sm:self-auto">
                        <div className="flex items-center mr-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${item.quantity <= 1
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-pink-soft hover:text-white'
                              } transition-colors`}
                          >
                            <FiMinus className="w-4 h-4" />
                          </motion.button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-pink-soft hover:text-white transition-colors"
                          >
                            <FiPlus className="w-4 h-4" />
                          </motion.button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {cart.length > 0 && (
                <Link
                  to="/products"
                  className="flex items-center justify-center text-purple-dark dark:text-gray-200 hover:text-navy font-medium gap-2 p-6 bg-gray-50 dark:bg-gray-700"
                >
                  <FiChevronRight className="rotate-180" /> Continue Shopping
                </Link>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden sticky top-24"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Order Summary</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax (11%)</span>
                    <span className="font-medium">{formatPrice(calculateTax())}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount (10%)</span>
                      <span>-{formatPrice(calculateDiscount())}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between font-bold">
                      <span className="text-navy dark:text-gray-200">Total</span>
                      <span className="text-lg text-purple-dark dark:text-gray-200">{formatPrice(calculateFinalTotal())}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Including taxes and fees</p>
                  </div>

                  {/* Promo Code */}
                  <div className="pt-4">
                    <form onSubmit={applyPromo}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Promo Code
                      </label>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={promoApplied}
                          placeholder="Enter promo code"
                          className={`flex-grow px-4 py-2 border rounded-md focus:ring-pink-soft focus:border-pink-soft ${promoError ? 'border-red-300' : 'border-gray-300'
                            }`}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={promoApplied || !promoCode}
                          className={`px-4 py-2 rounded-md ${promoApplied
                              ? 'bg-green-500 dark:bg-green-600 text-white cursor-not-allowed'
                              : !promoCode
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                : 'bg-purple-dark hover:bg-navy dark:hover:bg-navy/80 text-white'
                            }`}
                        >
                          {promoApplied ? 'Applied' : 'Apply'}
                        </motion.button>
                      </div>
                      {promoError && (
                        <p className="mt-2 text-sm text-red-600">{promoError}</p>
                      )}
                      {promoApplied && (
                        <p className="mt-2 text-sm text-green-600">Promo code applied successfully!</p>
                      )}
                    </form>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-4"
                  >
                    <Link
                      to="/checkout"
                      className="block w-full bg-purple-dark hover:bg-navy text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
                    >
                      Proceed to Checkout
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage; 