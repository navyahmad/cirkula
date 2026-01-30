import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeaderBankSampah from '../components/Layout/HeaderBankSampah';
import SidebarBankSampah from '../components/Layout/SidebarBankSampah';
import Card from '../components/UI/Card';
import { 
  bankSampahUsers, 
  wargaTerdaftar, 
  jenisSampah,
  dusunList 
} from '../data/dummyData';
import { 
  FiUser, 
  FiPackage, 
  FiDollarSign,
  FiCheck,
  FiX,
  FiInfo
} from 'react-icons/fi';

const InputSetoran = () => {
  const [user] = useState(bankSampahUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    wargaId: '',
    namaTamu: '',
    dusun: '',
    jenisSampahId: '',
    berat: '',
    isTamu: false
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastTransaction, setLastTransaction] = useState(null);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Jika pilih warga terdaftar, isi otomatis dusunnya
    if (name === 'wargaId' && value) {
      const selectedWarga = wargaTerdaftar.find(w => w.id === parseInt(value));
      if (selectedWarga) {
        setFormData(prev => ({
          ...prev,
          dusun: selectedWarga.dusun,
          isTamu: false
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi
    if (!formData.dusun || !formData.jenisSampahId || !formData.berat) {
      alert('Harap isi semua field yang wajib!');
      return;
    }

    // Hitung nilai
    const jenis = jenisSampah.find(j => j.id === parseInt(formData.jenisSampahId));
    const berat = parseFloat(formData.berat);
    const nilai = berat * jenis.pricePerKg;

    // Simpan transaksi (simulasi)
    const transaction = {
      id: Date.now(),
      tanggal: new Date().toLocaleString('id-ID'),
      nama: formData.isTamu ? formData.namaTamu : wargaTerdaftar.find(w => w.id === parseInt(formData.wargaId))?.name || 'Tamu',
      dusun: formData.dusun,
      jenis: jenis.name,
      berat: berat,
      nilai: nilai,
      status: 'completed'
    };

    setLastTransaction(transaction);
    setShowSuccessModal(true);

    // Reset form
    setFormData({
      wargaId: '',
      namaTamu: '',
      dusun: '',
      jenisSampahId: '',
      berat: '',
      isTamu: false
    });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/bank-sampah/riwayat');
  };

  const selectedJenis = jenisSampah.find(j => j.id === parseInt(formData.jenisSampahId));
  const berat = parseFloat(formData.berat) || 0;
  const total = selectedJenis ? berat * selectedJenis.pricePerKg : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Modal */}
      {showSuccessModal && lastTransaction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                  <FiCheck className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Setoran Berhasil!
                </h3>
                <p className="text-gray-600">
                  Data setoran sampah telah berhasil disimpan.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nama</span>
                    <span className="font-bold text-gray-800">{lastTransaction.nama}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dusun</span>
                    <span className="font-bold text-gray-800">{lastTransaction.dusun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jenis Sampah</span>
                    <span className="font-bold text-gray-800">{lastTransaction.jenis}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Berat</span>
                    <span className="font-bold text-gray-800">{lastTransaction.berat} kg</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="font-bold text-gray-800">Total Nilai</span>
                    <span className="text-xl font-bold text-green-600">
                      Rp {lastTransaction.nilai.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Input Lagi
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Lihat Riwayat
                </button>
              </div>
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
                      📝 Input Setoran Sampah
                    </h1>
                    <p className="text-blue-100">
                      Catat setoran sampah dari warga terdaftar atau tamu
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Total Warga Terdaftar</p>
                      <p className="text-2xl sm:text-3xl font-bold">{wargaTerdaftar.length}</p>
                      <p className="text-xs opacity-90 mt-1">
                        Aktif bulan ini
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Input */}
              <div className="lg:col-span-2">
                <Card>
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-bold text-gray-800 mb-6">
                      📋 Form Setoran Sampah
                    </h3>

                    {/* Pilihan Jenis Penyetor */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Jenis Penyetor
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, isTamu: false, namaTamu: '', wargaId: '' }))}
                          className={`p-4 border rounded-xl text-center transition-all ${
                            !formData.isTamu
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="p-3 bg-blue-100 rounded-full inline-flex mb-3">
                            <FiUser className="w-6 h-6 text-blue-600" />
                          </div>
                          <p className="font-bold text-gray-800">Warga Terdaftar</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Sudah punya akun di sistem
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, isTamu: true, wargaId: '' }))}
                          className={`p-4 border rounded-xl text-center transition-all ${
                            formData.isTamu
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="p-3 bg-green-100 rounded-full inline-flex mb-3">
                            <FiUser className="w-6 h-6 text-green-600" />
                          </div>
                          <p className="font-bold text-gray-800">Tamu / Tidak Terdaftar</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Belum punya akun di sistem
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Field Nama */}
                    {!formData.isTamu ? (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pilih Warga Terdaftar *
                        </label>
                        <select
                          name="wargaId"
                          value={formData.wargaId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">-- Pilih Nama Warga --</option>
                          {wargaTerdaftar.map((warga) => (
                            <option key={warga.id} value={warga.id}>
                              {warga.name} - {warga.dusun} (Saldo: Rp {warga.saldo.toLocaleString()})
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Tamu *
                        </label>
                        <input
                          type="text"
                          name="namaTamu"
                          value={formData.namaTamu}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>
                    )}

                    {/* Field Dusun */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dusun *
                      </label>
                      <select
                        name="dusun"
                        value={formData.dusun}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">-- Pilih Dusun --</option>
                        {dusunList.map((dusun) => (
                          <option key={dusun.id} value={dusun.name}>
                            {dusun.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Jenis Sampah & Berat */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Jenis Sampah *
                        </label>
                        <select
                          name="jenisSampahId"
                          value={formData.jenisSampahId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">-- Pilih Jenis Sampah --</option>
                          {jenisSampah.map((jenis) => (
                            <option key={jenis.id} value={jenis.id}>
                              {jenis.name} (Rp {jenis.pricePerKg.toLocaleString()}/kg)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Berat (kg) *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="berat"
                            value={formData.berat}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            step="0.1"
                            min="0.1"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
                            required
                          />
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            {/* Ganti dengan icon lain atau emoji */}
                            <span className="text-gray-400 text-lg">⚖️</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview Kalkulasi */}
                    {selectedJenis && berat > 0 && (
                      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3 mb-3">
                          <FiDollarSign className="w-5 h-5 text-blue-600" />
                          <h4 className="font-bold text-gray-800">Preview Nilai Setoran</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Harga per kg</p>
                            <p className="font-bold text-gray-800">
                              Rp {selectedJenis.pricePerKg.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Berat</p>
                            <p className="font-bold text-gray-800">{berat} kg</p>
                          </div>
                          <div className="col-span-2 border-t border-blue-200 pt-3">
                            <div className="flex justify-between items-center">
                              <p className="font-bold text-gray-800">Total Nilai</p>
                              <p className="text-2xl font-bold text-green-600">
                                Rp {total.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => navigate('/bank-sampah/dashboard')}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiCheck className="w-5 h-5" />
                        Simpan Setoran
                      </button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Side Information */}
              <div className="space-y-6">
                {/* Info Box */}
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiInfo className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">💡 Panduan Input</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">Warga Terdaftar</p>
                        <p className="text-sm text-gray-600">Tabungan otomatis bertambah di akun warga</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">Tamu</p>
                        <p className="text-sm text-gray-600">Bayar tunai langsung, tetap masuk leaderboard dusun</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">Pastikan Timbangan Akurat</p>
                        <p className="text-sm text-gray-600">Gunakan timbangan digital yang terkalibrasi</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">Verifikasi Data</p>
                        <p className="text-sm text-gray-600">Pastikan semua data sudah benar sebelum simpan</p>
                      </div>
                    </li>
                  </ul>
                </Card>

                {/* Daftar Harga */}
                <Card>
                  <h3 className="font-bold text-gray-800 mb-4">💰 Harga Sampah per kg</h3>
                  <div className="space-y-3">
                    {jenisSampah.map((jenis) => (
                      <div key={jenis.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${jenis.color}`}>
                            <span className="text-sm">{jenis.icon}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{jenis.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            Rp {jenis.pricePerKg.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <h3 className="font-bold text-gray-800 mb-4">📊 Statistik Hari Ini</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Transaksi</span>
                      <span className="font-bold text-gray-800">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Berat</span>
                      <span className="font-bold text-gray-800">11.5 kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Nilai</span>
                      <span className="font-bold text-green-600">Rp 38,650</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rata-rata per Transaksi</span>
                      <span className="font-bold text-gray-800">3.8 kg</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2024 Bank Sampah Desa Kepulungan - Input Setoran Sampah
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Operator: {user.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Siap Input</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default InputSetoran;