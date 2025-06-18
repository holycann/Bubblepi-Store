import { useEffect, useRef } from 'react';
import HeroCarousel from "../components/HeroCarousel";
import ExclusiveOffers from "../components/ExclusiveOffers";
import FeaturedProducts from "../components/FeaturedProducts";
import CategorySection from "../components/CategorySection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import { SparklesCore } from "../components/ui/sparkles";
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { BackgroundBeams, GridPattern } from '../components/ui/background-gradient';

const HomePage = () => {
  // Create ref for scroll animation
  const pageRef = useRef(null);
  
  // Initialize scroll animations once component mounts
  useEffect(() => {
    // Any initialization for scroll animations if needed
  }, []);
  
  return (
    <main ref={pageRef} className="relative overflow-hidden">
      {/* Global background effects */}
      <BackgroundBeams className="fixed inset-0 opacity-10 z-0" />
      <GridPattern className="fixed inset-0 opacity-5 z-0" />
      
      {/* Hero Section with Carousel */}
      <section className="w-full relative" id='home'>
        <HeroCarousel />
      </section>
      
      {/* Exclusive Offers Section */}
      <section className="py-16 relative z-10">
        <ExclusiveOffers />
      </section>
      
      {/* Category Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-soft to-purple-dark">
              Browse by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our premium accounts by category to find exactly what you're looking for
            </p>
          </div>
          <CategorySection />
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="relative z-10" id="products">
        <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Floating WhatsApp button */}
      <FloatingWhatsApp />
    </main>
  );
};

export default HomePage; 