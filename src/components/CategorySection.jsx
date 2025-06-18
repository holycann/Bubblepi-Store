import { Link } from 'react-router-dom';
import { categories, products } from '../lib/utils';
import ProductCard from './ProductCard';
import { PiTelevisionSimpleBold, PiPaintBrushBold, PiRobotBold } from 'react-icons/pi';

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'PiTelevisionSimpleBold':
      return <PiTelevisionSimpleBold className="w-8 h-8" />;
    case 'PiPaintBrushBold':
      return <PiPaintBrushBold className="w-8 h-8" />;
    case 'PiRobotBold':
      return <PiRobotBold className="w-8 h-8" />;
    default:
      return null;
  }
};

const CategorySection = () => {
  return (
    <section id="categories">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => {
            const categoryProducts = products.filter(p => p.category === category.slug);
            const count = categoryProducts.length;
            
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group"
              >
                <div className="p-6 flex items-center">
                  <div className="w-16 h-16 rounded-full bg-pink-soft/20 flex items-center justify-center mr-4 group-hover:bg-pink-soft/40 transition-colors">
                    <span className="text-purple-dark">
                      {getCategoryIcon(category.icon)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">{category.name}</h3>
                    <p className="text-gray-600">
                      {count} {count === 1 ? 'Produk' : 'Produk'}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Sample for each category */}
        {categories.map((category) => {
          const categoryProducts = products.filter(p => p.category === category.slug);
          
          if (categoryProducts.length === 0) return null;
          
          return (
            <div key={category.id} className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-navy dark:text-gray-400 flex items-center">
                  <span className="mr-2">{getCategoryIcon(category.icon)}</span>
                  {category.name}
                </h3>
                 
                <Link
                  to={`/category/${category.slug}`}
                  className=" inline-flex items-center gap-2 px-6 py-2 rounded-xl  text-white font-medium text-pink-soft hover:opacity-90 transition-colors flex items-center bg-gradient-to-r from-pink-soft to-purple-dark text-white font-medium hover:opacity-90 transition-all shadow-lg"
                >
                  Lihat Semua
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection; 