import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiShoppingBag, 
  FiUsers, 
  FiDollarSign, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiMoon, 
  FiSun 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const sidebarItems = [
  { icon: FiHome, name: 'Dashboard', path: '/admin' },
  { icon: FiShoppingBag, name: 'Products', path: '/admin/products' },
  { icon: FiUsers, name: 'Customers', path: '/admin/customers' },
  { icon: FiDollarSign, name: 'Orders', path: '/admin/orders' },
  { icon: FiSettings, name: 'Settings', path: '/admin/settings' },
];

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isDesktop]);

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0.5 },
  };

  const overlayVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 },
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && !isDesktop && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-20 bg-black"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || isDesktop) && (
          <motion.aside
            initial={isDesktop ? "open" : "closed"}
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed lg:relative z-30 w-64 h-full bg-white dark:bg-gray-800 shadow-lg`}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <Link to="/admin" className="flex items-center space-x-2">
                  <img src="/assets/images/logo.png" alt="BubblePi Admin" className="h-8 w-8" />
                  <span className="text-xl font-bold">BubblePi</span>
                </Link>
                {!isDesktop && (
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                  {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-pink-soft/10 text-pink-soft"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          <span>{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="sidebar-active-indicator"
                              className="absolute left-0 w-1 h-8 bg-pink-soft rounded-r-md"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                  </button>
                </div>
                <Link
                  to="/logout"
                  className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <FiLogOut className="w-5 h-5 mr-3" />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            {!isDesktop && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiMenu className="w-6 h-6" />
              </button>
            )}
            <div className="flex items-center">
              <span className="text-xl font-semibold">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <img
                  src="https://placehold.co/100/F4ABC4/333456?text=A"
                  alt="Admin"
                  className="w-10 h-10 rounded-full border-2 border-pink-soft"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 