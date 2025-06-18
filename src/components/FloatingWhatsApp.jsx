import { useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number
  const message = 'Hello! I want to know more about your products.'; // Pre-filled message

  const handleOpenChat = () => {
    setIsOpen(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          delay: 0.5 
        }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button
          onClick={handleOpenChat}
          className="relative bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Contact via WhatsApp"
        >
          <IoLogoWhatsapp className="w-7 h-7" />
          
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
        </button>
      </motion.div>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-8 w-80 bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-white p-1 rounded-full">
                  <IoLogoWhatsapp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold">WhatsApp Chat</h3>
                  <p className="text-xs opacity-80">Online | Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                className="text-white hover:bg-green-600 rounded-full p-1 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            {/* Message */}
            <div className="p-4 bg-gray-50 h-48 overflow-y-auto">
              <div className="bg-green-100 p-3 rounded-lg rounded-bl-none max-w-xs ml-auto mb-2">
                <p className="text-sm">Hello! How can I help you?</p>
                <span className="text-xs text-gray-500 block text-right mt-1">12:00</span>
              </div>
              
              <div className="bg-white border p-3 rounded-lg rounded-br-none max-w-xs mr-auto">
                <p className="text-sm">I'm interested in knowing more about your products.</p>
                <span className="text-xs text-gray-500 block mt-1">12:01</span>
              </div>
              
              <div className="bg-green-100 p-3 rounded-lg rounded-bl-none max-w-xs ml-auto mt-2">
                <p className="text-sm">Sure! Click the button below to continue on WhatsApp.</p>
                <span className="text-xs text-gray-500 block text-right mt-1">12:01</span>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 bg-white border-t">
              <button
                onClick={handleSendMessage}
                className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <IoLogoWhatsapp className="w-5 h-5" />
                Continue on WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWhatsApp; 