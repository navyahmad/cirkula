import { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderAdmin from '../components/Layout/HeaderAdmin';
import SidebarAdmin from '../components/Layout/SidebarAdmin';
import Card from '../components/UI/Card';
import { 
  adminUsers, 
  allUsers,
  wargaTerdaftar,
  bankSampahUsers
} from '../data/dummyData';
import { 
  FiUsers, 
  FiUser, 
  FiSearch, 
  FiFilter,
  FiEdit,
  FiTrash2,
  FiCheck,
  FiX,
  FiUserPlus,
  FiShield,
  FiMail,
  FiPhone
} from 'react-icons/fi';

const ManajemenUser = () => {
  const [user] = useState(adminUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('warga');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'active'
  });

  const handleLogout = () => {
    window.location.href = '/';
  };

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email || '',
      phone: user.phone || '',
      role: user.role,
      status: 'active'
    });
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = () => {
    // Simulasi update user
    alert(`User ${editForm.name} berhasil diupdate!`);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    // Simulasi delete user
    alert(`User ${selectedUser.name} berhasil dihapus!`);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const wargaStats = {
    total: wargaTerdaftar.length,
    active: wargaTerdaftar.filter(w => w.saldo > 0).length,
    newThisMonth: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FiEdit className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telepon
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="warga">Warga</option>
                    <option value="bank_sampah">Bank Sampah</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={editForm.status === 'active'}
                        onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                        className="text-purple-600"
                      />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={editForm.status === 'inactive'}
                        onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                        className="text-purple-600"
                      />
                      <span className="text-sm text-gray-700">Inactive</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="suspended"
                        checked={editForm.status === 'suspended'}
                        onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                        className="text-purple-600"
                      />
                      <span className="text-sm text-gray-700">Suspended</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-md w-full"
          >
            <div className="p-6 text-center">
              <div className="inline-flex p-4 bg-red-100 rounded-full mb-4">
                <FiTrash2 className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Hapus User?
              </h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus user <span className="font-bold">{selectedUser.name}</span>? Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Hapus User
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
                      👥 Manajemen User
                    </h1>
                    <p className="text-purple-100">
                      Kelola semua user warga, bank sampah, dan admin
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Total Users</p>
                      <p className="text-2xl sm:text-3xl font-bold">{allUsers.length}</p>
                      <p className="text-xs opacity-90 mt-1">
                        {wargaStats.active} aktif
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* User Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiUsers className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Warga</p>
                      <p className="text-xl font-bold text-gray-800">{wargaStats.total}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Warga Aktif</p>
                      <p className="text-xl font-bold text-gray-800">{wargaStats.active}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <FiUserPlus className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Baru Bulan Ini</p>
                      <p className="text-xl font-bold text-gray-800">{wargaStats.newThisMonth}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FiShield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bank Sampah</p>
                      <p className="text-xl font-bold text-gray-800">1</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters & Search */}
            <Card className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 lg:border-none">
                  <button
                    onClick={() => setActiveTab('warga')}
                    className={`px-4 py-3 font-medium border-b-2 lg:border-b-0 lg:rounded-lg transition-colors ${
                      activeTab === 'warga'
                        ? 'border-purple-500 text-purple-600 lg:bg-purple-50'
                        : 'border-transparent text-gray-600 hover:text-gray-800 lg:hover:bg-gray-50'
                    }`}
                  >
                    Warga
                  </button>
                  <button
                    onClick={() => setActiveTab('bank_sampah')}
                    className={`px-4 py-3 font-medium border-b-2 lg:border-b-0 lg:rounded-lg transition-colors ${
                      activeTab === 'bank_sampah'
                        ? 'border-purple-500 text-purple-600 lg:bg-purple-50'
                        : 'border-transparent text-gray-600 hover:text-gray-800 lg:hover:bg-gray-50'
                    }`}
                  >
                    Bank Sampah
                  </button>
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-4 py-3 font-medium border-b-2 lg:border-b-0 lg:rounded-lg transition-colors ${
                      activeTab === 'admin'
                        ? 'border-purple-500 text-purple-600 lg:bg-purple-50'
                        : 'border-transparent text-gray-600 hover:text-gray-800 lg:hover:bg-gray-50'
                    }`}
                  >
                    Admin
                  </button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari user..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="relative">
                      <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="all">Semua Role</option>
                        <option value="warga">Warga</option>
                        <option value="bank_sampah">Bank Sampah</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
                      <FiUserPlus />
                      <span className="hidden sm:inline">Tambah User</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Users Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">User</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Role</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Kontak</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Bergabung</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers
                      .filter(user => activeTab === 'all' || user.role === activeTab)
                      .map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                user.role === 'warga' ? 'bg-green-500' :
                                user.role === 'bank_sampah' ? 'bg-blue-500' :
                                'bg-purple-500'
                              }`}>
                                <FiUser className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{user.name}</p>
                                {user.dusun && (
                                  <p className="text-sm text-gray-500">{user.dusun}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.role === 'warga' ? 'bg-green-100 text-green-800' :
                              user.role === 'bank_sampah' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {user.role === 'bank_sampah' ? 'Bank Sampah' : user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              {user.email && (
                                <div className="flex items-center gap-2">
                                  <FiMail className="w-3 h-3 text-gray-400" />
                                  <span className="text-sm text-gray-600">{user.email}</span>
                                </div>
                              )}
                              {user.phone && (
                                <div className="flex items-center gap-2">
                                  <FiPhone className="w-3 h-3 text-gray-400" />
                                  <span className="text-sm text-gray-600">{user.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {user.joinDate || '2024-01-15'}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Edit"
                              >
                                <FiEdit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Delete"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                    {/* Empty State */}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-12 text-center">
                          <div className="text-gray-400 text-4xl mb-4">👤</div>
                          <p className="text-gray-600">Tidak ada user yang ditemukan</p>
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
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-lg font-bold text-gray-800">{filteredUsers.length}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Warga Aktif</p>
                    <p className="text-lg font-bold text-purple-600">
                      {filteredUsers.filter(u => u.role === 'warga').length}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Bank Sampah</p>
                    <p className="text-lg font-bold text-blue-600">
                      {filteredUsers.filter(u => u.role === 'bank_sampah').length}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* User Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Card>
                <h3 className="text-lg font-bold text-gray-800 mb-6">⚙️ User Management Actions</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors text-center">
                    <div className="inline-flex p-3 bg-blue-100 rounded-full mb-3">
                      <FiUserPlus className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-800">Tambah User Manual</p>
                    <p className="text-sm text-gray-600 mt-1">Buat akun baru secara manual</p>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors text-center">
                    <div className="inline-flex p-3 bg-green-100 rounded-full mb-3">
                      <FiUsers className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-medium text-gray-800">Import Data Warga</p>
                    <p className="text-sm text-gray-600 mt-1">Upload Excel/CSV data warga</p>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors text-center">
                    <div className="inline-flex p-3 bg-amber-100 rounded-full mb-3">
                      <FiShield className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="font-medium text-gray-800">Reset Password</p>
                    <p className="text-sm text-gray-600 mt-1">Reset password untuk user terpilih</p>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors text-center">
                    <div className="inline-flex p-3 bg-purple-100 rounded-full mb-3">
                      <FiUser className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="font-medium text-gray-800">Bulk Actions</p>
                    <p className="text-sm text-gray-600 mt-1">Aksi massal untuk multiple users</p>
                  </button>
                </div>
              </Card>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2024 WasteGame Admin Dashboard - Manajemen User
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">
                  {filteredUsers.length} users ditampilkan
                </span>
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

export default ManajemenUser;