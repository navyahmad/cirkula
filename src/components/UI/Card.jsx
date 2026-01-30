import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5 } : {}}
      className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;