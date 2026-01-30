import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaCode, FaServer } from 'react-icons/fa';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [stars, setStars] = useState([]);

  // Generate stars for background
  useEffect(() => {
    const starsArray = [];
    for (let i = 0; i < 150; i++) {
      starsArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      });
    }
    setStars(starsArray);
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#000814] to-[#0a192f] overflow-hidden"
        >
          {/* Animated Stars Background */}
          <div className="absolute inset-0">
            {stars.map((star) => (
              <div
                key={star.id}
                className="star absolute bg-white rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4">
            {/* Rocket Animation */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              <FaRocket className="text-6xl md:text-8xl text-[#64ffda] glow" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl md:text-5xl font-bold text-center mb-4"
            >
              <span className="text-white">NAVY</span>
              <span className="text-[#64ffda]">ORI</span>
              <span className="text-white">.DEV</span>
            </motion.h1>

            <p className="text-[#8892b0] text-lg mb-8 text-center">
              Launching Fullstack Portfolio...
            </p>

            {/* Progress Bar Container */}
            <div className="w-full max-w-2xl bg-[#112240] rounded-full h-4 mb-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100 }}
                className="h-full bg-gradient-to-r from-[#64ffda] to-[#00b4d8] rounded-full relative"
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{ x: ["0%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <motion.div
              key={progress}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-[#64ffda] mb-8"
            >
              {progress}%
            </motion.div>

            {/* Tech Icons */}
            <div className="flex space-x-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="p-3 rounded-full bg-[#112240]/50"
              >
                <FaCode className="text-2xl text-[#64ffda]" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="p-3 rounded-full bg-[#112240]/50"
              >
                <FaServer className="text-2xl text-[#64ffda]" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 rounded-full bg-[#112240]/50"
              >
                <span className="text-2xl font-bold text-[#64ffda]">R19</span>
              </motion.div>
            </div>

            {/* Loading Status Text */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-[#8892b0] text-sm text-center"
            >
              {progress < 30 && "Initializing systems..."}
              {progress >= 30 && progress < 60 && "Loading components..."}
              {progress >= 60 && progress < 90 && "Preparing UI..."}
              {progress >= 90 && "Almost ready..."}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;