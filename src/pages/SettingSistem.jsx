import { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderAdmin from '../components/Layout/HeaderAdmin';
import SidebarAdmin from '../components/Layout/SidebarAdmin';
import Card from '../components/UI/Card';
import { adminUsers } from '../data/dummyData';
import { 
  FiSettings, 
  FiSave, 
  FiRefreshCw,
  FiDatabase,
  FiShield,
  FiBell,
  FiUsers,
  FiDollarSign,
  FiBarChart2,
  FiLock,
  FiCloud,
  FiAlertCircle
} from 'react-icons/fi';
import { MdRecycling, MdAnalytics, MdSecurity } from 'react-icons/md';

const SettingSistem = () => {
  const [user] = useState(adminUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    // Gamification Settings
    leaderboardMetric: 'berat', // berat atau frekuensi
    leaderboardReset: 'monthly', // monthly, weekly, quarterly
    leaderboardReward: true,
    
    // Financial Settings
    bpjsConversionRate: 0.95, // 95% nilai tabungan untuk BPJS
    minWithdrawal: 50000,
    autoPriceUpdate: true,
    
    // System Settings
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: 'daily', // daily, weekly, monthly
    dataRetention: 365, // days
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30, // minutes
    loginAttempts: 5,
    ipWhitelist: false,
  });

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleSaveSettings = () => {
    alert('Pengaturan sistem berhasil disimpan!');
    // In real app, would send to backend
  };

  const handleResetSettings = () => {
    if (window.confirm('Apakah Anda yakin ingin reset semua pengaturan ke default?')) {
      setSettings({
        leaderboardMetric: 'berat',
        leaderboardReset: 'monthly',
        leaderboardReward: true,
        bpjsConversionRate: 0.95,
        minWithdrawal: 50000,
        autoPriceUpdate: true,
        maintenanceMode: false,
        autoBackup: true,
        backupFrequency: 'daily',
        dataRetention: 365,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        adminAlerts: true,
        twoFactorAuth: false,
        sessionTimeout: 30,
        loginAttempts: 5,
        ipWhitelist: false,
      });
      alert('Pengaturan berhasil direset ke default!');
    }
  };

  const handleSystemBackup = () => {
    alert('Backup sistem sedang diproses...');
    // Simulate backup process
    setTimeout(() => {
      alert('Backup berhasil! File tersimpan di server.');
    }, 2000);
  };

  const handleSystemUpdate = () => {
    if (window.confirm('Sistem akan diupdate. Pastikan semua data sudah di-backup. Lanjutkan?')) {
      alert('Sistem update sedang diproses...');
      // Simulate update
      setTimeout(() => {
        alert('Update berhasil! Sistem akan restart.');
      }, 3000);
    }
  };

  const handleClearCache = () => {
    alert('Cache berhasil dibersihkan!');
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
                      ⚙️ Setting Sistem
                    </h1>
                    <p className="text-purple-100">
                      Konfigurasi sistem dan pengaturan platform WasteGame
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">System Version</p>
                      <p className="text-2xl sm:text-3xl font-bold">2.1.0</p>
                      <p className="text-xs opacity-90 mt-1">
                        Latest Stable
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
              <Card>
                <h3 className="text-lg font-bold text-gray-800 mb-6">⚡ Quick System Actions</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={handleSystemBackup}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-center"
                  >
                    <div className="inline-flex p-3 bg-blue-100 rounded-full mb-3">
                      <FiDatabase className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-bold text-gray-800">Backup System</p>
                    <p className="text-sm text-gray-600">Create full backup</p>
                  </button>

                  <button
                    onClick={handleSystemUpdate}
                    className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-center"
                  >
                    <div className="inline-flex p-3 bg-green-100 rounded-full mb-3">
                      <FiRefreshCw className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-bold text-gray-800">System Update</p>
                    <p className="text-sm text-gray-600">Check for updates</p>
                  </button>

                  <button
                    onClick={handleClearCache}
                    className="p-4 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors text-center"
                  >
                    <div className="inline-flex p-3 bg-amber-100 rounded-full mb-3">
                      <FiCloud className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="font-bold text-gray-800">Clear Cache</p>
                    <p className="text-sm text-gray-600">Optimize performance</p>
                  </button>

                  <button
                    onClick={handleResetSettings}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-center"
                  >
                    <div className="inline-flex p-3 bg-red-100 rounded-full mb-3">
                      <FiSettings className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="font-bold text-gray-800">Reset Settings</p>
                    <p className="text-sm text-gray-600">Back to defaults</p>
                  </button>
                </div>
              </Card>
            </motion.div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Gamification Settings */}
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <FiUsers className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-800">🎮 Gamification Settings</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Leaderboard Metric
                    </label>
                    <select
                      value={settings.leaderboardMetric}
                      onChange={(e) => setSettings(prev => ({ ...prev, leaderboardMetric: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="berat">Total Berat Sampah (kg)</option>
                      <option value="frekuensi">Frekuensi Transaksi</option>
                      <option value="nilai">Total Nilai Tabungan</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Metrik yang digunakan untuk ranking leaderboard dusun
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reset Period
                    </label>
                    <select
                      value={settings.leaderboardReset}
                      onChange={(e) => setSettings(prev => ({ ...prev, leaderboardReset: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="weekly">Mingguan</option>
                      <option value="monthly">Bulanan</option>
                      <option value="quarterly">Triwulan</option>
                      <option value="yearly">Tahunan</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Periode reset leaderboard untuk kompetisi berkelanjutan
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Leaderboard Rewards</p>
                      <p className="text-sm text-gray-600">Aktifkan reward untuk pemenang</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.leaderboardReward}
                        onChange={(e) => setSettings(prev => ({ ...prev, leaderboardReward: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </Card>

              {/* Financial Settings */}
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <FiDollarSign className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-800">💰 Financial Settings</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      BPJS Conversion Rate
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0.5"
                          max="1"
                          step="0.05"
                          value={settings.bpjsConversionRate}
                          onChange={(e) => setSettings(prev => ({ ...prev, bpjsConversionRate: parseFloat(e.target.value) }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="font-bold text-green-600">
                        {(settings.bpjsConversionRate * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Nilai konversi tabungan ke pembayaran BPJS
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Withdrawal
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
                      <input
                        type="number"
                        value={settings.minWithdrawal}
                        onChange={(e) => setSettings(prev => ({ ...prev, minWithdrawal: parseInt(e.target.value) }))}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum penarikan tabungan oleh warga
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Auto Price Update</p>
                      <p className="text-sm text-gray-600">Update harga otomatis berdasarkan pasar</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoPriceUpdate}
                        onChange={(e) => setSettings(prev => ({ ...prev, autoPriceUpdate: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </Card>

              {/* System Settings */}
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <MdSecurity className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-800">🔧 System Settings</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Maintenance Mode</p>
                      <p className="text-sm text-gray-600">Mode perbaikan untuk admin saja</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Auto Backup</p>
                      <p className="text-sm text-gray-600">Backup otomatis database</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoBackup}
                        onChange={(e) => setSettings(prev => ({ ...prev, autoBackup: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Backup Frequency
                    </label>
                    <select
                      value={settings.backupFrequency}
                      onChange={(e) => setSettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="daily">Harian</option>
                      <option value="weekly">Mingguan</option>
                      <option value="monthly">Bulanan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Retention (days)
                    </label>
                    <input
                      type="number"
                      value={settings.dataRetention}
                      onChange={(e) => setSettings(prev => ({ ...prev, dataRetention: parseInt(e.target.value) }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Lama penyimpanan data log dan riwayat
                    </p>
                  </div>
                </div>
              </Card>

              {/* Notification Settings */}
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <FiBell className="w-6 h-6 text-amber-600" />
                  <h3 className="text-lg font-bold text-gray-800">🔔 Notification Settings</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Email Notifications</p>
                      <p className="text-sm text-gray-600">Kirim notifikasi via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Kirim notifikasi via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) => setSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Push Notifications</p>
                      <p className="text-sm text-gray-600">Notifikasi di aplikasi/web</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) => setSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Admin Alerts</p>
                      <p className="text-sm text-gray-600">Alert untuk admin saja</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.adminAlerts}
                        onChange={(e) => setSettings(prev => ({ ...prev, adminAlerts: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <FiLock className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-bold text-gray-800">🔐 Security Settings</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Wajib untuk admin</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => setSettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        value={settings.loginAttempts}
                        onChange={(e) => setSettings(prev => ({ ...prev, loginAttempts: parseInt(e.target.value) }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">IP Whitelist</p>
                        <p className="text-sm text-gray-600">Restrict access to specific IPs</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.ipWhitelist}
                          onChange={(e) => setSettings(prev => ({ ...prev, ipWhitelist: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <MdAnalytics className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        📊 System Status & Diagnostics
                      </h3>
                      <p className="text-gray-600">
                        Pantau kesehatan sistem dan lakukan diagnostik
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600">All Systems Normal</span>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleSaveSettings}
                        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                      >
                        <FiSave className="w-4 h-4" />
                        Save All Settings
                      </button>
                      <button
                        onClick={handleSystemUpdate}
                        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg border border-purple-300 hover:bg-purple-50 transition-colors"
                      >
                        Run Diagnostics
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2024 WasteGame Admin Dashboard - System Settings
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Last Config Save: Today 13:20</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Config Valid</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SettingSistem;