import React from 'react';
import { motion } from 'framer-motion';

const ImageLayer = ({
  src,
  index,
  position,
}: {
  src: string;
  index: number;
  position: 'left' | 'right';
}) => {
  const getPosition = () => {
    const baseTop = position === 'left' ? 48 : 58;
    const spacing = position === 'left' ? 25 : 28;
    return {
      [position]: `${5 + index * 3}%`,
      top: `${baseTop + index * spacing}%`,
    };
  };

  return (
    <motion.div
      className="absolute rounded-2xl overflow-hidden shadow-2xl w-[450px] h-[300px] hidden md:block"
      style={{
        ...getPosition(),
        zIndex: index,
      }}
      initial={{ opacity: 0, scale: 1 }}
      animate={{
        opacity: [0.5, 0.7, 0.5],
        scale: [0.98, 1.02, 0.98],
        rotate: [
          position === 'left' ? -3 : 3,
          position === 'left' ? -1 : 1,
          position === 'left' ? -3 : 3,
        ],
      }}
      transition={{
        duration: 8 + index,
        repeat: Infinity,
        delay: index * 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
          filter: 'brightness(0.8) contrast(1.2)',
        }}
        whileHover={{
          filter: 'brightness(1) contrast(1.3)',
          scale: 1.05,
        }}
      />

      {/* Glass effect overlay */}
      <motion.div
        className="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px]"
        animate={{
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
      />

      {/* Enhanced glow effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          boxShadow: [
            'inset 0 0 50px rgba(37, 99, 235, 0.3)',
            'inset 0 0 80px rgba(37, 99, 235, 0.4)',
            'inset 0 0 50px rgba(37, 99, 235, 0.3)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 border-2 border-blue-500/30 rounded-2xl"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
      />
    </motion.div>
  );
};

const images = [
  'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1920',
];

export function SuperBowlImages() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/20 to-gray-900/60" />

      {/* Left side images */}
      {images.slice(0, 2).map((src, i) => (
        <ImageLayer key={`left-${i}`} src={src} index={i} position="left" />
      ))}

      {/* Right side images */}
      {images.slice(3).map((src, i) => (
        <ImageLayer key={`right-${i}`} src={src} index={i} position="right" />
      ))}

      {/* Enhanced edge gradients */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent" />
    </div>
  );
}