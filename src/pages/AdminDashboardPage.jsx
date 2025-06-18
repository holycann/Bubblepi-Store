import { useState } from 'react';
import { 
  FiDollarSign, 
  FiShoppingCart, 
  FiUsers, 
  FiPackage, 
  FiBarChart2,
  FiChevronDown, 
  FiChevronUp, 
  FiRefreshCw
} from 'react-icons/fi';
import { formatPrice } from '../lib/utils';
import { products } from '../data';
import AdminLayout from '../layouts/AdminLayout';
import { motion } from 'framer-motion';

const AdminDashboardPage = () => {
  const [salesTimeRange, setSalesTimeRange] = useState('week');
  
  // Demo data for the dashboard
  const stats = {
    revenue: 15750000,
    orders: 87,
    customers: 52,
    products: products.length
  };
  
  const recentOrders = [
    { id: '#ORD-3981', customer: 'Andi P.', date: '2023-08-28', total: 175000, status: 'Completed' },
    { id: '#ORD-3980', customer: 'Budi S.', date: '2023-08-27', total: 120000, status: 'Processing' },
    { id: '#ORD-3979', customer: 'Citra D.', date: '2023-08-27', total: 65000, status: 'Completed' },
    { id: '#ORD-3978', customer: 'Deni R.', date: '2023-08-26', total: 50000, status: 'Completed' },
    { id: '#ORD-3977', customer: 'Eka W.', date: '2023-08-25', total: 110000, status: 'Processing' }
  ];
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Revenue" 
            value={formatPrice(stats.revenue)} 
            icon={FiDollarSign} 
            change={7.2} 
            changeDirection="up"
            bgColor="bg-green-50 dark:bg-green-900/20"
            iconColor="text-green-500"
          />
          
          <StatsCard 
            title="Orders" 
            value={stats.orders} 
            icon={FiShoppingCart} 
            change={2.1} 
            changeDirection="up"
            bgColor="bg-blue-50 dark:bg-blue-900/20" 
            iconColor="text-blue-500"
          />
          
          <StatsCard 
            title="Customers" 
            value={stats.customers} 
            icon={FiUsers} 
            change={3.5} 
            changeDirection="up"
            bgColor="bg-purple-50 dark:bg-purple-900/20" 
            iconColor="text-purple-500"
          />
          
          <StatsCard 
            title="Products" 
            value={stats.products} 
            icon={FiPackage} 
            change={0} 
            changeDirection="neutral"
            bgColor="bg-amber-50 dark:bg-amber-900/20" 
            iconColor="text-amber-500"
          />
        </div>
        
        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Sales Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow col-span-1 xl:col-span-2">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Sales Overview</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSalesTimeRange('week')}
                  className={`px-3 py-1.5 text-xs rounded-md ${
                    salesTimeRange === 'week' 
                      ? 'bg-pink-soft text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Week
                </button>
                
                <button 
                  onClick={() => setSalesTimeRange('month')}
                  className={`px-3 py-1.5 text-xs rounded-md ${
                    salesTimeRange === 'month' 
                      ? 'bg-pink-soft text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Month
                </button>
                
                <button 
                  onClick={() => setSalesTimeRange('year')}
                  className={`px-3 py-1.5 text-xs rounded-md ${
                    salesTimeRange === 'year' 
                      ? 'bg-pink-soft text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Year
                </button>
              </div>
            </div>
            
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="flex flex-col items-center text-gray-400">
                <FiBarChart2 className="w-16 h-16 mb-4" />
                <p>Sales chart visualization would appear here</p>
                <p className="text-sm">Data shown based on {salesTimeRange} view</p>
              </div>
            </div>
          </div>
          
          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Top Products</h3>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {products.slice(0, 4).map((product, index) => (
                  <div key={product.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {product.variants.length} variants
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-pink-soft">
                        {formatPrice(product.variants[0].price)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {10 - index} sales
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Recent Orders</h3>
            <button className="text-pink-soft hover:text-pink-soft/80 flex items-center text-sm">
              <FiRefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/30">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-soft">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-md ${
                        order.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Stats card component
const StatsCard = ({ title, value, icon: Icon, change, changeDirection, bgColor, iconColor }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${bgColor} mr-4`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h4>
        </div>
      </div>
      
      {changeDirection !== 'neutral' && (
        <div className="mt-2 flex items-center text-xs">
          <span className={`flex items-center ${
            changeDirection === 'up' 
              ? 'text-green-500' 
              : 'text-red-500'
          }`}>
            {changeDirection === 'up' ? <FiChevronUp className="w-4 h-4 mr-1" /> : <FiChevronDown className="w-4 h-4 mr-1" />}
            {change}%
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1.5">from last period</span>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboardPage; 