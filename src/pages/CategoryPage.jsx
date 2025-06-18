import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { products, categories } from '../lib/utils';
import ProductCard from '../components/ProductCard';
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

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  
  useEffect(() => {
    const foundCategory = categories.find(c => c.slug === slug);
    setCategory(foundCategory || null);
    
    if (foundCategory) {
      let filtered = products.filter(p => p.category === foundCategory.slug);
      
      // Sort products
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => {
            const aPrice = Math.min(...a.variants.map(v => v.price));
            const bPrice = Math.min(...b.variants.map(v => v.price));
            return aPrice - bPrice;
          });
          break;
        case 'price-high':
          filtered.sort((a, b) => {
            const aPrice = Math.max(...a.variants.map(v => v.price));
            const bPrice = Math.max(...b.variants.map(v => v.price));
            return bPrice - aPrice;
          });
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default: // popularity - default order
          break;
      }
      
      setCategoryProducts(filtered);
    }
  }, [slug, sortBy]);
  
  if (!category) {
    return (
      <div className="container-custom py-24 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Kategori tidak ditemukan</h2>
        <p className="text-gray-600 mb-8">Kategori yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link to="/products" className="btn-primary">
          Lihat Semua Produk
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-pink-soft">Home</Link>
        <FiChevronRight className="mx-2" />
        <Link to="/products" className="hover:text-pink-soft">Produk</Link>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-700">{category.name}</span>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-pink-soft/20 flex items-center justify-center mr-4">
            <span className="text-purple-dark">
              {getCategoryIcon(category.icon)}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-navy">{category.name}</h1>
        </div>
        
        <p className="text-gray-600 max-w-3xl">
          {category.slug === 'streaming' && 
            'Nikmati akses ke berbagai platform streaming premium dengan harga terjangkau. Dapatkan akun untuk berbagai layanan streaming video, musik, dan hiburan lainnya.'}
          
          {category.slug === 'design' && 
            'Wujudkan kreativitas Anda dengan berbagai aplikasi desain premium. Dapatkan akses ke alat desain grafis, editing foto, dan pembuatan konten kreatif.'}
          
          {category.slug === 'ai' && 
            'Maksimalkan produktivitas Anda dengan berbagai tools AI premium. Akses alat-alat AI terbaru untuk pembuatan konten, analisis data, dan otomatisasi tugas.'}
        </p>
      </div>
      
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          {categoryProducts.length} Produk
        </h2>
        
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-soft focus:border-pink-soft"
          >
            <option value="popularity">Popularitas</option>
            <option value="price-low">Harga: Rendah ke Tinggi</option>
            <option value="price-high">Harga: Tinggi ke Rendah</option>
            <option value="name">Nama</option>
          </select>
        </div>
      </div>
      
      {categoryProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Tidak ada produk ditemukan</h2>
          <p className="text-gray-600 mb-6">
            Tidak ada produk dalam kategori ini saat ini. Silakan cek kembali nanti.
          </p>
          <Link to="/products" className="btn-primary">
            Lihat Semua Produk
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      {/* Other Categories */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-navy mb-8">Kategori Lainnya</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories
            .filter(c => c.slug !== category.slug)
            .map(otherCategory => (
              <Link
                key={otherCategory.id}
                to={`/category/${otherCategory.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group"
              >
                <div className="p-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-pink-soft/20 flex items-center justify-center mr-4 group-hover:bg-pink-soft/40 transition-colors">
                    <span className="text-purple-dark">
                      {getCategoryIcon(otherCategory.icon)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy">{otherCategory.name}</h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 