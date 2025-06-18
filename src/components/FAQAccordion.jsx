import { useState } from 'react';
import { faqs } from '../lib/utils';
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiHelpCircle, 
  FiMessageCircle, 
  FiInfo,
  FiAlertCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left group"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <span className="text-pink-soft group-hover:text-pink-soft/80 transition-colors">
            {isOpen ? <FiMessageCircle className="w-5 h-5" /> : <FiHelpCircle className="w-5 h-5" />}
          </span>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-pink-soft transition-colors">
            {question}
          </h3>
        </div>
        <span className="text-gray-400 ml-4 group-hover:text-pink-soft transition-colors">
          {isOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 text-gray-600 dark:text-gray-300 flex gap-3">
              <span className="text-gray-400 mt-1">
                <FiInfo className="w-4 h-4" />
              </span>
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FiAlertCircle className="w-5 h-5 text-pink-soft" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
      </div>
      
      {/* FAQ Items */}
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => toggleFAQ(index)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion; 