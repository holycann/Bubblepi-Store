import { useState, useEffect, useContext, Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaHeart, FaShare } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { CardHoverEffect } from '../components/ui/card-hover-effect';
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import LoadingSpinner from '../components/LoadingSpinner';
import { Dialog, Transition } from '@headlessui/react';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useContext(CartContext);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    name: '',
    email: '',
    comment: ''
  });

  // Mock data - in a real app, fetch from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct({
        id: productId,
        name: 'Netflix Premium Account',
        price: 29.99,
        discount: 15,
        rating: 4.8,
        reviews: 245,
        stock: 50,
        description: 'Get access to the full Netflix library with this premium account. Watch on up to 4 devices simultaneously in Ultra HD quality.',
        features: [
          'Access to all Netflix content',
          'Ultra HD streaming quality',
          'Watch on up to 4 devices simultaneously',
          'Create up to 5 profiles',
          'Download content for offline viewing',
          '30-day warranty'
        ],
        specifications: {
          'Account Type': 'Premium',
          'Duration': '30 days',
          'Region': 'Global',
          'Devices': 'Smart TV, Mobile, Tablet, PC',
          'Resolution': 'Ultra HD (4K)',
          'Simultaneous Streams': '4'
        },
        images: [
          '/assets/images/netflix1.jpg',
          '/assets/images/netflix2.jpg',
          '/assets/images/netflix3.jpg',
        ],
        relatedProducts: [
          { id: '2', name: 'Disney+ Premium', price: 19.99, image: '/assets/images/disney.jpg', rating: 4.6 },
          { id: '3', name: 'Amazon Prime', price: 14.99, image: '/assets/images/amazon.jpg', rating: 4.5 },
          { id: '4', name: 'HBO Max', price: 24.99, image: '/assets/images/hbo.jpg', rating: 4.7 }
        ]
      });
      setLoading(false);
    }, 800);
  }, [productId]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity
    });
  };

  const handleBuyNow = () => {
    // Add to cart first
    addToCart({
      ...product,
      quantity
    });
    
    // Navigate to order overview
    navigate('/checkout', { 
      state: { 
        product: { ...product, quantity },
        fromBuyNow: true
      } 
    });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const calculateDiscountedPrice = () => {
    if (!product) return 0;
    return (product.price - (product.price * (product.discount / 100))).toFixed(2);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Here you would submit the review to your backend
    console.log('Review submitted:', reviewData);
    // For demo purposes, just close the modal
    setReviewModalOpen(false);
    // Reset form
    setReviewData({
      rating: 5,
      name: '',
      email: '',
      comment: ''
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const features = [
    {
      title: "Instant Delivery",
      description: "Get your account details instantly after purchase",
      icon: "⚡",
    },
    {
      title: "24/7 Support",
      description: "Our customer service team is always ready to help",
      icon: "🛠️",
    },
    {
      title: "Secure Payment",
      description: "Your payment information is always protected",
      icon: "🔒",
    },
    {
      title: "Money-back Guarantee",
      description: "Not satisfied? Get your money back within 30 days",
      icon: "💰",
    },
  ];

  return (
    <div className="bg-white dark:bg-dark min-h-screen">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-purple-dark">Home</Link>
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          <Link to="/products" className="text-gray-500 dark:text-gray-400 hover:text-purple-dark">Products</Link>
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          <span className="text-purple-dark dark:text-pink-soft font-medium">{product.name}</span>
        </nav>

        {/* Product Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="relative">
            <div
              className="bg-gray-100 dark:bg-dark-card rounded-xl overflow-hidden aspect-square mb-4 relative"
            >
              <img 
                src={product.images[selectedImage] || 'https://placehold.co/600x600/EEE/31343C?text=Product+Image'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <HoverBorderGradient className="p-2 rounded-full">
                  <button className="text-pink-soft dark:text-pink-soft">
                    <FaHeart size={20} />
                  </button>
                </HoverBorderGradient>
              </div>
            </div>
            
            {/* Thumbnail images */}
            <div className="flex space-x-4 mt-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index 
                      ? 'border-purple-dark dark:border-pink-soft' 
                      : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image || 'https://placehold.co/200x200/EEE/31343C?text=Thumbnail'} 
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-dark dark:text-white mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="ml-2 text-gray-600 dark:text-gray-300">{product.rating} ({product.reviews} reviews)</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-purple-dark dark:text-pink-soft">${calculateDiscountedPrice()}</span>
                {product.discount > 0 && (
                  <>
                    <span className="ml-3 text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-3 bg-pink-soft dark:bg-purple-dark text-white px-2 py-1 rounded-md text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-600 dark:text-green-400 mt-2 text-start ">
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-start ">{product.description}</p>
            
            {/* Quantity */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-gray-700 dark:text-gray-300 mb-2 text-start ">Quantity</label>
              <div className="flex items-center">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-l-md"
                >
                  -
                </button>
                <input 
                  type="number" 
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center py-2 border-y border-gray-200 dark:border-gray-700 dark:bg-dark-elevated dark:text-white"
                />
                <button 
                  onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                  className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
              >
                <FaShoppingCart /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3"
              >
                Buy Now
              </button>
            </div>
            
            {/* Share */}
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <FaShare className="mr-2" />
              <span>Share:</span>
              <div className="flex ml-2 space-x-2">
                {['facebook', 'twitter', 'instagram', 'whatsapp'].map(platform => (
                  <a
                    key={platform}
                    href={`#${platform}`}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                  >
                    {platform[0].toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-dark-card p-6 rounded-xl text-center"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-blue-dark dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === tab
                      ? 'border-purple-dark text-purple-dark dark:border-pink-soft dark:text-pink-soft'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-dark dark:text-white text-start ">Product Description</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-start ">{product.description}</p>
                
                <h4 className="text-lg font-semibold mb-3 text-blue-dark dark:text-white text-start ">Features</h4>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2 text-start ">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-dark dark:text-white">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 py-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{key}</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-blue-dark dark:text-white">Customer Reviews</h3>
                  <button 
                    onClick={() => setReviewModalOpen(true)}
                    className="btn-secondary py-2 px-4"
                  >
                    Write a Review
                  </button>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 dark:text-gray-300">Based on {product.reviews} reviews</span>
                  </div>
                  
                  {/* Mock reviews */}
                  {[
                    { name: 'John D.', rating: 5, date: '2 weeks ago', comment: 'Great product! Works perfectly as described.' },
                    { name: 'Sarah M.', rating: 4, date: '1 month ago', comment: 'Good value for money. Fast delivery too.' },
                    { name: 'Michael R.', rating: 5, date: '2 months ago', comment: 'Excellent service and product quality. Will buy again!' }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 py-6 last:border-0">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium text-blue-dark dark:text-white">{review.name}</h4>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} size={14} />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-blue-dark dark:text-white">Related Products</h2>
          <CardHoverEffect items={product.relatedProducts.map(item => ({
            title: item.name,
            description: `$${item.price.toFixed(2)}`,
            link: `/product/${item.id}`,
            thumbnail: item.image || 'https://placehold.co/300x200/EEE/31343C?text=Product'
          }))} />
        </div>
      </div>

      {/* Review Modal */}
      <Transition appear show={reviewModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setReviewModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Write a Review
                  </Dialog.Title>
                  
                  <form onSubmit={handleReviewSubmit} className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Rating
                      </label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button 
                            type="button"
                            key={star}
                            onClick={() => setReviewData({...reviewData, rating: star})}
                            className="focus:outline-none"
                          >
                            <FaStar 
                              className={star <= reviewData.rating ? "text-yellow-400" : "text-gray-300"} 
                              size={24}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={reviewData.name}
                        onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-dark-elevated dark:text-white"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={reviewData.email}
                        onChange={(e) => setReviewData({...reviewData, email: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-dark-elevated dark:text-white"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Review
                      </label>
                      <textarea
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-dark-elevated dark:text-white"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setReviewModalOpen(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-pink-soft text-white rounded-md hover:bg-pink-soft/90"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProductDetailPage; 