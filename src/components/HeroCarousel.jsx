import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { carouselItems } from '../data';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(current => (current === carouselItems.length - 1 ? 0 : current + 1));
  }, []);
  
  // Function to go to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide(current => (current === 0 ? carouselItems.length - 1 : current - 1));
  }, []);
  
  // Auto-advance slides
  useEffect(() => {
    let timer;
    if (autoplayEnabled) {
      timer = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [nextSlide, autoplayEnabled]);
  
  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left, go to next slide
      nextSlide();
    }
    
    if (touchEnd - touchStart > 100) {
      // Swipe right, go to previous slide
      prevSlide();
    }
    
    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // Pause autoplay when user interacts with carousel
  const pauseAutoplay = () => {
    setAutoplayEnabled(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };
  
  return (
    <div 
      className="relative overflow-hidden h-[80vh] md:h-[70vh] max-h-[800px] min-h-[400px] w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button 
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              pauseAutoplay();
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows - hidden on mobile, visible on hover for larger screens */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 opacity-0 md:hover:opacity-100 transition-opacity z-10">
        <button 
          onClick={() => {
            prevSlide();
            pauseAutoplay();
          }}
          className="bg-black/30 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => {
            nextSlide();
            pauseAutoplay();
          }}
          className="bg-black/30 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          <FiArrowRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        {carouselItems.map((item, index) => (
          index === currentSlide && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* Background image */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="container mx-auto px-4 md:px-6 text-center md:text-left">
                  <div className="max-w-xl md:ml-16 flex flex-col items-center md:items-start">
                    <motion.h2 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg"
                    >
                      {item.title}
                    </motion.h2>
                    
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-white/90 text-sm md:text-base mb-6 max-w-md drop-shadow-lg"
                    >
                      {item.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <Link 
                        to={item.primaryButtonLink}
                        className="px-6 py-3 bg-pink-soft text-white rounded-lg hover:bg-pink-soft/90 transition-colors font-medium"
                      >
                        {item.primaryButtonText}
                      </Link>
                      
                      {item.secondaryButtonText && (
                        <Link 
                          to={item.secondaryButtonLink}
                          className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium flex items-center justify-center"
                        >
                          {item.secondaryButtonText}
                          <FiChevronRight className="ml-1" />
                        </Link>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;