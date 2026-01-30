import { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderBankSampah from '../components/Layout/HeaderBankSampah';
import SidebarBankSampah from '../components/Layout/SidebarBankSampah';
import Card from '../components/UI/Card';
import { 
  bankSampahUsers, 
  stokSampah, 
  hargaJualIndustri,
  penjualanIndustri
} from '../data/dummyData';
import { 
  FiPackage, 
  FiDollarSign, 
  FiTrendingUp, 
  FiFilter,
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiBarChart2,
  FiAlertCircle
} from 'react-icons/fi';
import { MdInventory, MdLocalShipping } from 'react-icons/md';

const KelolaStok = () => {
  const [user] = useState(bankSampahUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showJualModal, setShowJualModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [jualForm, setJualForm] = useState({
    berat: '',
    harga: '',
    pembeli: ''
  });

  const handleLogout = () => {
    window.location.href = '/';
  };

  const totalStok = stokSampah.reduce((sum, item) => sum + item.berat, 0);
  const totalNilai = stokSampah.reduce((sum, item) => sum + item.nilai, 0);
  const totalPenjualan = penjualanIndustri.reduce((sum, item) => sum + item.total, 0);

  const handleOpenJualModal = (item) => {
    setSelectedItem(item);
    const hargaIndustri = hargaJualIndustri.find(h => h.jenis === item.jenis);
    setJualForm({
      berat: item.berat.toString(),
      harga: hargaIndustri ? hargaIndustri.hargaMin.toString() : '',
      pembeli: ''
    });
    setShowJualModal(true);
  };

  const handleJualSubmit = (e) => {
    e.preventDefault();
    // Simulasi penjualan
    alert(`Penjualan ${jualForm.berat} kg ${selectedItem.jenis} ke ${jualForm.pembeli} berhasil!`);
    setShowJualModal(false);
    setSelectedItem(null);
    setJualForm({ berat: '', harga: '', pembeli: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal Jual ke Industri */}
      {showJualModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MdLocalShipping className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Jual ke Industri</h2>
                </div>
                <button
                  onClick={() => setShowJualModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiMinus className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleJualSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenis Sampah
                    </label>
                    <input
                      type="text"
                      value={selectedItem.jenis}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Berat Tersedia
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={jualForm.berat}
                        onChange={(e) => setJualForm(prev => ({ ...prev, berat: e.target.value }))}
                        max={selectedItem.berat}
                        step="0.1"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <span className="text-gray-500">kg</span>
                      <span className="text-sm text-gray-500">
                        (max: {selectedItem.berat} kg)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harga Jual per kg (Rp)
                    </label>
                    <input
                      type="number"
                      value={jualForm.harga}
                      onChange={(e) => setJualForm(prev => ({ ...prev, harga: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Pembeli/Industri
                    </label>
                    <input
                      type="text"
                      value={jualForm.pembeli}
                      onChange={(e) => setJualForm(prev => ({ ...prev, pembeli: e.target.value }))}
                      placeholder="Contoh: PT Daur Ulang Plastik"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Preview Total */}
                  {jualForm.berat && jualForm.harga && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Estimasi Pendapatan</p>
                      <p className="text-2xl font-bold text-green-600">
                        Rp {(parseFloat(jualForm.berat) * parseFloat(jualForm.harga)).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {jualForm.berat} kg × Rp {parseFloat(jualForm.harga).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowJualModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Simpan Penjualan
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

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
                      📦 Kelola Stok Sampah
                    </h1>
                    <p className="text-blue-100">
                      Pantau dan kelola stok sampah untuk dijual ke industri
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Total Nilai Stok</p>
                      <p className="text-2xl sm:text-3xl font-bold">Rp {totalNilai.toLocaleString()}</p>
                      <p className="text-xs opacity-90 mt-1">
                        {totalStok} kg total berat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MdInventory className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Stok</p>
                      <p className="text-xl font-bold text-gray-800">{totalStok} kg</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiDollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Nilai Stok</p>
                      <p className="text-xl font-bold text-gray-800">Rp {totalNilai.toLocaleString()}</p>
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
                      <p className="text-sm text-gray-600">Total Penjualan</p>
                      <p className="text-xl font-bold text-gray-800">Rp {totalPenjualan.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <FiShoppingCart className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Jenis Sampah</p>
                      <p className="text-xl font-bold text-gray-800">{stokSampah.length}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Stok Sampah Detail */}
              <div className="lg:col-span-2">
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">📊 Detail Stok Sampah</h3>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 flex items-center gap-2">
                      <FiFilter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">Jenis Sampah</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">Berat</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">Harga Beli</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">Nilai</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stokSampah.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <FiPackage className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">{item.jenis}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-gray-800">{item.berat} kg</div>
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(item.berat / totalStok) * 100}%` }}
                                  className="h-full bg-blue-500"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              Rp {item.hargaPerKg.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-green-600">
                                Rp {item.nilai.toLocaleString()}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleOpenJualModal(item)}
                                className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                              >
                                <MdLocalShipping className="w-3 h-3" />
                                Jual
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Harga Pasar */}
              <div>
                <Card>
                  <h3 className="text-lg font-bold text-gray-800 mb-6">📈 Harga Pasar Industri</h3>
                  
                  <div className="space-y-4">
                    {hargaJualIndustri.map((harga, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
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
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Harga per kg</p>
                            <p className="text-lg font-bold text-green-600">
                              Rp {harga.hargaMin.toLocaleString()} - Rp {harga.hargaMax.toLocaleString()}
                            </p>
                          </div>
                          <FiBarChart2 className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Penjualan Terbaru */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">🔄 Riwayat Penjualan ke Industri</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <FiPlus className="w-4 h-4" />
                    Penjualan Baru
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Tanggal</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Pembeli</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Jenis</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Berat</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Harga</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {penjualanIndustri.map((penjualan) => (
                        <tr key={penjualan.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{penjualan.tanggal}</td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-800">{penjualan.pembeli}</div>
                          </td>
                          <td className="py-3 px-4">{penjualan.jenis}</td>
                          <td className="py-3 px-4">{penjualan.berat} kg</td>
                          <td className="py-3 px-4">
                            Rp {penjualan.harga.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-green-600">
                              Rp {penjualan.total.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              {penjualan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>

            {/* Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <FiAlertCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="text-lg font-bold text-gray-800">⚠️ Rekomendasi Penjualan</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <MdLocalShipping className="w-5 h-5 text-green-600" />
                      <p className="font-bold text-gray-800">Botol PET</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Permintaan tinggi. Harga mencapai Rp 4.200/kg. Rekomendasi jual 80% stok.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FiTrendingUp className="w-5 h-5 text-amber-600" />
                      <p className="font-bold text-gray-800">Kardus/Kertas</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Harga stabil Rp 2.800/kg. Tunggu 1 minggu untuk kenaikan harga.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FiAlertCircle className="w-5 h-5 text-red-600" />
                      <p className="font-bold text-gray-800">Botol Kaca</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Permintaan rendah. Pertimbangkan donasi ke pengrajin lokal.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2024 Bank Sampah Desa Kepulungan - Kelola Stok Sampah
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Stok: {totalStok} kg (Rp {totalNilai.toLocaleString()})</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Aktif</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default KelolaStok;