import { useState } from 'react';
import { FiHome, FiShoppingBag, FiDatabase, FiShoppingCart, FiCreditCard, FiBarChart2, FiSettings, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { formatPrice } from '../lib/utils';
import { products } from '../data';
import { FiUsers, FiPackage, FiDollarSign, FiShoppingCart, FiActivity, FiPieChart, FiChevronDown, FiChevronUp, FiRefreshCw } from 'react-icons/fi';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsTab />;
      case 'inventory':
        return <InventoryTab />;
      case 'orders':
        return <OrdersTab />;
      case 'payments':
        return <PaymentsTab />;
      case 'reports':
        return <ReportsTab />;
      default:
        return <DashboardTab />;
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-navy">BubblePi Admin</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-navy text-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-xl font-bold text-pink-soft">BubblePi Admin</h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center p-3 rounded-lg text-sm transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-pink-soft text-blue-dark font-medium'
                    : 'text-gray-300 hover:bg-navy-light'
                }`}
              >
                <FiHome className="w-5 h-5 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center p-3 rounded-lg text-sm transition-colors ${
                  activeTab === 'products'
                    ? 'bg-pink-soft text-blue-dark font-medium'
                    : 'text-gray-300 hover:bg-navy-light'
                }`}
              >
                <FiShoppingBag className="w-5 h-5 mr-3" />
                Produk
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`w-full flex items-center p-3 rounded-lg text-sm transition-colors ${
                  activeTab === 'inventory'
                    ? 'bg-pink-soft text-blue-dark font-medium'
                    : 'text-gray-300 hover:bg-navy-light'
                }`}
              >
                <FiDatabase className="w-5 h-5 mr-3" />
                Stok
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center p-3 rounded-lg text-sm transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-pink-soft text-blue-dark font-medium'
                    : 'text-gray-300 hover:bg-navy-light'
                }`}
              >
                <FiShoppingCart className="w-5 h-5 mr-3" />
                Pesanan
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center p-3 rounded-lg text-sm transition-colors ${
                  activeTab === 'payments'
                    ? 'bg-pink-soft text-blue-dark font-medium'
                    : 'text-gray-300 hover:bg-navy-light'
                }`}
              >
                <FiCreditCard className="w-5 h-5 mr-3" />
                Pembayaran
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center p-3 rounded-lg text-sm transition-colors ${
                  activeTab === 'reports'
                    ? 'bg-pink-soft text-blue-dark font-medium'
                    : 'text-gray-300 hover:bg-navy-light'
                }`}
              >
                <FiBarChart2 className="w-5 h-5 mr-3" />
                Laporan
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center p-3 rounded-lg text-sm transition-colors text-gray-300 hover:bg-navy-light"
              >
                <FiSettings className="w-5 h-5 mr-3" />
                Pengaturan
              </button>
            </li>
          </ul>
          
          <div className="pt-8 mt-8 border-t border-blue-800">
            <div className="flex items-center px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-pink-soft/40 flex items-center justify-center mr-3">
                <FiUser className="w-4 h-4 text-pink-soft" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-400">admin@bubblepi.com</p>
              </div>
            </div>
            
            <button className="w-full flex items-center p-3 rounded-lg text-sm text-gray-300 hover:bg-navy-light mt-4 transition-colors">
              <FiLogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        {renderContent()}
      </main>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

// Dashboard Tab
const DashboardTab = () => {
  const stats = [
    { name: 'Total Produk', value: '18', icon: <FiShoppingBag className="w-6 h-6 text-purple-dark" /> },
    { name: 'Pesanan Hari Ini', value: '12', icon: <FiShoppingCart className="w-6 h-6 text-purple-dark" /> },
    { name: 'Pendapatan Bulan Ini', value: 'Rp 5.800.000', icon: <FiCreditCard className="w-6 h-6 text-purple-dark" /> },
    { name: 'Stok Menipis', value: '3', icon: <FiDatabase className="w-6 h-6 text-purple-dark" /> },
  ];
  
  const recentOrders = [
    { id: '#ORD-123456', customer: 'Budi Santoso', date: '17 Jun 2023, 14:32', status: 'Selesai', total: 'Rp 125.000' },
    { id: '#ORD-123455', customer: 'Andi Pratama', date: '17 Jun 2023, 13:15', status: 'Menunggu Pembayaran', total: 'Rp 75.000' },
    { id: '#ORD-123454', customer: 'Citra Dewi', date: '17 Jun 2023, 11:45', status: 'Diproses', total: 'Rp 50.000' },
    { id: '#ORD-123453', customer: 'Diana Nugraha', date: '16 Jun 2023, 19:22', status: 'Selesai', total: 'Rp 90.000' },
    { id: '#ORD-123452', customer: 'Eko Wibowo', date: '16 Jun 2023, 15:10', status: 'Selesai', total: 'Rp 60.000' },
  ];
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-gray-500">Selamat datang, Admin!</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-soft/20 rounded-full flex items-center justify-center mr-4">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-xl font-bold text-navy">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts - Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-navy mb-4">Pendapatan</h2>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-gray-500">Grafik Pendapatan (Placeholder)</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-navy mb-4">Penjualan Berdasarkan Kategori</h2>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-gray-500">Grafik Kategori (Placeholder)</p>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-navy">Pesanan Terbaru</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Selesai'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Diproses'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-pink-soft hover:text-purple-dark">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Products Tab
const ProductsTab = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy">Kelola Produk</h1>
        <button className="btn-primary">Tambah Produk</button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-navy">Daftar Produk</h2>
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Cari produk..." 
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-soft focus:border-pink-soft"
            />
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-soft focus:border-pink-soft">
              <option value="">Semua Kategori</option>
              <option value="streaming">Streaming</option>
              <option value="design">Design</option>
              <option value="ai">AI</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Varian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Terendah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy">#{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.variants.length} varian
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatPrice(Math.min(...product.variants.map(v => v.price)))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Menampilkan 1-{products.length} dari {products.length} produk
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
            <button className="px-3 py-1 bg-pink-soft text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Other tab components would be implemented similarly with mock data
const InventoryTab = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-navy mb-6">Kelola Stok</h1>
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-96">
      <p className="text-gray-500">Mockup Halaman Stok</p>
    </div>
  </div>
);

const OrdersTab = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-navy mb-6">Pesanan</h1>
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-96">
      <p className="text-gray-500">Mockup Halaman Pesanan</p>
    </div>
  </div>
);

const PaymentsTab = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-navy mb-6">Pembayaran</h1>
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-96">
      <p className="text-gray-500">Mockup Halaman Pembayaran</p>
    </div>
  </div>
);

const ReportsTab = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-navy mb-6">Laporan</h1>
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-96">
      <p className="text-gray-500">Mockup Halaman Laporan</p>
    </div>
  </div>
);

export default AdminDashboardPage; 