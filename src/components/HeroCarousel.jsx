import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { cn } from '../lib/utils';
import { GradientButton } from './ui/gradient-button';
import { carouselItems } from '../data';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const items = carouselItems;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + items.length) % items.length);
  }, [items.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  // Auto advance slides
  useEffect(() => {
    const interval = setInterval(() => paginate(1), 6000);
    return () => clearInterval(interval);
  }, [paginate]);

  const arrowButtonClass = "group bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-soft focus:ring-offset-2 focus:ring-offset-transparent";
  const arrowIconClass = "w-6 h-6 transition-transform duration-300 group-hover:scale-110";

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-lg">
      {/* Carousel controls */}
      <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newDirection = index - current;
              paginate(newDirection);
            }}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300 mx-1",
              current === index ? "w-8 bg-pink-soft" : "w-2.5 bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="absolute z-10 inset-0 flex items-center justify-between px-6">
        <button
          onClick={() => paginate(-1)}
          className={arrowButtonClass}
          aria-label="Previous slide"
        >
          <FiArrowLeft className={arrowIconClass} />
        </button>
        <button
          onClick={() => paginate(1)}
          className={arrowButtonClass}
          aria-label="Next slide"
        >
          <FiArrowRight className={arrowIconClass} />
        </button>
      </div>
      
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10" />
          <img
            src={items[current].image}
            alt="Hero carousel"
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute bottom-8 right-8 z-20">
            <GradientButton
              to={items[current].buttonLink}
              containerClassName="bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              {items[current].buttonText}
            </GradientButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;