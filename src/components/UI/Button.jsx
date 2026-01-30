import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  className = '', 
  ...props 
}, ref) => {
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
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon />}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;