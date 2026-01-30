import { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderAdmin from '../components/Layout/HeaderAdmin';
import SidebarAdmin from '../components/Layout/SidebarAdmin';
import Card from '../components/UI/Card';
import { 
  adminUsers, 
  analitikData, 
  sistemLogs, 
  questData,
  leaderboardData
} from '../data/dummyData';
import { 
  FiUsers, 
  FiPackage, 
  FiTrendingUp, 
  FiDollarSign,
  FiBarChart2,
  FiActivity,
  FiAlertCircle,
  FiArrowUpRight,
  FiArrowDownRight,
  FiChevronRight
} from 'react-icons/fi';
import { MdRecycling, MdAnalytics, MdSecurity } from 'react-icons/md';

const AdminDashboard = () => {
  const [user] = useState(adminUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const stats = [
    { 
      title: 'Total Warga', 
      value: analitikData.totalWarga, 
      icon: FiUsers, 
      color: 'bg-blue-100 text-blue-600',
      change: `+${analitikData.pertumbuhanWarga}%`,
      trend: 'up'
    },
    { 
      title: 'Total Sampah', 
      value: `${analitikData.totalSampahKg} kg`, 
      icon: FiPackage, 
      color: 'bg-green-100 text-green-600',
      change: `+${analitikData.pertumbuhanSampah}%`,
      trend: 'up'
    },
    { 
      title: 'Profit Bulan Ini', 
      value: `Rp ${analitikData.profitBulanIni.toLocaleString()}`, 
      icon: FiDollarSign, 
      color: 'bg-purple-100 text-purple-600',
      change: '+15.2%',
      trend: 'up'
    },
    { 
      title: 'System Health', 
      value: '98.5%', 
      icon: MdSecurity, 
      color: 'bg-emerald-100 text-emerald-600',
      change: '-0.5%',
      trend: 'down'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Mobile */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isMobileMenuOpen ? 0 : -300 }}
        className="fixed inset-y-0 left-0 w-64 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl"
      >
        <SidebarAdmin user={user} onLogout={handleLogout} />
      </motion.div>

      {/* Main Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <SidebarAdmin user={user} onLogout={handleLogout} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <HeaderAdmin 
            user={user} 
            onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          <main className="p-4 sm:p-6 lg:p-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      Selamat datang, {user.name}! 👑
                    </h1>
                    <p className="text-purple-100">
                      Pantau dan kelola seluruh sistem WasteGame dari satu dashboard.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Uptime System</p>
                      <p className="text-2xl sm:text-3xl font-bold">99.8%</p>
                      <p className="text-xs opacity-90 mt-1">
                        30 hari terakhir
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <Card key={index}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                      <motion.p 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-gray-800"
                      >
                        {stat.value}
                      </motion.p>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === 'up' ? (
                          <FiArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <FiArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-xs font-medium ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500">from last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* System Activity Logs */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">📝 System Activity Logs</h3>
                  <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                    View All <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {sistemLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-start gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className={`p-2 rounded-lg ${
                        log.status === 'success' ? 'bg-green-100' :
                        log.status === 'warning' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <FiActivity className={`w-4 h-4 ${
                          log.status === 'success' ? 'text-green-600' :
                          log.status === 'warning' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-800 truncate">{log.user}</p>
                          <span className="text-xs text-gray-500">{log.timestamp.split(' ')[1]}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{log.action}</p>
                        <p className="text-xs text-gray-500 truncate">{log.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Leaderboard Overview */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">🏆 Leaderboard Overview</h3>
                  <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                    Reset Monthly <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {leaderboardData.slice(0, 4).map((item) => (
                    <div key={item.rank} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color} text-white font-bold`}>
                            {item.rank}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.dusun}</p>
                          <p className="text-sm text-gray-500">{item.transaksi} transaksi</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{item.totalKg} kg</p>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.totalKg / 250) * 100}%` }}
                            className={`h-full ${item.color}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quest & Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">🎯 Active Quests & Challenges</h3>
                  <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2">
                    <FiTrendingUp className="w-4 h-4" />
                    Create New Quest
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {questData.map((quest) => (
                    <div key={quest.id} className={`p-4 border rounded-xl ${
                      quest.status === 'aktif' 
                        ? 'border-purple-200 bg-purple-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          quest.status === 'aktif' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {quest.status}
                        </span>
                        <span className="text-sm text-gray-600">{quest.peserta} peserta</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{quest.nama}</h4>
                      <p className="text-sm text-gray-600 mb-3">{quest.deskripsi}</p>
                      <div className="p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-800">Reward: {quest.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Alerts & Warnings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <FiAlertCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="text-lg font-bold text-gray-800">⚠️ System Alerts & Warnings</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <FiUsers className="w-4 h-4 text-red-600" />
                      </div>
                      <p className="font-medium text-gray-800">Low Warga Activity</p>
                    </div>
                    <p className="text-sm text-gray-600">Dusun Kedungbanteng hanya 2 transaksi minggu ini</p>
                    <button className="mt-3 text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                      Send Reminder <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <FiDollarSign className="w-4 h-4 text-yellow-600" />
                      </div>
                      <p className="font-medium text-gray-800">Price Adjustment Needed</p>
                    </div>
                    <p className="text-sm text-gray-600">Harga Botol Kaca di pasar turun 15%</p>
                    <button className="mt-3 text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center gap-1">
                      Adjust Price <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MdAnalytics className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="font-medium text-gray-800">Monthly Report Ready</p>
                    </div>
                    <p className="text-sm text-gray-600">Laporan bulan Mei 2024 siap didownload</p>
                    <button className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                      Download Report <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FiPackage className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="font-medium text-gray-800">EPR Data Available</p>
                    </div>
                    <p className="text-sm text-gray-600">Data kemasan Unilever siap dijual</p>
                    <button className="mt-3 text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
                      View EPR Data <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <MdRecycling className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        ⚡ Quick System Actions
                      </h3>
                      <p className="text-gray-600">
                        Akses cepat ke fungsi administrasi penting
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg border border-purple-300 hover:bg-purple-50 transition-colors">
                      Backup Database
                    </button>
                    <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                      Generate Reports
                    </button>
                    <button className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors">
                      System Maintenance
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2024 WasteGame Admin Dashboard - Super Admin Platform
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Version: 2.1.0</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">All Systems Operational</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;