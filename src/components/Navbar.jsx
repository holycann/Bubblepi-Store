import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiHome,
  FiBox,
  FiMessageCircle,
  FiHelpCircle,
  FiUser,
  FiSearch,
  FiGrid,
  FiMonitor,
  FiPenTool,
  FiCpu
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import SearchPopup from './ui/search-popup';

const categories = [
  {
    name: "Streaming",
    link: "/category/streaming",
    icon: FiMonitor,
    description: "Movies, TV shows, and music streaming services"
  },
  {
    name: "Design",
    link: "/category/design",
    icon: FiPenTool,
    description: "Graphics, photo, and video editing tools"
  },
  {
    name: "AI Tools",
    link: "/category/ai",
    icon: FiCpu,
    description: "AI-powered apps and content generation tools"
  }
];

const navigation = [
  { name: "Home", section: "home", icon: FiHome },
  { name: "Products", link: "/products", icon: FiBox },
  {
    name: "Categories",
    icon: FiGrid,
    hasDropdown: true,
    items: categories
  },
  { name: "Testimonials", section: "testimonials", icon: FiMessageCircle },
  { name: "FAQ", section: "faq", icon: FiHelpCircle }
];

const NavigationBar = () => {
  const { cart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isHomePage = location.pathname === '/';

  // Count items in cart
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll and section detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Only check sections on homepage
      if (isHomePage) {
        const sections = ['home', 'testimonials', 'faq'];
        let currentSection = '';

        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentSection = section;
            }
          }
        });

        setActiveSection(currentSection);
      }
    };

    // Close mobile menu on location change
    setIsMenuOpen(false);

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, location, isHomePage]);

  // Easing function for smooth animation
  const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const smoothScrollTo = (targetPosition, duration = 1000) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutQuad(progress);

      window.scrollTo(0, startPosition + distance * easeProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Smooth scroll to section if on homepage
  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false); // Close mobile menu

    if (isHomePage) {
      // If already on homepage, scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        smoothScrollTo(offsetPosition, 1000); // 1000ms = 1 second duration
      }
    } else {
      // If not on homepage, navigate to homepage with hash and scroll after load
      window.location.href = `/#${sectionId}`;
    }
  };

  // Handle initial scroll if hash exists
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          smoothScrollTo(offsetPosition, 1000);
        }, 100);
      }
    }
  }, [isHomePage]);

  // Handle clicking outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (item) => {
    // If we're on a specific route (like /products), only that route should be active
    if (item.link) {
      return location.pathname === item.link;
    }

    // Only check sections if we're on the homepage and not on any other route
    if (item.section && isHomePage) {
      return activeSection === item.section;
    }

    return false;
  };

  return (
    <>
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled
            ? 'py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md'
            : 'py-4 bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center"
            >
              <img
                src="/assets/images/logo.png"
                alt="BubblePi Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                BubblePi
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        className={`text-sm font-medium transition-colors hover:text-pink-soft flex items-center gap-2 ${dropdownOpen
                            ? 'text-pink-soft'
                            : 'text-gray-900 dark:text-white'
                          }`}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.name}
                        <FiChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-50"
                          >
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.link}
                                className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <div className="flex items-center gap-3">
                                  <subItem.icon className="w-5 h-5 text-pink-soft" />
                                  <div>
                                    <div className="font-medium text-start">{subItem.name}</div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : item.section ? (
                    <button
                      onClick={() => scrollToSection(item.section)}
                      className={`text-sm font-medium transition-colors hover:text-pink-soft flex items-center gap-2 ${isActive(item)
                          ? 'text-pink-soft'
                          : 'text-gray-900 dark:text-white'
                        }`}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.link}
                      className={`text-sm font-medium transition-colors hover:text-pink-soft flex items-center gap-2 ${isActive(item)
                          ? 'text-pink-soft'
                          : 'text-gray-900 dark:text-white'
                        }`}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* User and Cart Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <FiSearch className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <FiShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-soft text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 md:hidden p-1 text-gray-900 dark:text-white"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-2"
            >
              <nav className="container mx-auto px-4 py-4">
                <div className="space-y-4">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full flex items-center justify-between text-gray-900 dark:text-white"
                          >
                            <span className="flex items-center gap-2">
                              {item.icon && <item.icon className="w-4 h-4" />}
                              {item.name}
                            </span>
                            <FiChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {dropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-6 space-y-2"
                              >
                                {item.items.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.link}
                                    className="block text-gray-600 dark:text-gray-400 hover:text-pink-soft dark:hover:text-pink-soft"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : item.section ? (
                        <button
                          onClick={() => {
                            scrollToSection(item.section);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 text-gray-900 dark:text-white"
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          to={item.link}
                          className="w-full flex items-center gap-2 text-gray-900 dark:text-white"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default NavigationBar; 