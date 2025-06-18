import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { testimonials } from '../lib/utils';
import TestimonialCard from '../components/TestimonialCard';

const TestimonialsPage = () => {
  return (
    <div className="container-custom py-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-pink-soft">Home</Link>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-700">Testimoni</span>
      </div>
      
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">Apa Kata Pelanggan Kami</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lihat pengalaman nyata dari pelanggan yang telah menggunakan layanan kami.
          Kami berkomitmen untuk memberikan pengalaman terbaik dan produk berkualitas bagi pelanggan.
        </p>
      </div>
      
      {/* Background decoration */}
      <div className="relative">
        <div className="hidden lg:block absolute -right-20 top-20 w-40 h-40 rounded-full bg-pink-soft/10 z-0"></div>
        <div className="hidden lg:block absolute -left-16 bottom-0 w-32 h-32 rounded-full bg-purple-dark/10 z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
          
          {/* Additional testimonials to make the page look fuller */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <img
                src="https://placehold.co/100/333456/F4ABC4?text=DN"
                alt="Diana Nugraha"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-medium text-gray-800">Diana Nugraha</h3>
                <p className="text-sm text-pink-soft">Spotify Family</p>
              </div>
            </div>
            
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            
            <p className="text-gray-600 italic">"Spotify Family-nya mantap banget, harga murah dan garansi full. Sudah berlangganan 6 bulan tanpa masalah. Admin juga fast response!"</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <img
                src="https://placehold.co/100/595B83/F4ABC4?text=FA"
                alt="Farhan Ahmad"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-medium text-gray-800">Farhan Ahmad</h3>
                <p className="text-sm text-pink-soft">Midjourney Basic</p>
              </div>
            </div>
            
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            
            <p className="text-gray-600 italic">"Baru coba Midjourney Basic dan hasilnya memuaskan. Pengiriman akun cepat lewat WhatsApp. Cuma kadang harus nunggu karena antrian."</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <img
                src="https://placehold.co/100/F4ABC4/333456?text=RS"
                alt="Rini Sulistiawati"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-medium text-gray-800">Rini Sulistiawati</h3>
                <p className="text-sm text-pink-soft">Adobe Creative Cloud Complete</p>
              </div>
            </div>
            
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            
            <p className="text-gray-600 italic">"Akun Adobe-nya sangat worth it! Jauh lebih murah dari harga asli dan bisa dipakai di semua aplikasi. Sudah setahun langganan di BubblePi dan selalu puas."</p>
          </div>
        </div>
      </div>
      
      {/* Submit your own testimonial */}
      <div className="mt-16 bg-white rounded-lg shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-navy mb-2 text-center">Bagikan Pengalaman Anda</h2>
        <p className="text-gray-600 text-center mb-8">
          Sudah menggunakan layanan kami? Kami sangat menghargai umpan balik Anda!
        </p>
        
        <form className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                Nama
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-soft focus:border-pink-soft"
                placeholder="Nama Anda"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="product">
                Produk
              </label>
              <input
                type="text"
                id="product"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-soft focus:border-pink-soft"
                placeholder="Produk yang Anda beli"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="rating">
              Rating
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className="text-gray-300 hover:text-yellow-400 text-2xl mr-1 focus:outline-none"
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
              Pesan
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-soft focus:border-pink-soft"
              placeholder="Bagikan pengalaman Anda dengan produk kami..."
            ></textarea>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="btn-primary px-8 py-3"
            >
              Kirim Testimoni
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialsPage; 