import { motion } from 'framer-motion';
import { FiBell, FiUser, FiMenu, FiActivity } from 'react-icons/fi';
import { MdRecycling } from 'react-icons/md';
import logo from '../../assets/images/logo.png';


const HeaderAdmin = ({ user, onMenuClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Menu */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <FiMenu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <img 
                                                  src={logo} 
                                                    alt="WasteGame Logo" 
                                                    className="w-10 h-10 sm:w-10 sm:h-10 object-contain" 
                                                  />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin WasteGame</h1>
                <p className="text-xs text-gray-500">Super Admin Dashboard</p>
              </div>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            {/* System Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
              <FiActivity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">All Systems Normal</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FiBell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-medium text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-500">Super Admin</p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user?.avatarColor || 'bg-purple-500'}`}>
                <FiUser className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;