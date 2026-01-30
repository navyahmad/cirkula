import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/UI/Card';
import { dummyUsers } from '../data/dummyData';
import { 
  FiDollarSign, 
  FiCreditCard, 
  FiTrendingUp, 
  FiDownload, 
  FiCheck,
  FiX,
  FiCalendar,
  FiShield,
  FiInfo,
  FiChevronRight
} from 'react-icons/fi';
import { MdHealthAndSafety, MdAccountBalanceWallet } from 'react-icons/md';

const SaldoWarga = () => {
  const [user, setUser] = useState(dummyUsers.warga);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBPJSModal, setShowBPJSModal] = useState(false);
  const [bpjsAmount, setBpjsAmount] = useState(42000);
  const [bpjsPeriod, setBpjsPeriod] = useState('1');
  const [transactionStep, setTransactionStep] = useState(0); // 0: pilih, 1: konfirmasi, 2: sukses
  
  const handleLogout = () => {
    window.location.href = '/';
  };

  const transactions = [
    { id: 1, date: '15 Juni 2024', type: 'Setor Sampah', amount: 12250, status: 'completed' },
    { id: 2, date: '12 Juni 2024', type: 'Setor Sampah', amount: 10400, status: 'completed' },
    { id: 3, date: '08 Juni 2024', type: 'Tarik Tunai', amount: -50000, status: 'completed' },
    { id: 4, date: '05 Juni 2024', type: 'Setor Sampah', amount: 16400, status: 'completed' },
    { id: 5, date: '01 Juni 2024', type: 'Bayar BPJS', amount: -42000, status: 'completed' },
  ];

  const bpjsPlans = [
    { id: 1, months: 1, amount: 42000, label: '1 Bulan', popular: false },
    { id: 2, months: 3, amount: 126000, label: '3 Bulan', popular: true },
    { id: 3, months: 6, amount: 252000, label: '6 Bulan', popular: false },
    { id: 4, months: 12, amount: 504000, label: '1 Tahun', popular: false },
  ];

  const handleBPJSPayment = () => {
    setShowBPJSModal(true);
    setTransactionStep(0);
  };

  const handleSelectPlan = (plan) => {
    setBpjsAmount(plan.amount);
    setBpjsPeriod(plan.months.toString());
    setTransactionStep(1);
  };

  const handleConfirmPayment = () => {
    if (user.saldo >= bpjsAmount) {
      // Simulasi pengurangan saldo
      setUser(prev => ({
        ...prev,
        saldo: prev.saldo - bpjsAmount
      }));
      
      // Tambahkan ke riwayat transaksi
      transactions.unshift({
        id: transactions.length + 1,
        date: new Date().toLocaleDateString('id-ID'),
        type: 'Bayar BPJS',
        amount: -bpjsAmount,
        status: 'completed'
      });
      
      setTransactionStep(2);
    } else {
      alert('Saldo tidak cukup!');
    }
  };

  const handleCloseModal = () => {
    setShowBPJSModal(false);
    setTransactionStep(0);
  };

  const handleTarikTunai = () => {
    const amount = parseInt(prompt('Masukkan jumlah yang ingin ditarik (Rp):'));
    if (amount && amount > 0 && amount <= user.saldo) {
      setUser(prev => ({
        ...prev,
        saldo: prev.saldo - amount
      }));
      
      transactions.unshift({
        id: transactions.length + 1,
        date: new Date().toLocaleDateString('id-ID'),
        type: 'Tarik Tunai',
        amount: -amount,
        status: 'completed'
      });
      
      alert(`Penarikan Rp ${amount.toLocaleString()} berhasil!`);
    } else if (amount > user.saldo) {
      alert('Saldo tidak cukup!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal Pembayaran BPJS */}
      {showBPJSModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header Modal */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MdHealthAndSafety className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {transactionStep === 0 && 'Pilih Paket BPJS'}
                    {transactionStep === 1 && 'Konfirmasi Pembayaran'}
                    {transactionStep === 2 && 'Pembayaran Berhasil'}
                  </h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content Modal */}
            <div className="p-6">
              {transactionStep === 0 && (
                <>
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                      Pilih periode pembayaran BPJS yang diinginkan. Pembayaran akan dipotong dari saldo tabungan Anda.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {bpjsPlans.map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => handleSelectPlan(plan)}
                          className={`p-4 border rounded-xl text-center transition-all ${
                            bpjsPeriod === plan.months.toString()
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                          }`}
                        >
                          {plan.popular && (
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                              Paling Hemat
                            </span>
                          )}
                          <p className="font-bold text-gray-800 text-lg">{plan.label}</p>
                          <p className="text-2xl font-bold text-blue-600 my-2">
                            Rp {plan.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Rp {(plan.amount / plan.months).toLocaleString()}/bulan
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <FiInfo className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Perhatian!</p>
                        <p className="text-sm text-gray-600">
                          Pastikan saldo Anda cukup untuk melakukan pembayaran. Pembayaran akan diproses otomatis ke nomor BPJS terdaftar.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {transactionStep === 1 && (
                <>
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                      <p className="text-sm text-gray-600 mb-2">Detail Pembayaran</p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Periode</span>
                          <span className="font-bold text-gray-800">{bpjsPeriod} Bulan</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Nominal</span>
                          <span className="text-2xl font-bold text-blue-600">
                            Rp {bpjsAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Saldo Saat Ini</span>
                          <span className="font-bold text-gray-800">
                            Rp {user.saldo.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                          <span className="font-bold text-gray-800">Saldo Setelah Bayar</span>
                          <span className={`text-xl font-bold ${
                            user.saldo - bpjsAmount >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            Rp {(user.saldo - bpjsAmount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                        <FiShield className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Transaksi Aman</p>
                          <p className="text-sm text-gray-600">
                            Data Anda dilindungi dengan enkripsi SSL 256-bit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {transactionStep === 2 && (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                      <FiCheck className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Pembayaran Berhasil!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Pembayaran BPJS untuk {bpjsPeriod} bulan telah berhasil diproses.
                    </p>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nominal</span>
                          <span className="font-bold text-gray-800">
                            Rp {bpjsAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Kode Transaksi</span>
                          <span className="font-bold text-gray-800">BPJS{Date.now().toString().slice(-8)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tanggal</span>
                          <span className="font-bold text-gray-800">
                            {new Date().toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saldo Baru</span>
                          <span className="font-bold text-green-600">
                            Rp {user.saldo.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Modal Actions */}
              <div className="flex gap-3">
                {transactionStep === 0 && (
                  <>
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => setTransactionStep(1)}
                      disabled={!bpjsPeriod}
                      className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-colors ${
                        bpjsPeriod
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Lanjutkan
                    </button>
                  </>
                )}

                {transactionStep === 1 && (
                  <>
                    <button
                      onClick={() => setTransactionStep(0)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={handleConfirmPayment}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Konfirmasi & Bayar
                    </button>
                  </>
                )}

                {transactionStep === 2 && (
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Selesai
                  </button>
                )}
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
                      💰 Tabungan Sampah
                    </h1>
                    <p className="text-green-100">
                      Kelola tabungan dari hasil setor sampah
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Total Saldo</p>
                      <p className="text-2xl sm:text-3xl font-bold">Rp {user.saldo.toLocaleString()}</p>
                      <p className="text-xs opacity-90 mt-1">
                        Cukup untuk BPJS 3 bulan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BPJS Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <MdHealthAndSafety className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        💊 Manfaat Bayar BPJS dari Tabungan
                      </h3>
                      <p className="text-gray-600">
                        Hemat biaya kesehatan dengan tabungan sampah Anda
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleBPJSPayment}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Bayar BPJS Sekarang
                  </button>
                </div>
              </Card>
            </motion.div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card>
                  <button
                    onClick={handleTarikTunai}
                    className="w-full text-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="inline-flex p-3 bg-green-100 rounded-full mb-3">
                      <FiDollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Tarik Tunai</h3>
                    <p className="text-sm text-gray-600">Ambil uang di Bank Sampah</p>
                    <div className="mt-2 text-xs text-gray-500">
                      Minimal Rp 10.000
                    </div>
                  </button>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card>
                  <button
                    onClick={handleBPJSPayment}
                    className="w-full text-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="inline-flex p-3 bg-blue-100 rounded-full mb-3">
                      <FiCreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Bayar BPJS</h3>
                    <p className="text-sm text-gray-600">Konversi tabungan ke BPJS</p>
                    <div className="mt-2 text-xs text-gray-500">
                      Mulai Rp 42.000/bulan
                    </div>
                  </button>
                </Card>
              </motion.div>

              <Card>
                <div className="text-center p-4">
                  <div className="inline-flex p-3 bg-purple-100 rounded-full mb-3">
                    <FiTrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Riwayat</h3>
                  <p className="text-sm text-gray-600">Lihat semua transaksi</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {transactions.length} transaksi
                  </div>
                </div>
              </Card>

              <Card>
                <div className="text-center p-4">
                  <div className="inline-flex p-3 bg-amber-100 rounded-full mb-3">
                    <FiDownload className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Laporan</h3>
                  <p className="text-sm text-gray-600">Download ringkasan</p>
                  <div className="mt-2 text-xs text-gray-500">
                    PDF & Excel
                  </div>
                </div>
              </Card>
            </div>

            {/* BPJS Payment Plans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card>
                <h3 className="text-lg font-bold text-gray-800 mb-6">📅 Paket Pembayaran BPJS</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {bpjsPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-6 border rounded-xl text-center ${
                        plan.popular
                          ? 'border-blue-500 bg-blue-50 relative'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                            REKOMENDASI
                          </span>
                        </div>
                      )}
                      <p className="font-bold text-gray-800 text-lg mb-2">{plan.label}</p>
                      <p className="text-3xl font-bold text-blue-600 mb-4">
                        Rp {plan.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Rp {(plan.amount / plan.months).toLocaleString()}/bulan
                      </p>
                      <button
                        onClick={() => {
                          handleSelectPlan(plan);
                          handleBPJSPayment();
                        }}
                        className={`w-full py-2 font-semibold rounded-lg transition-colors ${
                          plan.popular
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        Pilih Paket
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Card className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">📋 Riwayat Transaksi Terbaru</h3>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                    Lihat Semua <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Tanggal</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Jenis</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Jumlah</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.slice(0, 5).map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <FiCalendar className="w-4 h-4 text-gray-400" />
                              <span>{transaction.date}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {transaction.type === 'Bayar BPJS' ? (
                                <MdHealthAndSafety className="w-4 h-4 text-blue-500" />
                              ) : transaction.type === 'Tarik Tunai' ? (
                                <FiDollarSign className="w-4 h-4 text-green-500" />
                              ) : (
                                <MdAccountBalanceWallet className="w-4 h-4 text-green-500" />
                              )}
                              <span>{transaction.type}</span>
                            </div>
                          </td>
                          <td className={`py-3 px-4 font-bold ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}Rp {Math.abs(transaction.amount).toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Selesai
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Cara Kerja Tabungan</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Setor sampah ke Bank Sampah</p>
                        <p className="text-sm text-gray-600">Bawa sampah non-organik ke lokasi bank sampah</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Petugas input setoran</p>
                        <p className="text-sm text-gray-600">Petugas akan menimbang dan input ke sistem</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Saldo otomatis bertambah</p>
                        <p className="text-sm text-gray-600">Tabungan langsung masuk ke akun Anda</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        4
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Bayar BPJS atau tarik tunai</p>
                        <p className="text-sm text-gray-600">Gunakan saldo untuk kebutuhan kesehatan atau tarik tunai</p>
                      </div>
                    </li>
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">📍 Lokasi & Kontak</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-2">Bank Sampah Desa Kepulungan</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Jl. Raya Kepulungan No. 123, Desa Kepulungan, Kec. Gempol, Kab. Pasuruan
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Telepon</p>
                          <p className="font-medium text-gray-800">(0343) 123456</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">WhatsApp</p>
                          <p className="font-medium text-gray-800">0812-3456-7890</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-2">Jam Operasional</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Senin - Jumat</span>
                          <span className="font-medium text-gray-800">08:00 - 16:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Sabtu</span>
                          <span className="font-medium text-gray-800">08:00 - 14:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Minggu</span>
                          <span className="font-medium text-gray-800 text-red-600">Libur</span>
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
                <span className="text-sm text-gray-500">Saldo: Rp {user.saldo.toLocaleString()}</span>
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

export default SaldoWarga;