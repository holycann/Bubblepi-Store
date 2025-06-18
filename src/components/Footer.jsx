import { Link } from 'react-router-dom';
import { 
  FiInstagram, 
  FiTwitter, 
  FiGithub, 
  FiLinkedin, 
  FiBox, 
  FiDollarSign, 
  FiLink, 
  FiRefreshCw,
  FiBook, 
  FiVideo, 
  FiFileText, 
  FiHelpCircle,
  FiInfo, 
  FiBriefcase, 
  FiMail, 
  FiUsers,
  FiLock,
} from 'react-icons/fi';


import { FaCookie, FaFileCode } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: "Features", href: "/features", icon: FiBox },
    { name: "Pricing", href: "/pricing", icon: FiDollarSign },
    { name: "Integrations", href: "/integrations", icon: FiLink },
    { name: "Changelog", href: "/changelog", icon: FiRefreshCw },
  ];

  const companyLinks = [
    { name: "About", href: "/about", icon: FiInfo },
    { name: "Careers", href: "/careers", icon: FiBriefcase },
    { name: "Contact", href: "/contact", icon: FiMail },
    { name: "Partners", href: "/partners", icon: FiUsers },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 my-16 pt-16 pb-12 border-t border-gray-200 dark:border-gray-800 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link to="/#home" className="flex items-center gap-2 mb-6">
              <img src="/assets/images/logo.png" alt="BubblePi Logo" className="h-8 w-8" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">BubblePi</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md text-start">
              BubblePi empowers teams to transform raw data into clear, compelling visuals — making insights easier to share, understand, and act on.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-soft transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-soft transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-soft transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-soft transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className='flex flex-col gap-4 items-start'>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-500 dark:text-gray-400 hover:text-pink-soft transition-colors flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className='flex flex-col gap-4 items-start'>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-500 dark:text-gray-400 hover:text-pink-soft transition-colors flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} BubblePi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link to="/privacy" className="text-gray-500 dark:text-gray-400 text-sm hover:text-pink-soft transition-colors flex items-center gap-2">
                <FiLock className="w-4 h-4" />
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 dark:text-gray-400 text-sm hover:text-pink-soft transition-colors flex items-center gap-2">
                <FaFileCode  className="w-4 h-4" />
                Terms of Service
              </Link>
              <button className="text-gray-500 dark:text-gray-400 text-sm hover:text-pink-soft transition-colors flex items-center gap-2">
                <FaCookie className="w-4 h-4" />
                Cookies Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 