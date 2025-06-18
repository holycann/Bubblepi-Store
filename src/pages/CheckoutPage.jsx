import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiCreditCard, FiCheck, FiChevronRight, FiPackage, FiUser } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

const paymentMethods = [
  { id: 'qris', name: 'QRIS', description: 'Pay with any QRIS-supported payment app' },
  { id: 'bank_transfer', name: 'Bank Transfer', description: 'Pay via bank transfer to our virtual account' },
];

const bankOptions = [
  { id: 'bca', name: 'BCA', accountNumber: '12345678' },
  { id: 'mandiri', name: 'Mandiri', accountNumber: '87654321' },
  { id: 'bni', name: 'BNI', accountNumber: '11223344' },
  { id: 'bri', name: 'BRI', accountNumber: '55667788' },
];

const deliveryMethods = [
  { id: 'email', name: 'Email', description: 'We will send your account to your email address' },
  { id: 'whatsapp', name: 'WhatsApp', description: 'We will send your account via WhatsApp' },
];

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  useEffect(() => {
    // If coming from Buy Now button
    if (location.state?.fromBuyNow) {
      setStep(1); // Start at shipping step
    }

    // If no items in cart and not from Buy Now, redirect to cart
    if (cart.length === 0 && !location.state?.fromBuyNow && step != 3) {
      navigate('/cart');
    }
  }, [cart.length, location.state, navigate]);

  const calculateTax = () => {
    return total * 0.11; // 11% tax
  };

  const calculateFinalTotal = () => {
    return total + calculateTax();
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();

    if (!deliveryMethod || !contactInfo) {
      alert('Please complete all shipping information');
      return;
    }

    setStep(2); // Move to payment step
  };

  const handlePaymentSelection = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'bank_transfer' && !selectedBank) {
      alert('Please select a bank');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setShowPaymentDetails(true);
    }, 1500);
  };

  const handleCompleteOrder = () => {
    // Simulate order confirmation
    clearCart();
    setStep(3);
  };

  return (
    <div className="container-custom py-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-pink-soft">Home</Link>
        <FiChevronRight className="mx-2" />
        <Link to="/cart" className="hover:text-pink-soft">Cart</Link>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-700">Checkout</span>
      </div>

      {/* Checkout Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center max-w-4xl w-full">
          <div className={`flex-1 flex flex-col items-center ${step >= 1 ? 'text-purple-dark' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-purple-dark text-white' : 'bg-gray-200 text-gray-400'
              }`}>
              <FiUser />
            </div>
            <span className="text-sm font-medium">Shipping</span>
          </div>

          <div className={`w-24 h-1 ${step >= 2 ? 'bg-purple-dark' : 'bg-gray-200'}`}></div>

          <div className={`flex-1 flex flex-col items-center ${step >= 2 ? 'text-purple-dark' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-purple-dark text-white' : 'bg-gray-200 text-gray-400'
              }`}>
              <FiCreditCard />
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>

          <div className={`w-24 h-1 ${step >= 3 ? 'bg-purple-dark' : 'bg-gray-200'}`}></div>

          <div className={`flex-1 flex flex-col items-center ${step >= 3 ? 'text-purple-dark' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-purple-dark text-white' : 'bg-gray-200 text-gray-400'
              }`}>
              <FiCheck />
            </div>
            <span className="text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      {/* Step 1: Shipping Method */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
              <h2 className="text-2xl font-bold text-navy dark:text-gray-200 mb-6">Shipping Method</h2>

              <form onSubmit={handleShippingSubmit}>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Select Account Delivery Method
                    </label>

                    <div className="space-y-3">
                      {deliveryMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${deliveryMethod === method.id
                              ? 'border-pink-soft bg-pink-soft/10'
                              : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <div className="flex items-start">
                            <input
                              type="radio"
                              name="deliveryMethod"
                              value={method.id}
                              checked={deliveryMethod === method.id}
                              onChange={(e) => setDeliveryMethod(e.target.value)}
                              className="mt-1 h-4 w-4 text-pink-soft focus:ring-pink-soft"
                            />
                            <div className="ml-3">
                              <span className="block font-medium text-gray-800 text-start dark:text-gray-200">{method.name}</span>
                              <span className="block text-sm text-gray-500 dark:text-gray-400">{method.description}</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {deliveryMethod === 'email' ? 'Email Address' :
                        deliveryMethod === 'whatsapp' ? 'WhatsApp Number' :
                          'Contact Information'}
                    </label>

                    <input
                      type={deliveryMethod === 'email' ? 'email' : 'number'}
                      placeholder={
                        deliveryMethod === 'email' ? 'your@email.com' :
                          deliveryMethod === 'whatsapp' ? '6281234567890' :
                            'Select delivery method first'
                      }
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      disabled={!deliveryMethod}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-soft focus:border-pink-soft"
                    />

                    {deliveryMethod === 'whatsapp' && (
                      <p className="mt-2 text-sm text-gray-500">
                        Format: 628XXXXXXXXXX (without + or spaces)
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={!deliveryMethod || !contactInfo}
                    className={`w-full py-3 rounded-lg flex items-center justify-center text-white font-medium ${!deliveryMethod || !contactInfo
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-dark hover:bg-navy transition-colors'
                      }`}
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Order Summary</h2>
              </div>

              <div className="p-6">
                <div className="max-h-60 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start py-2">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mr-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-sm font-medium text-gray-800 text-start dark:text-gray-200">{item.name}</h3>
                        <p className="text-xs text-gray-500 text-start dark:text-gray-400">
                          {item.variantName} · Qty: {item.quantity}
                        </p>
                      </div>

                      <div className="flex-shrink-0 ml-2">
                        <span className="text-sm font-medium text-gray-800">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax (11%)</span>
                    <span>{formatPrice(calculateTax())}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-200 mt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-navy dark:text-gray-200">Total</span>
                      <span className="text-lg text-purple-dark">{formatPrice(calculateFinalTotal())}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
              <h2 className="text-2xl font-bold text-navy dark:text-gray-200 mb-6">Payment Method</h2>

              {!showPaymentDetails ? (
                <form onSubmit={handlePaymentSelection}>
                  <div className="space-y-4 mb-8">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === method.id
                            ? 'border-pink-soft bg-pink-soft/10'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                            className="mt-1 h-4 w-4 text-pink-soft focus:ring-pink-soft"
                          />
                          <div className="ml-3">
                            <span className="block font-medium text-gray-800 text-start dark:text-gray-200">{method.name}</span>
                            <span className="block text-sm text-gray-500">{method.description}</span>
                          </div>
                        </div>
                      </label>
                    ))}

                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-4 ml-7">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                          Select Bank
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-soft focus:border-pink-soft"
                        >
                          <option value="">Select a bank</option>
                          {bankOptions.map(bank => (
                            <option key={bank.id} value={bank.id}>{bank.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={loading || !paymentMethod || (paymentMethod === 'bank_transfer' && !selectedBank)}
                      className={`w-full py-3 rounded-lg flex items-center justify-center text-white font-medium ${loading || !paymentMethod || (paymentMethod === 'bank_transfer' && !selectedBank)
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-purple-dark hover:bg-navy transition-colors'
                        }`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Continue to Payment Details'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                    <div className="flex items-center">
                      <FiCheck className="flex-shrink-0 h-5 w-5 mr-2" />
                      <p>Payment method selected! Complete your payment using the details below.</p>
                    </div>
                  </div>

                  {paymentMethod === 'qris' ? (
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-4">QRIS Payment</h3>
                      <div className="mb-4 mx-auto w-48 h-48 bg-white dark:bg-gray-700 p-2 rounded-md  ">
                        <img
                          src="/assets/images/qris-code.png"
                          alt="QRIS Code"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-md mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                          <span className="font-medium">ORD-{Math.floor(Math.random() * 1000000)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                          <span className="font-medium">{formatPrice(calculateFinalTotal())}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Expires in:</span>
                          <span className="font-medium">24 hours</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Scan the QR code using your preferred payment app. Once payment is complete, we will process your order automatically.
                      </p>
                      <button
                        onClick={handleCompleteOrder}
                        className="w-full py-3 rounded-lg bg-purple-dark hover:bg-navy text-white font-medium"
                      >
                        I've Completed Payment
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Transfer Details</h3>
                      <div className="bg-white p-4 rounded-md mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Bank:</span>
                          <span className="font-medium">
                            {bankOptions.find(b => b.id === selectedBank)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Account Number:</span>
                          <span className="font-medium">
                            {bankOptions.find(b => b.id === selectedBank)?.accountNumber}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Account Name:</span>
                          <span className="font-medium">PT BubblePi</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium">{formatPrice(calculateFinalTotal())}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reference:</span>
                          <span className="font-medium">BP-{Math.floor(Math.random() * 1000000)}</span>
                        </div>
                      </div>
                      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 text-sm text-yellow-700 mb-6">
                        <p>
                          Please make sure to include the reference number in your payment details.
                          After completing the transfer, click the button below.
                        </p>
                      </div>
                      <button
                        onClick={handleCompleteOrder}
                        className="w-full py-3 rounded-lg bg-purple-dark hover:bg-navy text-white font-medium"
                      >
                        I've Completed Payment
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Order Summary</h2>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Shipping Information</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <p className="text-sm">
                      <span className="font-medium">Method:</span> {deliveryMethod === 'email' ? 'Email' : 'WhatsApp'}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Contact:</span> {contactInfo}
                    </p>
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start py-2">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-md overflow-hidden mr-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-sm font-medium text-gray-800 text-start dark:text-gray-200">{item.name}</h3>
                        <p className="text-xs text-gray-500 text-start dark:text-gray-400">
                          {item.variantName} · Qty: {item.quantity}
                        </p>
                      </div>

                      <div className="flex-shrink-0 ml-2">
                        <span className="text-sm font-medium text-gray-800 text-start dark:text-gray-200">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax (11%)</span>
                    <span>{formatPrice(calculateTax())}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-200 mt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-navy dark:text-gray-200">Total</span>
                      <span className="text-lg text-purple-dark">{formatPrice(calculateFinalTotal())}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 text-center dark:bg-gray-700">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4  dark:text-white">Order Confirmed!</h2>

            <p className="text-gray-600 mb-8 dark:text-gray-300">
              Thank you for your order. Your account will be sent to your {deliveryMethod === 'email' ? 'email' : 'WhatsApp'} shortly.
              Please check your {deliveryMethod === 'email' ? 'inbox' : 'messages'} regularly.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg text-blue-700 mb-8 text-left">
              <h3 className="font-bold mb-2">Important Information:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Account delivery takes 5-30 minutes after payment confirmation.</li>
                <li>Admin hours: 09.00 - 21.00 WIB.</li>
                <li>For questions, contact admin via WhatsApp.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="btn-primary"
              >
                Back to Home
              </Link>

              <Link
                to="/products"
                className="btn-secondary"
              >
                Browse More Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage; 