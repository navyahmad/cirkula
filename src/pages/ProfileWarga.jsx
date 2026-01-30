import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/UI/Card';
import { dummyUsers, achievements } from '../data/dummyData';
import { FiUser, FiMapPin, FiPhone, FiMail, FiEdit, FiShield, FiBell, FiChevronRight, FiFileText, FiBarChart2, FiSettings, FiAward, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiGlobe, FiStar } from 'react-icons/fi';

const ProfileWarga = () => {
  const [user, setUser] = useState(dummyUsers.warga);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
  });

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleSave = () => {
    setUser(prev => ({ ...prev, ...formData }));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const completedAchievements = achievements.filter(a => a.achieved);

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
                      <FiUser className="w-6 h-6 sm:w-8 sm:h-8" />
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        Profil Saya
                      </h1>
                    </div>
                    <p className="text-green-100">
                      Kelola informasi dan preferensi akun Anda
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
                    >
                      <FiEdit />
                      {isEditing ? 'Batal Edit' : 'Edit Profil'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Info Card */}
                <Card>
                  <div className="flex items-center gap-2 mb-6">
                    <FiFileText className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-800">Informasi Pribadi</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-start gap-4">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${user.avatarColor}`}>
                        <FiUser className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                            <button
                              onClick={handleSave}
                              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Simpan Perubahan
                            </button>
                          </div>
                        ) : (
                          <>
                            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                            <div className="mt-4 space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                  <FiMail className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Email</p>
                                  <p className="font-medium text-gray-800">{user.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                  <FiPhone className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Telepon</p>
                                  <p className="font-medium text-gray-800">{user.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                  <FiMapPin className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Dusun</p>
                                  <p className="font-medium text-gray-800">{user.dusun}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                  <FiUser className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Bergabung</p>
                                  <p className="font-medium text-gray-800">{user.joinDate}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Account Stats */}
                <Card>
                  <div className="flex items-center gap-2 mb-6">
                    <FiBarChart2 className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-800">Statistik Akun</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-800">{user.totalSampahKg} kg</p>
                      <p className="text-sm text-gray-600">Total Sampah</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-800">{user.totalTransaksi}</p>
                      <p className="text-sm text-gray-600">Transaksi</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-800">Rp {user.saldo.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Tabungan</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-800">{completedAchievements.length}</p>
                      <p className="text-sm text-gray-600">Pencapaian</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column - Settings & Achievements */}
              <div className="space-y-6">
                {/* Account Settings */}
                <Card>
                  <div className="flex items-center gap-2 mb-6">
                    <FiSettings className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-800">Pengaturan Akun</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FiShield className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Keamanan</p>
                          <p className="text-sm text-gray-600">Ubah password</p>
                        </div>
                      </div>
                      <FiChevronRight className="text-gray-400 w-5 h-5" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FiBell className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Notifikasi</p>
                          <p className="text-sm text-gray-600">Pengaturan notifikasi</p>
                        </div>
                      </div>
                      <FiChevronRight className="text-gray-400 w-5 h-5" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <FiMapPin className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Lokasi</p>
                          <p className="text-sm text-gray-600">Ubah dusun</p>
                        </div>
                      </div>
                      <FiChevronRight className="text-gray-400 w-5 h-5" />
                    </button>
                  </div>
                </Card>

                {/* Achievements */}
                <Card>
                  <div className="flex items-center gap-2 mb-6">
                    <FiAward className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-800">Pencapaian</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {completedAchievements.slice(0, 3).map((achievement) => {
                      const iconMap = {
                        "🌱": FiTrendingUp,
                        "🏆": FiAward,
                        "🦸": FiShield,
                        "🌍": FiGlobe,
                        "👑": FiStar,
                      };
                      const IconComponent = iconMap[achievement.icon] || FiAward;
                      return (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <IconComponent className="w-6 h-6 text-green-600" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{achievement.name}</p>
                          <p className="text-sm text-gray-600">{achievement.desc}</p>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                  
                  {completedAchievements.length > 3 && (
                    <button className="w-full mt-4 text-center text-green-600 hover:text-green-700 font-medium">
                      Lihat semua ({completedAchievements.length} pencapaian)
                    </button>
                  )}
                </Card>

                {/* Account Status */}
                <Card>
                  <div className="flex items-center gap-2 mb-4">
                    <FiCheckCircle className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-800">Status Akun</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Verifikasi Email</span>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Terverifikasi
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Verifikasi Telepon</span>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Terverifikasi
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status Akun</span>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Aktif
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Level</span>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {user.level}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Card className="border-2 border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <FiAlertCircle className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-bold text-gray-800 text-red-600">Zona Bahaya</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Tindakan ini tidak dapat dibatalkan. Akun Anda akan dinonaktifkan secara permanen.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                    Hapus Akun
                  </button>
                  <button className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                    Nonaktifkan Sementara
                  </button>
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
                  ID: {user.id.toString().padStart(8, '0')}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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

export default ProfileWarga;