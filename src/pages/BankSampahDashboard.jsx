import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeaderBankSampah from '../components/Layout/HeaderBankSampah';
import SidebarBankSampah from '../components/Layout/SidebarBankSampah';
import Card from '../components/UI/Card';
import { 
  bankSampahUsers, 
  stokSampah, 
  riwayatSetoran, 
  wargaTerdaftar 
} from '../data/dummyData';
import { 
  FiDollarSign, 
  FiPackage, 
  FiUsers, 
  FiTrendingUp,
  FiActivity,
  FiArrowRight,
  FiAlertCircle
} from 'react-icons/fi';
import { MdRecycling, MdLocalShipping, MdAttachMoney } from 'react-icons/md';

const BankSampahDashboard = () => {
  const [user] = useState(bankSampahUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const totalStok = stokSampah.reduce((sum, item) => sum + item.berat, 0);
  const totalNilaiStok = stokSampah.reduce((sum, item) => sum + item.nilai, 0);
  const totalWarga = wargaTerdaftar.length;
  const setoranHariIni = riwayatSetoran
    .filter(t => t.tanggal.includes('2024-06-15'))
    .reduce((sum, t) => sum + t.nilai, 0);

  const stats = [
    { 
      title: 'Total Stok', 
      value: `${totalStok} kg`, 
      icon: FiPackage, 
      color: 'bg-blue-100 text-blue-600',
      change: '+12.5%',
      description: 'Sampah tersimpan'
    },
    { 
      title: 'Nilai Stok', 
      value: `Rp ${totalNilaiStok.toLocaleString()}`, 
      icon: MdAttachMoney, 
      color: 'bg-green-100 text-green-600',
      change: '+8.2%',
      description: 'Estimasi nilai'
    },
    { 
      title: 'Warga Terdaftar', 
      value: totalWarga, 
      icon: FiUsers, 
      color: 'bg-purple-100 text-purple-600',
      change: '+2 baru',
      description: 'Total anggota'
    },
    { 
      title: 'Setoran Hari Ini', 
      value: `Rp ${setoranHariIni.toLocaleString()}`, 
      icon: FiActivity, 
      color: 'bg-amber-100 text-amber-600',
      change: '3 transaksi',
      description: '15 Juni 2024'
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
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      Selamat datang, {user.name}! 👋
                    </h1>
                    <p className="text-blue-100">
                      Kelola setoran warga dan stok sampah dengan mudah.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-sm">Kas Operasional</p>
                      <p className="text-2xl sm:text-3xl font-bold">Rp {user.saldoKas.toLocaleString()}</p>
                      <p className="text-xs opacity-90 mt-1">
                        Untuk pembayaran warga
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/bank-sampah/input-setoran">
                  <Card className="hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="p-6 text-center">
                      <div className="inline-flex p-3 bg-green-100 rounded-full mb-4">
                        <FiPackage className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">Input Setoran</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Catat setoran sampah dari warga
                      </p>
                      <button className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                        Mulai Input
                      </button>
                    </div>
                  </Card>
                </Link>

                <Link to="/bank-sampah/kelola-stok">
                  <Card className="hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="p-6 text-center">
                      <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                        <MdRecycling className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">Kelola Stok</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Lihat dan kelola stok sampah
                      </p>
                      <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Lihat Stok
                      </button>
                    </div>
                  </Card>
                </Link>

                <Card className="hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="p-6 text-center">
                    <div className="inline-flex p-3 bg-purple-100 rounded-full mb-4">
                      <MdLocalShipping className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Jual ke Industri</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Jual sampah ke pihak ketiga
                    </p>
                    <button className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                      Buat Penjualan
                    </button>
                  </div>
                </Card>

                <Card className="hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="p-6 text-center">
                    <div className="inline-flex p-3 bg-amber-100 rounded-full mb-4">
                      <FiDollarSign className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Pencairan</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Bayar tabungan warga
                    </p>
                    <button className="w-full py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors">
                      Bayar Warga
                    </button>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
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
                      {stat.description && (
                        <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                      )}
                      {stat.change && (
                        <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                          stat.change.includes('+') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {stat.change.includes('+') ? '↗' : '↘'} {stat.change}
                        </div>
                      )}
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
              {/* Stok Sampah */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">📦 Stok Sampah Saat Ini</h3>
                  <Link 
                    to="/bank-sampah/kelola-stok"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    Lihat Detail <FiArrowRight />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {stokSampah.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <FiPackage className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.jenis}</p>
                          <p className="text-sm text-gray-500">{item.berat} kg × Rp {item.hargaPerKg.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">Rp {item.nilai.toLocaleString()}</p>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.berat / totalStok) * 100}%` }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Setoran Terbaru */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">🔄 Setoran Terbaru</h3>
                  <Link 
                    to="/bank-sampah/riwayat"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    Lihat Semua <FiArrowRight />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {riwayatSetoran.slice(0, 4).map((setoran) => (
                    <div key={setoran.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          setoran.nama.includes('Tamu') ? 'bg-gray-100' : 'bg-green-100'
                        }`}>
                          <FiUsers className={`w-5 h-5 ${
                            setoran.nama.includes('Tamu') ? 'text-gray-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{setoran.nama}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                              {setoran.dusun}
                            </span>
                            <span className="text-xs text-gray-500">{setoran.tanggal.split(' ')[1]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+ Rp {setoran.nilai.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{setoran.berat} kg {setoran.jenis}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Alerts & Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <FiAlertCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="text-lg font-bold text-gray-800">⚠️ Peringatan & Aksi</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <FiPackage className="w-4 h-4 text-red-600" />
                      </div>
                      <p className="font-medium text-gray-800">Botol PET hampir penuh</p>
                    </div>
                    <p className="text-sm text-gray-600">Stok mencapai 80% kapasitas gudang</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MdLocalShipping className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="font-medium text-gray-800">Penawaran dari industri</p>
                    </div>
                    <p className="text-sm text-gray-600">PT Daur Ulang Plastik tawarkan Rp 4.200/kg</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FiUsers className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="font-medium text-gray-800">5 warga baru mendaftar</p>
                    </div>
                    <p className="text-sm text-gray-600">Verifikasi data warga baru</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <MdRecycling className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        📊 Laporan Bulanan Siap
                      </h3>
                      <p className="text-gray-600">
                        Download laporan kinerja Bank Sampah bulan Mei 2024
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors">
                      Preview Laporan
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                      Download PDF
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
                © 2024 Bank Sampah Desa Kepulungan - Sistem Pengelolaan Sampah Digital
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Operator: {user.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default BankSampahDashboard;