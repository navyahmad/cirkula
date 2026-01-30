import { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderAdmin from '../components/Layout/HeaderAdmin';
import SidebarAdmin from '../components/Layout/SidebarAdmin';
import Card from '../components/UI/Card';
import { 
  adminUsers, 
  analitikData,
  leaderboardData,
  riwayatSetoran,
  penjualanIndustri
} from '../data/dummyData';
import { 
  FiBarChart2, 
  FiDownload, 
  FiFilter, 
  FiCalendar,
  FiTrendingUp,
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiPrinter,
  FiChevronRight
} from 'react-icons/fi';
import { MdAnalytics, MdShowChart } from 'react-icons/md';

const LaporanAnalitik = () => {
  const [user] = useState(adminUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const formatCurrency = (amount) => {
    return `Rp ${amount.toLocaleString()}`;
  };

  const calculateGrowth = (current, previous) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const monthlyData = [
    { month: 'Jan', sampah: 1200, pendapatan: 8500000 },
    { month: 'Feb', sampah: 1350, pendapatan: 9200000 },
    { month: 'Mar', sampah: 1500, pendapatan: 10500000 },
    { month: 'Apr', sampah: 1650, pendapatan: 11500000 },
    { month: 'May', sampah: 1800, pendapatan: 12500000 },
    { month: 'Jun', sampah: 2100, pendapatan: 14500000 },
  ];

  const kategoriSampah = [
    { jenis: 'Botol PET', persentase: 35, warna: 'bg-blue-500' },
    { jenis: 'Plastik Keras', persentase: 25, warna: 'bg-green-500' },
    { jenis: 'Kardus/Kertas', persentase: 20, warna: 'bg-yellow-500' },
    { jenis: 'Kaleng/Besi', persentase: 15, warna: 'bg-red-500' },
    { jenis: 'Botol Kaca', persentase: 5, warna: 'bg-purple-500' },
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
        className="fixed inset-y-0 left-0 w-64 max-w-[85vw] bg-white z-40 lg:hidden shadow-2xl"
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
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      📊 Laporan & Analitik
                    </h1>
                    <p className="text-purple-100">
                      Analisis komprehensif kinerja sistem WasteGame
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Periode Laporan</p>
                      <p className="text-2xl sm:text-3xl font-bold">Q2 2024</p>
                      <p className="text-xs opacity-90 mt-1">
                        Jan - Jun 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Report Controls */}
            <Card className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Report Type Tabs */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setReportType('overview')}
                    className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                      reportType === 'overview'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setReportType('financial')}
                    className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                      reportType === 'financial'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Financial
                  </button>
                  <button
                    onClick={() => setReportType('performance')}
                    className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                      reportType === 'performance'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Performance
                  </button>
                  <button
                    onClick={() => setReportType('sustainability')}
                    className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                      reportType === 'sustainability'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sustainability
                  </button>
                </div>

                {/* Date Range & Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="week">Minggu Ini</option>
                      <option value="month">Bulan Ini</option>
                      <option value="quarter">Quarter Ini</option>
                      <option value="year">Tahun Ini</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                      <FiFilter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
                      <FiDownload className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                      <FiPrinter className="w-4 h-4" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiUsers className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className={`flex items-center gap-1 ${
                      analitikData.pertumbuhanWarga > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <FiTrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{analitikData.pertumbuhanWarga}%</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{analitikData.totalWarga}</p>
                  <p className="text-sm text-gray-600">Total Warga Terdaftar</p>
                  <p className="text-xs text-gray-500 mt-1">{analitikData.wargaAktif} aktif</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiPackage className="w-5 h-5 text-green-600" />
                    </div>
                    <div className={`flex items-center gap-1 ${
                      analitikData.pertumbuhanSampah > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <FiTrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{analitikData.pertumbuhanSampah}%</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{analitikData.totalSampahKg.toLocaleString()} kg</p>
                  <p className="text-sm text-gray-600">Total Sampah Terkumpul</p>
                  <p className="text-xs text-gray-500 mt-1">{analitikData.rataSetoranPerHari} kg/hari</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FiDollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <FiTrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">15.2%</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(analitikData.pendapatanBulanIni)}</p>
                  <p className="text-sm text-gray-600">Pendapatan Bulan Ini</p>
                  <p className="text-xs text-gray-500 mt-1">Profit: {formatCurrency(analitikData.profitBulanIni)}</p>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <MdAnalytics className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <FiTrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">8.3%</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{analitikData.totalTransaksi}</p>
                  <p className="text-sm text-gray-600">Total Transaksi</p>
                  <p className="text-xs text-gray-500 mt-1">{Math.round(analitikData.totalTransaksi / 30)} transaksi/hari</p>
                </div>
              </Card>
            </div>

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Monthly Trend Chart */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">📈 Trend Bulanan</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Sampah (kg)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Pendapatan (jt)</span>
                    </div>
                  </div>
                </div>

                <div className="h-64 flex items-end gap-2 p-4">
                  {monthlyData.map((month, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="flex items-end gap-1 w-full justify-center">
                        <div 
                          className="w-6 bg-blue-500 rounded-t-lg"
                          style={{ height: `${(month.sampah / 2500) * 100}%` }}
                        ></div>
                        <div 
                          className="w-6 bg-green-500 rounded-t-lg"
                          style={{ height: `${(month.pendapatan / 15000000) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{month.month}</p>
                      <p className="text-xs text-gray-500">{month.sampah.toLocaleString()} kg</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Rata-rata Bulanan</p>
                      <p className="font-bold text-gray-800">
                        {Math.round(monthlyData.reduce((sum, m) => sum + m.sampah, 0) / monthlyData.length).toLocaleString()} kg
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Growth Rate</p>
                      <p className="font-bold text-green-600">
                        +{calculateGrowth(monthlyData[5].sampah, monthlyData[0].sampah)}%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Sampah Composition */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">🥫 Komposisi Sampah</h3>
                  <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                    View Details <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="h-64 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {kategoriSampah.reduce((prev, curr, index) => {
                      const degree = (prev / 100) * 360;
                      const nextDegree = ((prev + curr.persentase) / 100) * 360;
                      
                      return (
                        <div key={index}>
                          <div 
                            className="absolute top-0 left-0 w-full h-full rounded-full"
                            style={{
                              background: `conic-gradient(
                                transparent 0deg ${degree}deg,
                                ${curr.warna} ${degree}deg ${nextDegree}deg,
                                transparent ${nextDegree}deg 360deg
                              )`
                            }}
                          ></div>
                          {prev + curr.persentase}
                        </div>
                      );
                    }, 0)}

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {kategoriSampah.map((kategori, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${kategori.warna}`}></div>
                        <span className="text-gray-700">{kategori.jenis}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-800">{kategori.persentase}%</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${kategori.warna}`}
                            style={{ width: `${kategori.persentase}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Leaderboard Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">🏆 Performance by Dusun</h3>
                  <div className="text-sm text-gray-500">
                    Periode: Jan - Jun 2024
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Peringkat</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Dusun</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Total Sampah</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Warga Aktif</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Rata-rata per Warga</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((item) => (
                        <tr key={item.rank} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color} text-white font-bold`}>
                                {item.rank}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-800">{item.dusun}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-gray-800">{item.totalKg} kg</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-gray-600">{Math.round(item.transaksi / 3)} warga</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-800">
                              {Math.round(item.totalKg / (item.transaksi / 3))} kg/warga
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              item.rank <= 2 ? 'bg-green-100 text-green-800' :
                              item.rank <= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.rank <= 2 ? 'Excellent' : 
                               item.rank <= 4 ? 'Good' : 'Needs Improvement'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>

            {/* Financial Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <h3 className="text-lg font-bold text-gray-800 mb-6">💰 Ringkasan Keuangan</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FiDollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Pendapatan</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(analitikData.pendapatanBulanIni)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Penjualan ke Industri</span>
                        <span className="font-medium text-gray-800">
                          {formatCurrency(analitikData.pendapatanBulanIni * 0.7)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Data EPR</span>
                        <span className="font-medium text-gray-800">
                          {formatCurrency(analitikData.pendapatanBulanIni * 0.3)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <FiTrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Profit</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(analitikData.profitBulanIni)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Margin</span>
                        <span className="font-medium text-gray-800">
                          {((analitikData.profitBulanIni / analitikData.pendapatanBulanIni) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Growth MoM</span>
                        <span className="font-medium text-green-600">
                          +15.2%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <MdShowChart className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Sustainability Impact</p>
                        <p className="text-2xl font-bold text-green-600">
                          {analitikData.totalSampahKg} kg
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">CO2 Reduced</span>
                        <span className="font-medium text-gray-800">
                          {(analitikData.totalSampahKg * 1.5).toLocaleString()} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Trees Saved</span>
                        <span className="font-medium text-green-600">
                          {Math.round(analitikData.totalSampahKg / 100)} pohon
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Report Generation */}
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
                      <FiBarChart2 className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        📄 Generate Custom Report
                      </h3>
                      <p className="text-gray-600">
                        Buat laporan khusus dengan parameter yang Anda inginkan
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg border border-purple-300 hover:bg-purple-50 transition-colors">
                      Preview Report
                    </button>
                    <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                      Generate Full Report
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
                © 2024 WasteGame Admin Dashboard - Laporan & Analitik
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Report Generated: Today 12:45</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Data Updated</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LaporanAnalitik;