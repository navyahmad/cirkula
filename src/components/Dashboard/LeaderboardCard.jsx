import { motion } from 'framer-motion';
import { FiAward, FiTrendingUp } from 'react-icons/fi';
import Card from '../UI/Card';

const LeaderboardCard = ({ data, userDusun }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FiAward className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-800">Leaderboard Dusun</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiTrendingUp className="w-4 h-4" />
          <span>Bulan Juni 2024</span>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.rank}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-lg ${
              item.dusun === userDusun
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color} text-white font-bold`}>
                  {item.rank}
                </div>
                {item.rank <= 3 && (
                  <FiAward className={`absolute -top-1 -right-1 w-5 h-5 ${
                    item.rank === 1 ? 'text-yellow-500' :
                    item.rank === 2 ? 'text-gray-400' :
                    'text-amber-700'
                  }`} />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">{item.dusun}</p>
                <p className="text-sm text-gray-500">{item.transaksi} transaksi</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">{item.totalKg} kg</p>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.totalKg / 250) * 100}%` }}
                  className={`h-full ${item.color.replace('bg-', 'bg-')}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {userDusun && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Posisi Dusun Kamu</p>
              <p className="font-bold text-gray-800">{userDusun}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                #{data.find(d => d.dusun === userDusun)?.rank || '-'}
              </p>
              <p className="text-sm text-gray-500">Peringkat</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default LeaderboardCard;