import { motion } from 'framer-motion';
import { FiStar, FiAward, FiBarChart2, FiCircle, FiShield, FiTrendingUp } from 'react-icons/fi';
import { MdRecycling } from 'react-icons/md';
import Card from '../UI/Card';

const LevelProgress = ({ level, progress, totalSampahKg }) => {
  const levels = [
    { name: "Pemula", threshold: 0, icon: FiCircle },
    { name: "Aktivis", threshold: 10, icon: FiTrendingUp },
    { name: "Guardian", threshold: 25, icon: MdRecycling },
    { name: "Eco Warrior", threshold: 50, icon: FiShield },
    { name: "Legend", threshold: 100, icon: FiAward },
  ];

  const currentLevelIndex = levels.findIndex(l => totalSampahKg >= l.threshold);
  const nextLevel = levels[currentLevelIndex + 1];
  const progressToNext = nextLevel 
    ? ((totalSampahKg - levels[currentLevelIndex].threshold) / 
       (nextLevel.threshold - levels[currentLevelIndex].threshold)) * 100
    : 100;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FiBarChart2 className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-800">Level & Pencapaian</h3>
        </div>
        <div className="flex items-center gap-2">
          <FiStar className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-gray-800">{level}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Menuju {nextLevel?.name || "Puncak"}</span>
          <span className="text-sm font-medium text-gray-800">
            {totalSampahKg} kg / {nextLevel?.threshold || totalSampahKg} kg
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressToNext}%` }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
          />
        </div>
      </div>

      {/* Level Indicators */}
      <div className="relative">
        <div className="flex justify-between mb-2">
          {levels.map((lvl, idx) => (
            <div key={idx} className="text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${
                totalSampahKg >= lvl.threshold 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <lvl.icon className="w-4 h-4" />
              </div>
              <p className={`text-xs font-medium ${
                totalSampahKg >= lvl.threshold 
                  ? 'text-green-600' 
                  : 'text-gray-400'
              }`}>
                {lvl.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
          <p className="text-sm text-gray-600">Total Sampah</p>
          <p className="text-xl font-bold text-gray-800">{totalSampahKg} kg</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
          <p className="text-sm text-gray-600">Transaksi</p>
          <p className="text-xl font-bold text-gray-800">12 kali</p>
        </div>
      </div>

      {nextLevel && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-3">
            <FiAward className="w-6 h-6 text-yellow-600" />
            <div>
              <p className="font-medium text-gray-800">
                Butuh {nextLevel.threshold - totalSampahKg} kg lagi menuju {nextLevel.name}!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Dapatkan badge khusus dan bonus saldo 10%
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default LevelProgress;