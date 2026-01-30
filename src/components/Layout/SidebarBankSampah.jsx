import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { 
  FiHome, 
  FiPackage, 
  FiDatabase, 
  FiClock,
  FiDollarSign,
  FiLogOut,
  FiUser,
  FiTrendingUp
} from 'react-icons/fi';
import { MdRecycling, MdInventory } from 'react-icons/md';

const SidebarBankSampah = ({ user, onLogout }) => {
  const menuItems = [
    { path: '/bank-sampah/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/bank-sampah/input-setoran', icon: FiPackage, label: 'Input Setoran' },
    { path: '/bank-sampah/kelola-stok', icon: MdInventory, label: 'Kelola Stok' },
    { path: '/bank-sampah/riwayat', icon: FiClock, label: 'Riwayat' },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col w-full lg:w-64 bg-white border-r border-gray-100 min-h-screen overflow-y-auto"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <img 
                                              src={logo} 
                                                alt="WasteGame Logo" 
                                                className="w-10 h-10 sm:w-10 sm:h-10 object-contain" 
                                              />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Bank Sampah</h2>
            <p className="text-xs text-gray-500">Desa Kepulungan</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${user?.avatarColor || 'bg-blue-500'}`}>
            <FiUser className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 truncate">{user?.name}</p>
            <p className="text-sm text-gray-500 truncate">Operator Bank Sampah</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Aktif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/bank-sampah/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Stats */}
      <div className="p-4 border-t border-gray-100">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Stok</span>
            <span className="text-lg font-bold text-gray-800 truncate">145.5 kg</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Kas</span>
            <span className="text-lg font-bold text-blue-600 truncate">
              Rp 1.250.000
            </span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FiLogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default SidebarBankSampah;