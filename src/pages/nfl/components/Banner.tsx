import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { useAdminStore } from '../../../store/adminStore';
import { useLocation } from 'react-router-dom';

export function Banner() {
  const { bannerImage, customClasses } = useAdminStore();
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  
  // Fallback image URL in case local image fails
  const fallbackImageUrl =
    'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1920';

  const handleShare = () => {
    // Get the base URL without hash
    const baseUrl = window.location.href.split('#')[0];
    
    // Create the new hash-based URL with parameters
    const params = new URLSearchParams();
    params.set('banner', bannerImage);
    params.set('classes', JSON.stringify(customClasses));
    
    // Construct the final URL with hash routing
    const shareUrl = `${baseUrl}#/?${params.toString()}`;

    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy URL:', err);
      // Fallback for clipboard API failure
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        alert('Link copied to clipboard!');
      } catch (e) {
        console.error('Fallback copy failed:', e);
        alert('Failed to copy link. Please copy it manually: ' + shareUrl);
      }
      document.body.removeChild(textarea);
    });
  };

  return (
    <motion.div
      className="relative w-full h-[500px] overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Share Button - Only show in admin view */}
      {isAdmin && (
        <motion.button
          className="absolute top-4 right-4 z-20 p-3 bg-blue-600/80 hover:bg-blue-600 backdrop-blur-sm rounded-full text-white shadow-lg transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      )}

      {/* Main banner image */}
      <motion.div
        className="absolute inset-0 absolute top-0 left-0 right-0 h-[450px] aspect-auto pb-32"
        initial={{ scale: 1.1, opacity: 1 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src={bannerImage}
          alt="Super Bowl Banner"
          className={customClasses['banner-image']}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackImageUrl) {
              target.src = fallbackImageUrl;
            }
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-gray-900/80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 inset-y-1/2 bottom-[100px]">
        <motion.div
          className="inline-block backdrop-blur-sm bg-black/30 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            CDC Powered SuperBowl <br /> LIX
          </motion.h1>
          <motion.p
            className="text-2l md:text-xl text-gray-300 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            SAP CDC manages identity for 64M NFL Fans across all digital
            platforms
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-[100px] left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />
    </motion.div>
  );
}