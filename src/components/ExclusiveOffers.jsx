import { Link } from 'react-router-dom';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { FiTag, FiGift, FiTrendingUp } from 'react-icons/fi';

const offerItems = [
  {
    id: 1,
    title: "Netflix Private",
    description: "1 month subscription with full access",
    link: "/product/1",
    thumbnail: "https://placehold.co/600x400/F4ABC4/333456?text=Netflix+Private",
    icon: <FiTag className="w-5 h-5" />,
    discount: "30% OFF"
  },
  {
    id: 2,
    title: "Canva Pro",
    description: "Unlimited design resources for your projects",
    link: "/product/2",
    thumbnail: "https://placehold.co/600x400/595B83/F4ABC4?text=Canva+Pro",
    icon: <FiGift className="w-5 h-5" />,
    discount: "NEW USER"
  },
  {
    id: 3,
    title: "ChatGPT Plus",
    description: "Advanced AI assistance for all your needs",
    link: "/product/3",
    thumbnail: "https://placehold.co/600x400/333456/F4ABC4?text=ChatGPT",
    icon: <FiTrendingUp className="w-5 h-5" />,
    discount: "HOT DEAL"
  }
];

const ExclusiveOffers = () => {
  return (
    <section className="py-16 px-8 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-soft to-purple-dark">
            Exclusive Offers
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Take advantage of our limited-time special deals on premium accounts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerItems.map((item) => (
            <Link to={item.link} key={item.id}>
              <HoverBorderGradient className="h-full transition-all duration-300 hover:-translate-y-2">
                <div className="relative p-6 h-full">
                  {/* Discount badge */}
                  <div className="absolute top-4 right-4 bg-pink-soft text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                    {item.icon}
                    {item.discount}
                  </div>
                  
                  <div className="h-48 mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-blue-dark dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-50 dark:bg-blue-900 text-blue-dark dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      Limited Time
                    </span>
                    <span className="text-pink-soft font-semibold">
                      View Deal →
                    </span>
                  </div>
                </div>
              </HoverBorderGradient>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-3 font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md"
          >
            View All Offers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffers; 