import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { faqs } from "../data";
import { BackgroundGradient, GridPattern } from "./ui/background-gradient";

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 overflow-hidden" id="faq">
      <GridPattern />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-soft to-purple-dark"
            >
              Ready to transform your experience?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4"
            >
              Join thousands of users who are enjoying premium apps at affordable prices
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <a
                href="#products"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-pink-soft to-purple-dark text-white font-medium hover:opacity-90 transition-all shadow-lg"
              >
                Start for free
              </a>
            </motion.div>
          </div>

          <BackgroundGradient className="px-6 py-8 rounded-xl overflow-hidden">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={expandedIndex === index}
                    onClick={() => toggleFaq(index)}
                  />
                </motion.div>
              ))}
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-none">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-800 dark:text-white focus:outline-none"
        onClick={onClick}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="py-4 px-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 mb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQSection; 