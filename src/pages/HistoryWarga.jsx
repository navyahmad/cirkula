import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/UI/Card';
import { dummyUsers, transactionsHistory, jenisSampah } from '../data/dummyData';
import { FiFilter, FiDownload, FiSearch, FiCalendar, FiFileText, FiTrendingUp, FiBarChart2, FiInbox, FiRefreshCw, FiPackage } from 'react-icons/fi';
import { MdRecycling, MdLocalDining, MdOutlineWaterDrop } from 'react-icons/md';

const HistoryWarga = () => {
  const [user] = useState(dummyUsers.warga);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const filteredTransactions = transactionsHistory.filter(transaction => {
    const matchesSearch = transaction.jenis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.jenis === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalSampah = transactionsHistory.reduce((sum, t) => sum + t.berat, 0);
  const totalNilai = transactionsHistory.reduce((sum, t) => sum + t.nilai, 0);

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
                    <div className="flex items-center gap-2 mb-2">
                      <FiFileText className="w-6 h-6 sm:w-8 sm:h-8" />
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        Riwayat Transaksi
                      </h1>
                    </div>
                    <p className="text-green-100">
                      Catatan semua setoran sampah yang telah dilakukan
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Total Transaksi</p>
                      <p className="text-2xl sm:text-3xl font-bold">{transactionsHistory.length}</p>
                      <p className="text-xs opacity-90 mt-1">
                        30 hari terakhir
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Card>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Sampah</p>
                  <p className="text-2xl font-bold text-gray-800">{totalSampah} kg</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Nilai</p>
                  <p className="text-2xl font-bold text-green-600">Rp {totalNilai.toLocaleString()}</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Rata-rata per Setor</p>
                  <p className="text-2xl font-bold text-gray-800">{Math.round(totalSampah / transactionsHistory.length * 10) / 10} kg</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Frekuensi</p>
                  <p className="text-2xl font-bold text-gray-800">2-3x / minggu</p>
                </div>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari riwayat transaksi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">Semua Jenis</option>
                      {jenisSampah.map((jenis) => (
                        <option key={jenis.id} value={jenis.name}>{jenis.name}</option>
                      ))}
                    </select>
                  </div>

                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <FiCalendar />
                    <span>Pilih Tanggal</span>
                  </button>

                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <FiDownload />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </Card>

            {/* Transactions Table */}
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <FiFileText className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-800">Daftar Transaksi</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Tanggal</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Jenis Sampah</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Berat</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Harga/kg</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => {
                      const hargaPerKg = jenisSampah.find(j => j.name === transaction.jenis)?.pricePerKg || 0;
                      return (
                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-800">{transaction.date}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const item = jenisSampah.find(j => j.name === transaction.jenis);
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
                                const IconComponent = iconMap[item?.icon] || MdRecycling;
                                return <IconComponent className="w-5 h-5 text-gray-600" />;
                              })()}
                              <span>{transaction.jenis}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-800">{transaction.berat} kg</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            Rp {hargaPerKg.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-green-600">
                              Rp {transaction.nilai.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Selesai
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <FiInbox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Tidak ada transaksi yang ditemukan</p>
                  <p className="text-sm text-gray-500 mt-1">Coba ubah filter pencarian</p>
                </div>
              )}

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Transaksi</p>
                    <p className="text-lg font-bold text-gray-800">{filteredTransactions.length}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Berat</p>
                    <p className="text-lg font-bold text-gray-800">
                      {filteredTransactions.reduce((sum, t) => sum + t.berat, 0)} kg
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Nilai</p>
                    <p className="text-lg font-bold text-green-600">
                      Rp {filteredTransactions.reduce((sum, t) => sum + t.nilai, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Chart Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Card>
                <div className="flex items-center gap-2 mb-6">
                  <FiTrendingUp className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-800">Tren Setoran Sampah</h3>
                </div>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-center">
                    <FiBarChart2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chart akan ditampilkan di sini</p>
                    <p className="text-sm text-gray-500">(Grafik perkembangan setoran per minggu)</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2024 WasteGame - Sistem Pengelolaan Sampah Desa Kepulungan
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">
                  Menampilkan {filteredTransactions.length} dari {transactionsHistory.length} transaksi
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Terkini</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HistoryWarga;