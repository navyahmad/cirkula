import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import Card from '../UI/Card';

const StatCard = ({ title, value, icon, color, trend, description }) => {
  return (
    <Card hover={true}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <motion.p 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-gray-800">
            {value}
          </motion.p>
          {description && (
            <p className="text-xs text-gray-400 mt-1">{description}</p>
          )}
          {trend && (
            <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium ${trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {trend > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />} {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;