import { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderAdmin from '../components/Layout/HeaderAdmin';
import SidebarAdmin from '../components/Layout/SidebarAdmin';
import Card from '../components/UI/Card';
import { 
  adminUsers, 
  eprData,
  riwayatSetoran
} from '../data/dummyData';
import { 
  FiDatabase, 
  FiTrendingUp, 
  FiDollarSign,
  FiPackage,
  FiFilter,
  FiSearch,
  FiEdit,
  FiCheck,
  FiX,
  FiDownload,
  FiBarChart2,
  FiMail,
  FiChevronRight
} from 'react-icons/fi';
import { MdRecycling, MdBusiness } from 'react-icons/md';

const EPRManagement = () => {
  const [user] = useState(adminUsers);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [eprItems, setEprItems] = useState(eprData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [selectedEpr, setSelectedEpr] = useState(null);
  const [negotiationForm, setNegotiationForm] = useState({
    harga: '',
    kontak: '',
    catatan: ''
  });

  const handleLogout = () => {
    window.location.href = '/';
  };

  const filteredEpr = eprItems.filter(item => {
    const matchesSearch = item.perusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.jenisKemasan.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Analisis data setoran untuk EPR
  const eprAnalysis = riwayatSetoran.reduce((acc, transaksi) => {
    // Simple mapping for demo (in reality would need more complex mapping)
    let brand = 'Other';
    if (transaksi.jenis.includes('Botol')) brand = 'Aqua/Le Minerale';
    if (transaksi.jenis.includes('Kemasan')) brand = 'Indofood/Unilever';
    if (transaksi.jenis.includes('Sachet')) brand = 'Wings/Mayora';
    
    if (!acc[brand]) {
      acc[brand] = { berat: 0, transaksi: 0, nilai: 0 };
    }
    
    acc[brand].berat += transaksi.berat;
    acc[brand].transaksi += 1;
    acc[brand].nilai += transaksi.nilai;
    
    return acc;
  }, {});

  const totalBeratEpr = eprItems.reduce((sum, item) => sum + item.berat, 0);
  const totalNilaiEpr = eprItems.reduce((sum, item) => sum + item.hargaData, 0);
  const terjualEpr = eprItems.filter(item => item.status === 'terjual').length;
  const availableEpr = eprItems.filter(item => item.status === 'tersedia').length;

  const handleOpenNegotiation = (item) => {
    setSelectedEpr(item);
    setNegotiationForm({
      harga: item.hargaData.toString(),
      kontak: '',
      catatan: `Data kemasan ${item.jenisKemasan} dari ${item.perusahaan}`
    });
    setShowNegotiationModal(true);
  };

  const handleNegotiate = () => {
    // Simulasi negosiasi
    alert(`Proposal negosiasi telah dikirim ke ${selectedEpr.perusahaan}!`);
    setShowNegotiationModal(false);
    
    // Update status
    setEprItems(prev => prev.map(item => 
      item.id === selectedEpr.id 
        ? { ...item, status: 'negosiasi' }
        : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Negotiation Modal */}
      {showNegotiationModal && selectedEpr && (
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
                    <MdBusiness className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Negosiasi EPR Data</h2>
                </div>
                <button
                  onClick={() => setShowNegotiationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <MdBusiness className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-gray-800">{selectedEpr.perusahaan}</h3>
                    <p className="text-sm text-gray-600">{selectedEpr.jenisKemasan}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Data Available</p>
                    <p className="font-bold text-gray-800">{selectedEpr.berat} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Price</p>
                    <p className="font-bold text-green-600">
                      Rp {selectedEpr.hargaData.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga Penawaran (Rp)
                  </label>
                  <input
                    type="number"
                    value={negotiationForm.harga}
                    onChange={(e) => setNegotiationForm(prev => ({ ...prev, harga: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kontak Perusahaan
                  </label>
                  <input
                    type="text"
                    value={negotiationForm.kontak}
                    onChange={(e) => setNegotiationForm(prev => ({ ...prev, kontak: e.target.value }))}
                    placeholder="Email atau nomor kontak"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan Negosiasi
                  </label>
                  <textarea
                    value={negotiationForm.catatan}
                    onChange={(e) => setNegotiationForm(prev => ({ ...prev, catatan: e.target.value }))}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowNegotiationModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleNegotiate}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kirim Proposal
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
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      📊 EPR Management
                    </h1>
                    <p className="text-blue-100">
                      Kelola Extended Producer Responsibility - Jual data sampah kemasan ke produsen
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-sm">Total Nilai EPR</p>
                      <p className="text-2xl sm:text-3xl font-bold">Rp {totalNilaiEpr.toLocaleString()}</p>
                      <p className="text-xs opacity-90 mt-1">
                        {terjualEpr} data terjual
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* EPR Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiDatabase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Data EPR</p>
                      <p className="text-xl font-bold text-gray-800">{eprItems.length}</p>
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
                      <p className="text-sm text-gray-600">Data Terjual</p>
                      <p className="text-xl font-bold text-gray-800">{terjualEpr}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <FiDollarSign className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Nilai</p>
                      <p className="text-xl font-bold text-gray-800">Rp {totalNilaiEpr.toLocaleString()}</p>
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
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-xl font-bold text-gray-800">
                        {((terjualEpr / eprItems.length) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* EPR Data Table */}
            <Card className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-bold text-gray-800">📦 EPR Data Inventory</h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari data EPR..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="relative">
                      <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">Semua Status</option>
                        <option value="tersedia">Tersedia</option>
                        <option value="terjual">Terjual</option>
                        <option value="negosiasi">Negosiasi</option>
                      </select>
                    </div>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                      <FiDownload />
                      <span>Export Data</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Perusahaan</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Jenis Kemasan</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Data Berat</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Harga Data</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Tanggal</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEpr.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <MdBusiness className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{item.perusahaan}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FiPackage className="w-4 h-4 text-blue-500" />
                            <span>{item.jenisKemasan}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-gray-800">{item.berat} kg</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-green-600">
                            Rp {item.hargaData.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === 'terjual' ? 'bg-green-100 text-green-800' :
                            item.status === 'tersedia' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {item.tanggal}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {item.status === 'tersedia' && (
                              <button
                                onClick={() => handleOpenNegotiation(item)}
                                className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Jual
                              </button>
                            )}
                            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                              <FiEdit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* EPR Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Brand Analysis */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">🏷️ Brand Waste Analysis</h3>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                    View Details <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(eprAnalysis).map(([brand, data]) => (
                    <div key={brand} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-bold text-gray-800">{brand}</p>
                        <span className="text-sm text-gray-600">{data.transaksi} transaksi</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Berat</span>
                          <span className="font-medium text-gray-800">{data.berat.toFixed(1)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Nilai Setoran</span>
                          <span className="font-medium text-green-600">
                            Rp {data.nilai.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500"
                            style={{ width: `${(data.berat / totalBeratEpr) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* EPR Value Proposition */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">💡 EPR Value Proposition</h3>
                  <div className="text-sm text-gray-500">Perusahaan</div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <MdRecycling className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-bold text-gray-800">Apa itu EPR Data?</p>
                        <p className="text-sm text-gray-600">
                          Data tentang kemasan plastik yang bisa dijual ke produsen
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                        <span>Produsen wajib tanggung jawab atas kemasan mereka</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                        <span>Data kami membantu mereka memenuhi regulasi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                        <span>Win-win solution: lingkungan bersih + revenue baru</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <FiBarChart2 className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-bold text-gray-800">Pricing Strategy</p>
                        <p className="text-sm text-gray-600">
                          Strategi harga berdasarkan jenis dan volume data
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Data Dasar</p>
                        <p className="font-bold text-gray-800">Rp 15.000/kg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Analisis Brand</p>
                        <p className="font-bold text-gray-800">+30%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Trend Analysis</p>
                        <p className="font-bold text-gray-800">+50%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Bulk Discount</p>
                        <p className="font-bold text-gray-800">-15%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* EPR Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h3 className="text-lg font-bold text-gray-800 mb-6">📧 EPR Marketing & Outreach</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <FiMail className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-bold text-gray-800">Email Campaign</p>
                        <p className="text-sm text-gray-600">Kirim proposal ke perusahaan target</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Target Companies</span>
                        <span className="font-medium text-gray-800">12 perusahaan</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Response Rate</span>
                        <span className="font-medium text-green-600">42%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Conversion Rate</span>
                        <span className="font-medium text-green-600">18%</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                      Launch Campaign
                    </button>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <FiTrendingUp className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-bold text-gray-800">EPR Report Generator</p>
                        <p className="text-sm text-gray-600">Buat laporan EPR otomatis</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Reports Generated</span>
                        <span className="font-medium text-gray-800">8 laporan</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Avg. Deal Size</span>
                        <span className="font-medium text-green-600">Rp 1.2M</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Success Rate</span>
                        <span className="font-medium text-green-600">75%</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                      Generate Report
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* EPR Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <MdBusiness className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        🚀 EPR Revenue Dashboard
                      </h3>
                      <p className="text-gray-600">
                        Pantau performa penjualan data EPR secara real-time
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                                        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors">
                      View Analytics
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                      Create EPR Package
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
                © 2026 Wastegame Admin Dashboard - EPR Management
              </p>
              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">
                  {filteredEpr.length} data EPR tersedia
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Revenue Stream Active</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default EPRManagement;