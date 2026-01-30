import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import StatCard from '../components/Dashboard/StatCard';
import LeaderboardCard from '../components/Dashboard/LeaderboardCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import LevelProgress from '../components/Gamification/LevelProgress';
import AchievementBadge from '../components/Gamification/AchievementBadge';
import { dummyUsers, leaderboardData, transactionsHistory, achievements, jenisSampah } from '../data/dummyData';
import { FiDollarSign, FiTrendingUp, FiPackage, FiCalendar, FiAward, FiMapPin, FiRefreshCw } from 'react-icons/fi';
import { MdRecycling, MdLocalShipping, MdLocalDining, MdOutlineWaterDrop } from 'react-icons/md';
import logo from "../assets/images/logo.png";

const DashboardWarga = () => {
  const [user] = useState(dummyUsers.warga);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Tambahkan fungsi logout di sini
  const handleLogout = () => {
    window.location.href = '/';
  };

  // Format angka untuk display
  const formatNumber = (num) => {
    return num.toLocaleString('id-ID');
  };

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
        {/* Tambahkan onLogout prop di sini */}
        <Sidebar user={user} onLogout={handleLogout} />
      </motion.div>

      {/* Main Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          {/* Tambahkan onLogout prop di sini juga */}
          <Sidebar user={user} onLogout={handleLogout} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Header 
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
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      Selamat datang, {user.name}! 👋
                    </h1>
                    <p className="text-green-100">
                      Mari wujudkan Desa Kepulungan yang lebih bersih dan hijau bersama-sama.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-sm">Total Tabungan</p>
                      <p className="text-2xl font-bold">Rp {formatNumber(user.saldo)}</p>
                      <p className="text-xs opacity-90 mt-1">
                        Cukup untuk bayar BPJS 3 bulan!
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
              <StatCard
                title="Total Tabungan"
                value={`Rp ${formatNumber(user.saldo)}`}
                icon={<FiDollarSign className="w-6 h-6" />}
                color="bg-green-100 text-green-600"
                description="Cair kapan saja"
              />
              <StatCard
                title="Sampah Terkumpul"
                value={`${user.totalSampahKg} kg`}
                icon={<MdRecycling className="w-6 h-6" />}
                color="bg-blue-100 text-blue-600"
                trend={12.5}
              />
              <StatCard
                title="Transaksi"
                value={`${user.totalTransaksi} kali`}
                icon={<FiTrendingUp className="w-6 h-6" />}
                color="bg-purple-100 text-purple-600"
                description="30 hari terakhir"
              />
              <StatCard
                title="Peringkat Dusun"
                value={`#${leaderboardData.find(d => d.dusun === user.dusun)?.rank || '-'}`}
                icon={<FiPackage className="w-6 h-6" />}
                color="bg-amber-100 text-amber-600"
                description={user.dusun}
              />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left Column - Leaderboard & Activity */}
              <div className="lg:col-span-2 space-y-6">
                <LeaderboardCard 
                  data={leaderboardData} 
                  userDusun={user.dusun}
                />
                <RecentActivity transactions={transactionsHistory} />
              </div>

              {/* Right Column - Profile & Info */}
              <div className="space-y-6">
                <LevelProgress 
                  level={user.level}
                  progress={user.levelProgress}
                  totalSampahKg={user.totalSampahKg}
                />

                {/* Jenis Sampah & Harga */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FiDollarSign className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-800">
                      Harga Sampah per kg
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {jenisSampah.map((item) => {
                      const iconMap = {
                        "recycle": MdRecycling,
                        "refresh": FiRefreshCw,
                        "package": FiPackage,
                        "can": MdLocalDining,
                        "bottle": MdOutlineWaterDrop,
                        "♻️": MdRecycling,
                        "🔄": FiRefreshCw,
                        "📦": FiPackage,
                        "🥫": MdLocalDining,
                        "🍶": MdOutlineWaterDrop,
                      };
                      const IconComponent = iconMap[item.icon] || FiPackage;
                      return (
                      <div 
                        key={item.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${item.color}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            Rp {item.pricePerKg.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      Harga dapat berubah sesuai kondisi pasar daur ulang
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FiAward className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-bold text-gray-800">Pencapaian & Badge</h2>
                </div>
                <div className="text-sm text-gray-500">
                  {achievements.filter(a => a.achieved).length} dari {achievements.length} tercapai
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {achievements.map((achievement) => (
                  <AchievementBadge 
                    key={achievement.id} 
                    achievement={achievement} 
                  />
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="mb-4 lg:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMapPin className="w-5 h-5 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-800">
                      Siap setor sampah hari ini?
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Bawa sampah non-organik ke Bank Sampah Desa Kepulungan dan dapatkan tabungan!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    Lihat Lokasi Bank Sampah
                  </button>
                  <button className="w-full sm:w-auto px-6 py-3 bg-white text-green-600 font-semibold rounded-lg border border-green-300 hover:bg-green-50 transition-colors">
                    Cara Setor Sampah
                  </button>
                </div>
              </div>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="px-6 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm">
                © 2026 WasteGame - Sistem Pengelolaan Sampah Desa Kepulungan
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Status: Online</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">5 dusun aktif</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardWarga;