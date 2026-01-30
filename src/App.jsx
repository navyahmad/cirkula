import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import DashboardWarga from './pages/DashboardWarga';
import HistoryWarga from './pages/HistoryWarga';
import ProfileWarga from './pages/ProfileWarga';
import SaldoWarga from './pages/SaldoWarga';
import LeaderboardWarga from './pages/LeaderboardWarga';
import BankSampahDashboard from './pages/BankSampahDashboard';
import InputSetoran from './pages/InputSetoran';
import KelolaStok from './pages/KelolaStok';
import RiwayatBankSampah from './pages/RiwayatBankSampah';
import AdminDashboard from './pages/AdminDashboard';
import ManajemenUser from './pages/ManajemenUser';
import ManajemenHarga from './pages/ManajemenHarga';
import LaporanAnalitik from './pages/LaporanAnalitik';
import EPRManagement from './pages/EPRManagement';
import SettingSistem from './pages/SettingSistem';
import './App.css';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* Warga Routes */}
          <Route path="/warga" element={<DashboardWarga />} />
          <Route path="/warga/dashboard" element={<DashboardWarga />} />
          <Route path="/warga/saldo" element={<SaldoWarga />} />
          <Route path="/warga/leaderboard" element={<LeaderboardWarga />} />
          <Route path="/warga/riwayat" element={<HistoryWarga />} />
          <Route path="/warga/profile" element={<ProfileWarga />} />
          
          {/* Bank Sampah Routes */}
          <Route path="/bank-sampah" element={<BankSampahDashboard />} />
          <Route path="/bank-sampah/dashboard" element={<BankSampahDashboard />} />
          <Route path="/bank-sampah/input-setoran" element={<InputSetoran />} />
          <Route path="/bank-sampah/kelola-stok" element={<KelolaStok />} />
          <Route path="/bank-sampah/riwayat" element={<RiwayatBankSampah />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manajemen-user" element={<ManajemenUser />} />
          <Route path="/admin/manajemen-harga" element={<ManajemenHarga />} />
          <Route path="/admin/laporan-analitik" element={<LaporanAnalitik />} />
          <Route path="/admin/epr-management" element={<EPRManagement />} />
          <Route path="/admin/setting-sistem" element={<SettingSistem />} />
          
          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;