import { useState, useEffect, useRef } from 'react';
import { testimonials } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiUser, FiMessageSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  
  // Update visible count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle testimonial navigation
  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    pauseAutoplay();
  };
  
  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    pauseAutoplay();
  };
  
  const pauseAutoplay = () => {
    setAutoplay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };
  
  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setDirection('right');
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  // Get visible testimonials based on active index
  const getVisibleTestimonials = () => {
    const visibleItems = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  };
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <FiMessageSquare className="text-pink-soft w-5 h-5" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                What Our Customers Say
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Read real testimonials from our satisfied customers who use our premium accounts
            </p>
          </div>
          
          <div className="flex items-center justify-center md:justify-end gap-4">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        <div ref={containerRef} className="relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <AnimatePresence key={testimonial.id + activeIndex} mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: direction === 'right' ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 'right' ? -100 : 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full flex flex-col"
                >
                  <div className="flex items-start mb-4">
                    <div className="relative mr-4 flex-shrink-0">
                      {testimonial.avatar ? (
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-pink-soft"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-pink-soft/20 flex items-center justify-center">
                          <FiUser className="w-6 h-6 text-pink-soft" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating 
                                ? 'text-yellow-500 fill-yellow-500' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.date}
                    </span>
                    <span className="text-xs text-pink-soft">
                      {testimonial.source}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/testimonials" 
            className="inline-flex items-center text-pink-soft hover:text-pink-soft/80 transition-colors font-medium"
          >
            View all testimonials
            <FiChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 