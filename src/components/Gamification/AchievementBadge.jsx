import { motion } from 'framer-motion';
import { FiCheck, FiLock, FiAward, FiTrendingUp, FiShield, FiGlobe, FiStar } from 'react-icons/fi';
import { MdRecycling } from 'react-icons/md';

const AchievementBadge = ({ achievement }) => {
  // Map emoji to React Icons
  const iconMap = {
    "🌱": FiTrendingUp,
    "🏆": FiAward,
    "🦸": FiShield,
    "🌍": FiGlobe,
    "👑": FiStar,
  };

  const IconComponent = iconMap[achievement.icon] || FiAward;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-4 rounded-xl border-2 ${
        achievement.achieved
          ? 'border-green-200 bg-green-50'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-lg ${
          achievement.achieved
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-400'
        }`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className={`font-semibold ${
              achievement.achieved ? 'text-gray-800' : 'text-gray-400'
            }`}>
              {achievement.name}
            </h4>
            {achievement.achieved ? (
              <FiCheck className="w-5 h-5 text-green-500" />
            ) : (
              <FiLock className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <p className={`text-sm mt-1 ${
            achievement.achieved ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {achievement.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementBadge;