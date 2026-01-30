import { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderAdmin from '../components/Layout/HeaderAdmin';
import SidebarAdmin from '../components/Layout/SidebarAdmin';
import Card from '../components/UI/Card';
import { 
  adminUsers, 
  jenisSampah,
  hargaJualIndustri
} from '../data/dummyData';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiEdit,
  FiSave,
  FiRefreshCw,
  FiBarChart2,
  FiAlertCircle,
  FiClock,  // Ganti FiHistory dengan FiClock
  FiX,       // Tambah FiX yang hilang
  FiChevronRight
} from 'react-icons/fi';

const ManajemenHarga = () => {
  const [user] = useState(adminUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hargaSampah, setHargaSampah] = useState(jenisSampah);
  const [hargaIndustri, setHargaIndustri] = useState(hargaJualIndustri);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    pricePerKg: '',
    icon: '',
    color: ''
  });
  const [history, setHistory] = useState([
    { id: 1, tanggal: '2024-06-15 10:00', jenis: 'Botol PET', hargaLama: 3200, hargaBaru: 3500, admin: 'Admin Utama' },
    { id: 2, tanggal: '2024-06-10 14:30', jenis: 'Plastik Keras', hargaLama: 2200, hargaBaru: 2500, admin: 'Admin Utama' },
    { id: 3, tanggal: '2024-06-05 09:15', jenis: 'Kardus/Kertas', hargaLama: 1800, hargaBaru: 2000, admin: 'Admin Utama' },
  ]);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleEditPrice = (item) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      pricePerKg: item.pricePerKg.toString(),
      icon: item.icon,
      color: item.color
    });
  };

  const handleSavePrice = () => {
    const updatedHarga = hargaSampah.map(item => 
      item.id === editingId 
        ? { ...item, pricePerKg: parseInt(editForm.pricePerKg) }
        : item
    );
    
    // Add to history
    const oldPrice = hargaSampah.find(item => item.id === editingId)?.pricePerKg;
    if (oldPrice && oldPrice !== parseInt(editForm.pricePerKg)) {
      setHistory(prev => [{
        id: Date.now(),
        tanggal: new Date().toLocaleString('id-ID'),
        jenis: editForm.name,
        hargaLama: oldPrice,
        hargaBaru: parseInt(editForm.pricePerKg),
        admin: user.name
      }, ...prev]);
    }
    
    setHargaSampah(updatedHarga);
    setEditingId(null);
    alert(`Harga ${editForm.name} berhasil diupdate!`);
  };

  const handleBulkUpdate = (percentage) => {
    const updatedHarga = hargaSampah.map(item => ({
      ...item,
      pricePerKg: Math.round(item.pricePerKg * (1 + percentage/100))
    }));
    
    setHargaSampah(updatedHarga);
    alert(`Semua harga berhasil dinaikkan ${percentage}%!`);
  };

  const calculateProfitMargin = (hargaBeli, hargaJual) => {
    const margin = ((hargaJual - hargaBeli) / hargaBeli) * 100;
    return margin.toFixed(1);
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
                      💰 Manajemen Harga Sampah
                    </h1>
                    <p className="text-purple-100">
                      Kelola harga beli dari warga dan pantau harga pasar industri
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Rata-rata Margin</p>
                      <p className="text-2xl sm:text-3xl font-bold">28.5%</p>
                      <p className="text-xs opacity-90 mt-1">
                        Profit bank sampah
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bulk Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card>
                <h3 className="text-lg font-bold text-gray-800 mb-6">⚡ Bulk Price Actions</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <button
                    onClick={() => handleBulkUpdate(5)}
                    className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-center"
                  >
                    <div className="inline-flex p-3 bg-green-100 rounded-full mb-3">
                      <FiTrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-bold text-gray-800">Naik 5%</p>
                    <p className="text-sm text-gray-600">All prices</p>
                  </button>

                  <button
                    onClick={() => handleBulkUpdate(10)}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-center"
                  >
                    <div className="inline-flex p-3 bg-blue-100 rounded-full mb-3">
                      <FiTrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-bold text-gray-800">Naik 10%</p>
                    <p className="text-sm text-gray-600">All prices</p>
                  </button>

                  <button
                    onClick={() => handleBulkUpdate(-5)}
                    className="p-4 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors text-center"
                  >
                    <div className="inline-flex p-3 bg-amber-100 rounded-full mb-3">
                      <FiTrendingUp className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="font-bold text-gray-800">Turun 5%</p>
                    <p className="text-sm text-gray-600">All prices</p>
                  </button>

                  <button className="p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-center">
                    <div className="inline-flex p-3 bg-purple-100 rounded-full mb-3">
                      <FiRefreshCw className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="font-bold text-gray-800">Sync Market</p>
                    <p className="text-sm text-gray-600">Update from industry</p>
                  </button>
                </div>
              </Card>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Harga Beli dari Warga */}
              <div className="lg:col-span-2">
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">🛒 Harga Beli dari Warga</h3>
                    <span className="text-sm text-gray-500">Per kg</span>
                  </div>

                  <div className="space-y-4">
                    {hargaSampah.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${item.color}`}>
                            <span className="text-xl">{item.icon}</span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">Harga saat ini</p>
                          </div>
                        </div>
                        
                        {editingId === item.id ? (
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
                              <input
                                type="number"
                                value={editForm.pricePerKg}
                                onChange={(e) => setEditForm(prev => ({ ...prev, pricePerKg: e.target.value }))}
                                className="pl-10 pr-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-32"
                              />
                            </div>
                            <button
                              onClick={handleSavePrice}
                              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              <FiSave className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-800">
                                Rp {item.pricePerKg.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500">per kg</p>
                            </div>
                            <button
                              onClick={() => handleEditPrice(item)}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                              title="Edit Harga"
                            >
                              <FiEdit className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Market Comparison */}
              <div>
                <Card>
                  <h3 className="text-lg font-bold text-gray-800 mb-6">📈 Market Comparison</h3>
                  
                  <div className="space-y-4">
                    {hargaIndustri.map((harga, index) => {
                      const hargaBeli = hargaSampah.find(s => s.name === harga.jenis)?.pricePerKg || 0;
                      const margin = calculateProfitMargin(hargaBeli, harga.hargaMin);
                      
                      return (
                        <div key={index} className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-gray-800">{harga.jenis}</p>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              harga.permintaan === 'Tinggi' ? 'bg-green-100 text-green-800' :
                              harga.permintaan === 'Sedang' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {harga.permintaan}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Beli dari Warga</span>
                              <span className="font-medium text-gray-800">
                                Rp {hargaBeli.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Jual ke Industri</span>
                              <span className="font-medium text-green-600">
                                Rp {harga.hargaMin.toLocaleString()} - {harga.hargaMax.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-2">
                              <span className="text-sm font-medium text-gray-800">Margin Min</span>
                              <span className={`font-bold ${
                                parseFloat(margin) > 20 ? 'text-green-600' :
                                parseFloat(margin) > 10 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {margin}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>

            {/* Price History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">📋 Riwayat Perubahan Harga</h3>
                  <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-2">
                    <FiClock className="w-4 h-4" /> {/* Ganti FiHistory dengan FiClock */}
                    Export History
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Tanggal</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Jenis Sampah</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Harga Lama</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Harga Baru</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Perubahan</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item) => {
                        const perubahan = ((item.hargaBaru - item.hargaLama) / item.hargaLama) * 100;
                        const isNaik = perubahan > 0;
                        
                        return (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">{item.tanggal}</td>
                            <td className="py-3 px-4">
                              <span className="font-medium text-gray-800">{item.jenis}</span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              Rp {item.hargaLama.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-bold text-gray-800">
                                Rp {item.hargaBaru.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                                isNaik 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {isNaik ? '↗' : '↘'} {Math.abs(perubahan).toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-gray-600">{item.admin}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>

            {/* Price Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <FiAlertCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="text-lg font-bold text-gray-800">⚠️ Price Alerts & Recommendations</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FiBarChart2 className="w-5 h-5 text-red-600" />
                      <p className="font-medium text-gray-800">Botol Kaca Margin Rendah</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Margin hanya 8.5%. Pertimbangkan naikkan harga jual atau turunkan harga beli.
                    </p>
                    <button className="mt-3 text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                      Adjust Price <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FiTrendingUp className="w-5 h-5 text-green-600" />
                      <p className="font-medium text-gray-800">Market Botol PET Naik</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Harga industri naik 15%. Rekomendasi naikkan harga beli 10% untuk stimulasi setoran.
                    </p>
                    <button className="mt-3 text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
                      Update Price <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Auto-Pricing */}
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
                      <FiDollarSign className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        🤖 Auto-Pricing System
                      </h3>
                      <p className="text-gray-600">
                        Aktifkan sistem penentuan harga otomatis berdasarkan harga pasar
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                      <span className="font-medium text-gray-800">Auto-Pricing</span>
                    </div>
                    <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                      Configure Rules
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
                © 2024 WasteGame Admin Dashboard - Manajemen Harga
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Last Updated: Today 11:30</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Prices Synced</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ManajemenHarga;