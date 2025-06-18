import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Lenis from 'lenis';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreen from './components/ui/splash-screen';
import './App.css';

// Lazy load pages for better performance
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const OrderOverviewPage = lazy(() => import('./pages/OrderOverviewPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <LoadingSpinner size="md" color="primary" />
  </div>
);

// ScrollToTop component that works with Lenis smooth scroll
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // Get the Lenis instance
    const lenis = window.lenis;
    
    // Handle URL hash for smooth scrolling to anchors
    if (hash && lenis) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          lenis.scrollTo(element, { 
            offset: -100, // Offset to account for fixed header
            duration: 1.2
          });
        }, 100);
      }
    } else {
      // Scroll to top of page when navigating to a new page
      window.scrollTo(0, 0);
      if (lenis) lenis.scrollTo(0);
    }
  }, [pathname, hash]);
  
  return null;
};

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    
    // Store lenis instance globally so we can access it elsewhere
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <SplashScreen />
            <ScrollToTop />
            <ScrollHandler />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="product/:productId" element={<ProductDetailPage />} />
                  <Route path="category/:categoryName" element={<CategoryPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="checkout/overview" element={<OrderOverviewPage />} />
                  <Route path="testimonials" element={<TestimonialsPage />} />
                  <Route path="faq" element={<FAQPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="/admin" element={<AdminDashboardPage />} />
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
