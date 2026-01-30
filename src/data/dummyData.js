export const dusunList = [
  { id: 1, name: "Dusun Krajan", color: "bg-green-500" },
  { id: 2, name: "Dusun Sumberejo", color: "bg-blue-500" },
  { id: 3, name: "Dusun Ngemplak", color: "bg-purple-500" },
  { id: 4, name: "Dusun Tambakrejo", color: "bg-yellow-500" },
  { id: 5, name: "Dusun Kedungbanteng", color: "bg-red-500" },
];

// Note: Icons are now React Icons components, not emoji strings
// Use icon names: "recycle", "refresh", "package", "can", "bottle"
export const jenisSampah = [
  { id: 1, name: "Botol PET", pricePerKg: 3500, icon: "recycle", color: "bg-blue-100 text-blue-800" },
  { id: 2, name: "Plastik Keras", pricePerKg: 2500, icon: "refresh", color: "bg-red-100 text-red-800" },
  { id: 3, name: "Kardus/Kertas", pricePerKg: 2000, icon: "package", color: "bg-amber-100 text-amber-800" },
  { id: 4, name: "Kaleng/Besi", pricePerKg: 4000, icon: "can", color: "bg-gray-100 text-gray-800" },
  { id: 5, name: "Botol Kaca", pricePerKg: 1500, icon: "bottle", color: "bg-emerald-100 text-emerald-800" },
];

export const dummyUsers = {
  warga: {
    id: 1,
    name: "Budi Santoso",
    email: "budi@example.com",
    dusun: "Dusun Krajan",
    phone: "081234567890",
    saldo: 125000,
    joinDate: "2024-01-15",
    level: "Eco Warrior",
    levelProgress: 75,
    totalSampahKg: 42.5,
    totalTransaksi: 12,
    avatarColor: "bg-green-500",
  },
  bankSampah: {
    id: 2,
    name: "Bank Sampah Kepulungan",
    role: "bank_sampah",
  },
  admin: {
    id: 3,
    name: "Admin Utama",
    role: "admin",
  },
};

export const leaderboardData = [
  { rank: 1, dusun: "Dusun Krajan", totalKg: 245.5, transaksi: 45, color: "bg-green-500" },
  { rank: 2, dusun: "Dusun Sumberejo", totalKg: 198.2, transaksi: 38, color: "bg-blue-500" },
  { rank: 3, dusun: "Dusun Ngemplak", totalKg: 176.8, transaksi: 32, color: "bg-purple-500" },
  { rank: 4, dusun: "Dusun Tambakrejo", totalKg: 154.3, transaksi: 28, color: "bg-yellow-500" },
  { rank: 5, dusun: "Dusun Kedungbanteng", totalKg: 132.7, transaksi: 24, color: "bg-red-500" },
];

export const transactionsHistory = [
  { id: 1, date: "2024-06-15", jenis: "Botol PET", berat: 3.5, nilai: 12250, status: "completed" },
  { id: 2, date: "2024-06-12", jenis: "Kardus/Kertas", berat: 5.2, nilai: 10400, status: "completed" },
  { id: 3, date: "2024-06-08", jenis: "Plastik Keras", berat: 2.8, nilai: 7000, status: "completed" },
  { id: 4, date: "2024-06-05", jenis: "Kaleng/Besi", berat: 4.1, nilai: 16400, status: "completed" },
  { id: 5, date: "2024-06-01", jenis: "Botol Kaca", berat: 6.0, nilai: 9000, status: "completed" },
  { id: 6, date: "2024-05-28", jenis: "Botol PET", berat: 2.5, nilai: 8750, status: "completed" },
];

export const achievements = [
  { id: 1, name: "Pemula Hijau", desc: "Setor sampah pertama kali", achieved: true, icon: "🌱" },
  { id: 2, name: "Pengumpul Aktif", desc: "10 kali transaksi", achieved: true, icon: "🏆" },
  { id: 3, name: "Pahlawan Plastik", desc: "Kumpulkan 20kg plastik", achieved: false, icon: "🦸" },
  { id: 4, name: "Penyelamat Lingkungan", desc: "Total 50kg sampah", achieved: false, icon: "🌍" },
  { id: 5, name: "Dusun Juara", desc: "Dusunmu ranking 1", achieved: true, icon: "👑" },
];

// Tambahkan ke file dummyData.js yang sudah ada

export const bankSampahUsers = {
  id: 2,
  name: "Bank Sampah Kepulungan",
  role: "bank_sampah",
  lokasi: "Jl. Raya Kepulungan No. 123",
  telepon: "(0343) 123456",
  whatsapp: "081234567890",
  email: "banksampah@kepulungan.desa.id",
  totalTransaksi: 245,
  totalSampahKg: 1250.5,
  saldoKas: 1250000,
  avatarColor: "bg-blue-500"
};

export const wargaTerdaftar = [
  { id: 1, name: "Budi Santoso", dusun: "Dusun Krajan", saldo: 125000 },
  { id: 2, name: "Siti Aminah", dusun: "Dusun Sumberejo", saldo: 85000 },
  { id: 3, name: "Ahmad Fauzi", dusun: "Dusun Ngemplak", saldo: 156000 },
  { id: 4, name: "Maya Sari", dusun: "Dusun Tambakrejo", saldo: 72000 },
  { id: 5, name: "Joko Widodo", dusun: "Dusun Kedungbanteng", saldo: 189000 },
  { id: 6, name: "Rina Dewi", dusun: "Dusun Krajan", saldo: 94000 },
  { id: 7, name: "Hendro Prasetyo", dusun: "Dusun Sumberejo", saldo: 113000 },
  { id: 8, name: "Lisa Permata", dusun: "Dusun Ngemplak", saldo: 67000 },
];

export const stokSampah = [
  { id: 1, jenis: "Botol PET", berat: 45.5, hargaPerKg: 3500, nilai: 159250 },
  { id: 2, jenis: "Plastik Keras", berat: 32.8, hargaPerKg: 2500, nilai: 82000 },
  { id: 3, jenis: "Kardus/Kertas", berat: 28.3, hargaPerKg: 2000, nilai: 56600 },
  { id: 4, jenis: "Kaleng/Besi", berat: 15.2, hargaPerKg: 4000, nilai: 60800 },
  { id: 5, jenis: "Botol Kaca", berat: 23.7, hargaPerKg: 1500, nilai: 35550 },
];

export const riwayatSetoran = [
  { id: 1, tanggal: "2024-06-15 09:30", nama: "Budi Santoso", dusun: "Dusun Krajan", jenis: "Botol PET", berat: 3.5, nilai: 12250, status: "completed" },
  { id: 2, tanggal: "2024-06-15 10:15", nama: "Siti Aminah", dusun: "Dusun Sumberejo", jenis: "Kardus/Kertas", berat: 5.2, nilai: 10400, status: "completed" },
  { id: 3, tanggal: "2024-06-15 11:00", nama: "Tamu (Tidak Terdaftar)", dusun: "Dusun Krajan", jenis: "Plastik Keras", berat: 2.8, nilai: 7000, status: "completed" },
  { id: 4, tanggal: "2024-06-14 14:30", nama: "Ahmad Fauzi", dusun: "Dusun Ngemplak", jenis: "Kaleng/Besi", berat: 4.1, nilai: 16400, status: "completed" },
  { id: 5, tanggal: "2024-06-14 16:00", nama: "Maya Sari", dusun: "Dusun Tambakrejo", jenis: "Botol Kaca", berat: 6.0, nilai: 9000, status: "completed" },
];

export const penjualanIndustri = [
  { id: 1, tanggal: "2024-06-10", pembeli: "PT Daur Ulang Plastik", jenis: "Botol PET", berat: 40.0, harga: 3800, total: 152000, status: "completed" },
  { id: 2, tanggal: "2024-06-05", pembeli: "CV Kertas Bersih", jenis: "Kardus/Kertas", berat: 25.0, harga: 2200, total: 55000, status: "completed" },
  { id: 3, tanggal: "2024-05-28", pembeli: "Industri Logam Sejahtera", jenis: "Kaleng/Besi", berat: 12.0, harga: 4200, total: 50400, status: "completed" },
];

export const hargaJualIndustri = [
  { jenis: "Botol PET", hargaMin: 3800, hargaMax: 4200, permintaan: "Tinggi" },
  { jenis: "Plastik Keras", hargaMin: 2700, hargaMax: 3200, permintaan: "Sedang" },
  { jenis: "Kardus/Kertas", hargaMin: 2200, hargaMax: 2800, permintaan: "Tinggi" },
  { jenis: "Kaleng/Besi", hargaMin: 4200, hargaMax: 4800, permintaan: "Sedang" },
  { jenis: "Botol Kaca", hargaMin: 1700, hargaMax: 2200, permintaan: "Rendah" },
];

// Tambahkan ke file dummyData.js yang sudah ada

export const adminUsers = {
  id: 3,
  name: "Admin Utama",
  role: "admin",
  email: "admin@ecosave.desa.id",
  phone: "081234567890",
  joinDate: "2024-01-01",
  avatarColor: "bg-purple-500"
};

export const allUsers = [
  ...wargaTerdaftar,
  bankSampahUsers,
  adminUsers
];

export const sistemLogs = [
  { id: 1, timestamp: "2024-06-15 09:15:23", user: "Bank Sampah Kepulungan", action: "Input setoran", description: "Setoran dari Budi Santoso - 3.5kg Botol PET", status: "success" },
  { id: 2, timestamp: "2024-06-15 09:30:45", user: "Budi Santoso", action: "Login", description: "Masuk ke sistem sebagai warga", status: "success" },
  { id: 3, timestamp: "2024-06-15 10:00:12", user: "Sistem", action: "Update harga", description: "Harga Botol PET diupdate ke Rp 3,500/kg", status: "info" },
  { id: 4, timestamp: "2024-06-15 10:30:56", user: "Bank Sampah Kepulungan", action: "Penjualan industri", description: "Jual 40kg Botol PET ke PT Daur Ulang", status: "success" },
  { id: 5, timestamp: "2024-06-15 11:15:34", user: "Admin", action: "Reset leaderboard", description: "Reset leaderboard bulanan", status: "warning" },
];

export const eprData = [
  { id: 1, perusahaan: "PT Aqua Golden Mississippi", jenisKemasan: "Botol PET 600ml", berat: 45.5, hargaData: 1500000, status: "terjual", tanggal: "2024-06-10" },
  { id: 2, perusahaan: "PT Indofood CBP Sukses Makmur", jenisKemasan: "Kemasan Mie Instan", berat: 32.8, hargaData: 1200000, status: "tersedia", tanggal: "2024-06-12" },
  { id: 3, perusahaan: "PT Unilever Indonesia", jenisKemasan: "Botol Plastik Shampoo", berat: 28.3, hargaData: 950000, status: "negosiasi", tanggal: "2024-06-14" },
  { id: 4, perusahaan: "PT Mayora Indah", jenisKemasan: "Kemasan Biskuit", berat: 15.2, hargaData: 600000, status: "terjual", tanggal: "2024-06-08" },
  { id: 5, perusahaan: "PT Wings Surya", jenisKemasan: "Botol Sabun Cair", berat: 23.7, hargaData: 850000, status: "tersedia", tanggal: "2024-06-13" },
];

export const analitikData = {
  totalWarga: 125,
  wargaAktif: 89,
  totalSampahKg: 2450.5,
  rataSetoranPerHari: 45.3,
  totalTransaksi: 456,
  pendapatanBulanIni: 12500000,
  pengeluaranBulanIni: 8500000,
  profitBulanIni: 4000000,
  pertumbuhanWarga: 12.5,
  pertumbuhanSampah: 8.3,
};

export const questData = [
  { id: 1, nama: "Kumpulkan 10kg Plastik", deskripsi: "Kumpulkan 10kg sampah plastik dalam 1 minggu", reward: "Bonus 10% tabungan", status: "aktif", peserta: 45 },
  { id: 2, nama: "Dusun Juara", deskripsi: "Dusun dengan peningkatan tertinggi bulan ini", reward: "Bonus 15% untuk semua warga", status: "aktif", peserta: 5 },
  { id: 3, nama: "Setor Rutin", deskripsi: "Setor sampah 3 kali dalam seminggu", reward: "Badge 'Aktivis Hijau'", status: "selesai", peserta: 67 },
  { id: 4, nama: "Ajakan Warga Baru", deskripsi: "Ajak 3 warga baru untuk mendaftar", reward: "Bonus Rp 50,000", status: "aktif", peserta: 23 },
];