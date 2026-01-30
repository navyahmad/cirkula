import { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderBankSampah from '../components/Layout/HeaderBankSampah';
import SidebarBankSampah from '../components/Layout/SidebarBankSampah';
import Card from '../components/UI/Card';
import { 
  bankSampahUsers, 
  riwayatSetoran, 
  penjualanIndustri 
} from '../data/dummyData';
import { 
  FiFilter, 
  FiSearch, 
  FiDownload, 
  FiCalendar,
  FiUser,
  FiPackage,
  FiTrendingUp,
  FiRefreshCw
} from 'react-icons/fi';
import { MdRecycling, MdAttachMoney } from 'react-icons/md';

const RiwayatBankSampah = () => {
  const [user] = useState(bankSampahUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('setoran');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('semua');

  const handleLogout = () => {
    window.location.href = '/';
  };

  // Filter data berdasarkan tab aktif dan pencarian
  const filteredSetoran = riwayatSetoran.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.dusun.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.jenis.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (dateFilter === 'hari-ini') {
      matchesDate = item.tanggal.includes('2024-06-15');
    } else if (dateFilter === 'minggu-ini') {
      matchesDate = true; // Simplified for demo
    } else if (dateFilter === 'bulan-ini') {
      matchesDate = item.tanggal.includes('2024-06');
    }
    
    return matchesSearch && matchesDate;
  });

  const filteredPenjualan = penjualanIndustri.filter(item => {
    const matchesSearch = item.pembeli.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.jenis.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (dateFilter === 'hari-ini') {
      matchesDate = item.tanggal.includes('2024-06-15');
    } else if (dateFilter === 'minggu-ini') {
      matchesDate = true; // Simplified for demo
    } else if (dateFilter === 'bulan-ini') {
      matchesDate = item.tanggal.includes('2024-06');
    }
    
    return matchesSearch && matchesDate;
  });

  const totalSetoran = riwayatSetoran.reduce((sum, item) => sum + item.nilai, 0);
  const totalPenjualan = penjualanIndustri.reduce((sum, item) => sum + item.total, 0);
  const transaksiHariIni = riwayatSetoran.filter(item => item.tanggal.includes('2024-06-15')).length;

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
        className="fixed inset-y-0 left-0 w-64 max-w-[85vw] bg-white z-40 lg:hidden shadow-2xl"
      >
        <SidebarBankSampah user={user} onLogout={handleLogout} />
      </motion.div>

      {/* Main Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <SidebarBankSampah user={user} onLogout={handleLogout} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <HeaderBankSampah 
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
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      📋 Riwayat Transaksi
                    </h1>
                    <p className="text-blue-100">
                      Pantau semua transaksi setoran dan penjualan sampah
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Total Transaksi</p>
                      <p className="text-2xl sm:text-3xl font-bold">{riwayatSetoran.length + penjualanIndustri.length}</p>
                      <p className="text-xs opacity-90 mt-1">
                        Setoran & Penjualan
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
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiUser className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Setoran</p>
                      <p className="text-xl font-bold text-gray-800">Rp {totalSetoran.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MdRecycling className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Penjualan</p>
                      <p className="text-xl font-bold text-gray-800">Rp {totalPenjualan.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FiTrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Transaksi Hari Ini</p>
                      <p className="text-xl font-bold text-gray-800">{transaksiHariIni}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <MdAttachMoney className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Profit Bersih</p>
                      <p className="text-xl font-bold text-gray-800">Rp {(totalPenjualan - totalSetoran).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters & Tabs */}
            <Card className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 lg:border-none">
                  <button
                    onClick={() => setActiveTab('setoran')}
                    className={`px-4 py-3 font-medium border-b-2 lg:border-b-0 lg:rounded-lg transition-colors ${
                      activeTab === 'setoran'
                        ? 'border-blue-500 text-blue-600 lg:bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-800 lg:hover:bg-gray-50'
                    }`}
                  >
                    Setoran Warga
                  </button>
                  <button
                    onClick={() => setActiveTab('penjualan')}
                    className={`px-4 py-3 font-medium border-b-2 lg:border-b-0 lg:rounded-lg transition-colors ${
                      activeTab === 'penjualan'
                        ? 'border-blue-500 text-blue-600 lg:bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-800 lg:hover:bg-gray-50'
                    }`}
                  >
                    Penjualan ke Industri
                  </button>
                  <button
                    onClick={() => setActiveTab('semua')}
                    className={`px-4 py-3 font-medium border-b-2 lg:border-b-0 lg:rounded-lg transition-colors ${
                      activeTab === 'semua'
                        ? 'border-blue-500 text-blue-600 lg:bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-800 lg:hover:bg-gray-50'
                    }`}
                  >
                    Semua Transaksi
                  </button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari riwayat transaksi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="semua">Semua Waktu</option>
                        <option value="hari-ini">Hari Ini</option>
                        <option value="minggu-ini">Minggu Ini</option>
                        <option value="bulan-ini">Bulan Ini</option>
                      </select>
                    </div>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                      <FiDownload />
                      <span className="hidden sm:inline">Export</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Transactions Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Tanggal & Waktu</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">
                        {activeTab === 'setoran' ? 'Nama Warga' : 'Pembeli'}
                      </th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">
                        {activeTab === 'setoran' ? 'Dusun' : 'Jenis'}
                      </th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Detail</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Jumlah</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === 'setoran' && filteredSetoran.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                            <span>{item.tanggal}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FiUser className={`w-4 h-4 ${
                              item.nama.includes('Tamu') ? 'text-gray-500' : 'text-green-500'
                            }`} />
                            <span className="font-medium text-gray-800">{item.nama}</span>
                            {item.nama.includes('Tamu') && (
                              <span className="text-xs text-gray-500">(Tamu)</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                            {item.dusun}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FiPackage className="w-4 h-4 text-blue-500" />
                            <span>{item.jenis} ({item.berat} kg)</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-green-600">
                            + Rp {item.nilai.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Tabungan warga
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {activeTab === 'penjualan' && filteredPenjualan.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                            <span>{item.tanggal}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-800">{item.pembeli}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FiPackage className="w-4 h-4 text-blue-500" />
                            <span>{item.jenis}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span>{item.berat} kg × Rp {item.harga.toLocaleString()}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-green-600">
                            + Rp {item.total.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Pendapatan bank sampah
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {activeTab === 'semua' && (
                      <>
                        {filteredSetoran.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">{item.tanggal}</td>
                            <td className="py-3 px-4">{item.nama}</td>
                            <td className="py-3 px-4">{item.dusun}</td>
                            <td className="py-3 px-4">{item.jenis} ({item.berat} kg)</td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-green-600">
                                + Rp {item.nilai.toLocaleString()}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {filteredPenjualan.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">{item.tanggal}</td>
                            <td className="py-3 px-4">{item.pembeli}</td>
                            <td className="py-3 px-4">{item.jenis}</td>
                            <td className="py-3 px-4">{item.berat} kg</td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-green-600">
                                + Rp {item.total.toLocaleString()}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}

                    {/* Empty State */}
                    {(activeTab === 'setoran' && filteredSetoran.length === 0) ||
                     (activeTab === 'penjualan' && filteredPenjualan.length === 0) ||
                     (activeTab === 'semua' && filteredSetoran.length === 0 && filteredPenjualan.length === 0) && (
                      <tr>
                        <td colSpan="6" className="py-12 text-center">
                          <div className="text-gray-400 text-4xl mb-4">📭</div>
                          <p className="text-gray-600">Tidak ada transaksi yang ditemukan</p>
                          <p className="text-sm text-gray-500 mt-1">Coba ubah filter pencarian</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Transaksi</p>
                    <p className="text-lg font-bold text-gray-800">
                      {activeTab === 'setoran' ? filteredSetoran.length :
                       activeTab === 'penjualan' ? filteredPenjualan.length :
                       filteredSetoran.length + filteredPenjualan.length}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Nilai</p>
                    <p className="text-lg font-bold text-blue-600">
                      Rp {activeTab === 'setoran' ? filteredSetoran.reduce((sum, t) => sum + t.nilai, 0).toLocaleString() :
                         activeTab === 'penjualan' ? filteredPenjualan.reduce((sum, t) => sum + t.total, 0).toLocaleString() :
                         (filteredSetoran.reduce((sum, t) => sum + t.nilai, 0) + 
                          filteredPenjualan.reduce((sum, t) => sum + t.total, 0)).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Terakhir Update</p>
                    <div className="flex items-center gap-2">
                      <FiRefreshCw className="w-4 h-4 text-green-600" />
                      <p className="text-lg font-bold text-gray-800">
                        {new Date().toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </main>

          {/* Footer */}
          <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2024 Bank Sampah Desa Kepulungan - Riwayat Transaksi
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">
                  Menampilkan {
                    activeTab === 'setoran' ? filteredSetoran.length :
                    activeTab === 'penjualan' ? filteredPenjualan.length :
                    filteredSetoran.length + filteredPenjualan.length
                  } transaksi
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

export default RiwayatBankSampah;