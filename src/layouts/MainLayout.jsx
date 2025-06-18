import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import { useEffect } from 'react';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const MainLayout = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-gray-900 dark:text-gray-200 transition-colors duration-300">
      <NavigationBar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default MainLayout; 