import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { testimonials } from "../data";
import { FiStar } from "react-icons/fi";
import { BackgroundBeams } from "./ui/background-gradient";

const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 px-8 overflow-hidden"
      id="testimonials"
    >
      <BackgroundBeams />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-soft to-purple-dark">
            Customer Testimonials
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear what our customers have to say about their experience with BubblePi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index, progress }) => {
  const y = useTransform(
    progress,
    [0, 0.3, 0.7, 1],
    [100 + index * 50, 0, 0, -100 - index * 50]
  );
  
  const opacity = useTransform(
    progress,
    [0, 0.2 + index * 0.1, 0.8 - index * 0.1, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    progress,
    [0, 0.2 + index * 0.05, 0.8 - index * 0.05, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative"
    >
      <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-pink-soft text-white text-xs px-2 py-1 rounded-md">
        {testimonial.product}
      </div>
      
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">
            {testimonial.name}
          </h3>
          <div className="flex items-center text-yellow-500">
            {[...Array(testimonial.rating)].map((_, i) => (
              <FiStar key={i} className="fill-current" />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
      
      <div className="absolute bottom-3 right-3 opacity-5 text-4xl font-serif">
        "
      </div>
    </motion.div>
  );
};

export default TestimonialsSection; 