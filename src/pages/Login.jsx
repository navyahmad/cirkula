import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaBuilding, FaUser } from 'react-icons/fa';
import { MdRecycling } from 'react-icons/md';
import logo from "../assets/images/logo.png";


const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleLogin = (role) => {
    setSelectedRole(role);
    setTimeout(() => {
      if (role === 'warga') {
        navigate('/warga/dashboard');
      } else if (role === 'bankSampah') {
        navigate('/bank-sampah/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    }, 500);
  };

  const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick }) => {
    const baseClasses = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2';
    
    const variants = {
      primary: 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-200',
      secondary: 'bg-white hover:bg-gray-50 text-green-700 border border-green-200',
      outline: 'bg-transparent hover:bg-green-50 text-green-600 border border-green-300',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-5 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    };

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-green-200 to-emerald-200 rounded-xl">
              <img 
        src={logo} 
        alt="WasteGame Logo" 
        className="w-10 h-10 sm:w-10 sm:h-10 object-contain" 
      />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">WasteGame</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Sistem Gamifikasi Pengelolaan Sampah Digital untuk Desa Kepulungan.
            Tukarkan sampah menjadi tabungan, wujudkan lingkungan bersih & sehat!
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {/* Warga Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className={`relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                selectedRole === 'warga'
                  ? 'border-green-500 bg-gradient-to-b from-green-50 to-white shadow-2xl'
                  : 'border-green-200 bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="text-center">
                <div className="inline-flex p-3 sm:p-4 bg-green-100 rounded-full mb-4 sm:mb-6">
                  <FaUsers className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  Warga Desa
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Setor sampah, dapatkan tabungan, dan naikkan peringkat dusunmu!
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 text-left">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Tabungan sampah digital</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-left">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Bayar BPJS dari tabungan</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-left">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Kompetisi dusun sehat</span>
                  </div>
                </div>

                <Button
                  variant={selectedRole === 'warga' ? 'primary' : 'outline'}
                  size="md"
                  className="w-full text-sm sm:text-base"
                  onClick={() => handleLogin('warga')}
                >
                  {selectedRole === 'warga' ? 'Masuk sebagai Budi' : 'Masuk sebagai Warga'}
                </Button>
              </div>
            </motion.div>

            {/* Bank Sampah Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className={`relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                selectedRole === 'bankSampah'
                  ? 'border-blue-500 bg-gradient-to-b from-blue-50 to-white shadow-2xl'
                  : 'border-blue-200 bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="text-center">
                <div className="inline-flex p-3 sm:p-4 bg-blue-100 rounded-full mb-4 sm:mb-6">
                  <FaBuilding className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  Bank Sampah
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Kelola transaksi warga, input setoran, dan jual sampah ke industri.
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 text-left">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Input setoran warga</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-left">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Kelola stok sampah</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-left">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Penjualan ke industri</span>
                  </div>
                </div>

                <Button
                  variant={selectedRole === 'bankSampah' ? 'primary' : 'outline'}
                  size="md"
                  className="w-full text-sm sm:text-base"
                  onClick={() => handleLogin('bankSampah')}
                >
                  {selectedRole === 'bankSampah' ? 'Masuk sebagai Bank Sampah' : 'Masuk sebagai Bank Sampah'}
                </Button>
              </div>
            </motion.div>

            {/* Admin Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className={`relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 sm:col-span-2 lg:col-span-1 ${
                selectedRole === 'admin'
                  ? 'border-purple-500 bg-gradient-to-b from-purple-50 to-white shadow-2xl'
                  : 'border-purple-200 bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="text-center">
                <div className="inline-flex p-3 sm:p-4 bg-purple-100 rounded-full mb-4 sm:mb-6">
                  <FaUser className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  Admin Platform
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Pantau sistem, kelola data, dan analisis performa pengelolaan sampah.
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 text-left">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Monitoring sistem</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-left">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Analisis data EPR</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-left">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Manajemen pengguna</span>
                  </div>
                </div>

                <Button
                  variant={selectedRole === 'admin' ? 'primary' : 'outline'}
                  size="md"
                  className="w-full text-sm sm:text-base"
                  onClick={() => handleLogin('admin')}
                >
                  {selectedRole === 'admin' ? 'Masuk sebagai Admin' : 'Masuk sebagai Admin'}
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 sm:mt-10 lg:mt-12 text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">245.5 kg</p>
                <p className="text-xs sm:text-sm text-gray-600">Sampah terkumpul bulan ini</p>
              </div>
              <div className="hidden sm:block h-12 w-px bg-gray-200"></div>
              <div className="w-full sm:w-auto h-px sm:h-12 sm:w-px bg-gray-200 sm:bg-gray-200"></div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">Rp 859,250</p>
                <p className="text-xs sm:text-sm text-gray-600">Tabungan warga aktif</p>
              </div>
              <div className="hidden sm:block h-12 w-px bg-gray-200"></div>
              <div className="w-full sm:w-auto h-px sm:h-12 sm:w-px bg-gray-200 sm:bg-gray-200"></div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">5 Dusun</p>
                <p className="text-xs sm:text-sm text-gray-600">Berpartisipasi aktif</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;