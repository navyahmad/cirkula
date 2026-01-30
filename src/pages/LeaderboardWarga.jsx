import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/UI/Card';
import { dummyUsers, leaderboardData } from '../data/dummyData';
import { FiAward, FiTrendingUp, FiUsers, FiBarChart2 } from 'react-icons/fi';

const LeaderboardWarga = () => {
  const [user] = useState(dummyUsers.warga);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('bulanan');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const userDusunData = leaderboardData.find(d => d.dusun === user.dusun);

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
        <Sidebar user={user} onLogout={handleLogout} />
      </motion.div>

      {/* Main Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar user={user} onLogout={handleLogout} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Header 
            user={user} 
            onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          <main className="p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      🏆 Leaderboard Dusun
                    </h1>
                    <p className="text-green-100">
                      Kompetisi sehat antar dusun dalam pengelolaan sampah
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Posisi Dusun Kamu</p>
                      <p className="text-3xl sm:text-4xl font-bold">#{userDusunData?.rank || '-'}</p>
                      <p className="text-xs opacity-90 mt-1">{user.dusun}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeframe Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['harian', 'mingguan', 'bulanan'].map((time) => (
                <button
                  key={time}
                  onClick={() => setTimeframe(time)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeframe === time
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </button>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <FiAward className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Peringkat</p>
                      <p className="text-xl font-bold text-gray-800">#{userDusunData?.rank || '-'}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{user.dusun}</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiBarChart2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Sampah</p>
                      <p className="text-xl font-bold text-gray-800">{userDusunData?.totalKg || 0} kg</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Keseluruhan</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiTrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Transaksi</p>
                      <p className="text-xl font-bold text-gray-800">{userDusunData?.transaksi || 0}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Total setoran</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FiUsers className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Partisipan</p>
                      <p className="text-xl font-bold text-gray-800">45</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Warga aktif</p>
                </div>
              </Card>
            </div>

            {/* Leaderboard Table */}
            <Card className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Peringkat Dusun</h3>
                <div className="text-sm text-gray-500">
                  Periode: Juni 2024
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Peringkat</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Dusun</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Total Sampah</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Transaksi</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((item) => (
                      <tr 
                        key={item.rank} 
                        className={`border-b border-gray-100 hover:bg-gray-50 ${
                          item.dusun === user.dusun ? 'bg-green-50' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color} text-white font-bold`}>
                              {item.rank}
                            </div>
                            {item.rank <= 3 && (
                              <FiAward className={`w-5 h-5 ${
                                item.rank === 1 ? 'text-yellow-500' :
                                item.rank === 2 ? 'text-gray-400' :
                                'text-amber-700'
                              }`} />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-800">{item.dusun}</div>
                          {item.dusun === user.dusun && (
                            <span className="text-xs text-green-600 font-medium">(Dusun Anda)</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-bold text-gray-800">{item.totalKg} kg</td>
                        <td className="py-3 px-4 text-gray-600">{item.transaksi} transaksi</td>
                        <td className="py-3 px-4">
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.totalKg / 250) * 100}%` }}
                              className={`h-full ${item.color}`}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Cara Naik Peringkat</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Setor sampah secara rutin</p>
                        <p className="text-sm text-gray-600">Semakin sering setor, poin semakin banyak</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Ajakan warga lain</p>
                        <p className="text-sm text-gray-600">Ajak tetangga untuk ikut setor sampah</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Jenis sampah beragam</p>
                        <p className="text-sm text-gray-600">Setor berbagai jenis sampah non-organik</p>
                      </div>
                    </li>
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🎁 Hadiah untuk Dusun Juara</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🥇</span>
                        <div>
                          <p className="font-bold text-gray-800">Juara 1</p>
                          <p className="text-sm text-gray-600">Bonus tabungan 10% untuk semua warga</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🥈</span>
                        <div>
                          <p className="font-bold text-gray-800">Juara 2</p>
                          <p className="text-sm text-gray-600">Bonus tabungan 5% untuk semua warga</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🥉</span>
                        <div>
                          <p className="font-bold text-gray-800">Juara 3</p>
                          <p className="text-sm text-gray-600">Bonus tabungan 3% untuk semua warga</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2024 WasteGame - Sistem Pengelolaan Sampah Desa Kepulungan
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Update: 1 jam lalu</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Live</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardWarga;