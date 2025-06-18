import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useAnimations = () => {
  // Fade in animation
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Slide up animation
  const slideUpVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  // Staggered children animation
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Scale animation
  const scaleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };
  
  // Floating animation (for decorative elements)
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };
  
  // Bounce animation
  const bounceVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };
  
  // Hook for triggering animations when element is in view
  const useAnimateOnScroll = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    
    return { ref, isInView };
  };
  
  return {
    fadeInVariants,
    slideUpVariants,
    staggerContainerVariants,
    scaleVariants,
    floatingVariants,
    bounceVariants,
    useAnimateOnScroll
  };
}; 