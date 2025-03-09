import React from 'react';
import { motion } from 'framer-motion';

const StadiumLights = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-40 h-40 bg-blue-400/10 rounded-full filter blur-3xl"
          style={{
            top: i < 2 ? '-10%' : '70%',
            left: i % 2 === 0 ? '-5%' : '70%',
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const YardLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-px bg-white"
          style={{
            top: `${(i + 1) * 10}%`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const AnimatedFootball = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{
        x: [-100, 100, -100],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg
          width="120"
          height="72"
          viewBox="0 0 120 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue-400"
        >
          <motion.g
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Football outline shape */}
            <motion.ellipse
              cx="60"
              cy="36"
              rx="57"
              ry="33"
              stroke="currentColor"
              strokeWidth="2"
              className="filter drop-shadow-lg"
              fill="transparent"
            />
            
            {/* Inner details */}
            <motion.ellipse
              cx="60"
              cy="36"
              rx="45"
              ry="26"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="opacity-50"
              fill="transparent"
            />
            
            {/* Laces */}
            <motion.path
              d="M48 30H72M48 36H72M48 42H72"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="filter drop-shadow"
            />

            {/* Decorative lines */}
            <motion.path
              d="M20 36C30 26 90 26 100 36"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              className="opacity-30"
            />
            <motion.path
              d="M20 36C30 46 90 46 100 36"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              className="opacity-30"
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* Motion trail effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          scale: [1, 1.2],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeOut",
        }}
      >
        <svg
          width="120"
          height="72"
          viewBox="0 0 120 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="60"
            cy="36"
            rx="57"
            ry="33"
            stroke="#60A5FA"
            strokeWidth="2"
            className="filter blur-md opacity-30"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <StadiumLights />
      <YardLines />
      <AnimatedFootball />
    </div>
  );
}