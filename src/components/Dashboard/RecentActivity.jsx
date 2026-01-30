import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';
import Card from '../UI/Card';

const RecentActivity = ({ transactions }) => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <FiFileText className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-bold text-gray-800">Aktivitas Terbaru</h3>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{transaction.jenis}</p>
                <div className="flex items-center gap-2 mt-1">
                  <FiClock className="w-3 h-3 text-gray-400" />
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                  <span className="text-sm font-medium text-gray-700">
                    {transaction.berat} kg
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">
                + Rp {transaction.nilai.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Tabungan</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Total 30 hari terakhir</p>
          <p className="font-bold text-gray-800">
            Rp {transactions.reduce((sum, t) => sum + t.nilai, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RecentActivity;