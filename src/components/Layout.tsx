import React from 'react';
import { Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isNFLPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* SAP CDC Logo */}
      <motion.div 
        className="fixed top-4 left-4 z-50 flex items-center bg-slate-700/30 backdrop-blur-lg border border-blue-500/20 shadow-lg shadow-blue-600/10 rounded-2xl overflow-hidden"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-3 bg-blue-900/30 border-r border-blue-500/20">
          <Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
        </div>
        <span className="text-xl md:text-2xl font-bold text-white px-4">SAP CDC</span>
      </motion.div>

      {/* Navigation Arrows */}
      <div className="fixed inset-y-0 left-0 right-0 z-40 pointer-events-none flex items-center justify-between px-4">
        <Link
          to={!isNFLPage ? "/" : "/scale"}
          className="pointer-events-auto opacity-80 transition-opacity duration-300"
        >
          <motion.div
            className="p-4 rounded-full bg-slate-700/30 backdrop-blur-lg border border-blue-500/20 shadow-lg shadow-blue-600/10 text-white hover:bg-slate-600/30 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.div>
        </Link>
        <Link
         to={!isNFLPage ? "/" : "/scale"}
          className={`pointer-events-auto opacity-80 transition-opacity duration-300`}
        >
          <motion.div
            className="p-4 rounded-full bg-slate-700/30 backdrop-blur-lg border border-blue-500/20 shadow-lg shadow-blue-600/10 text-white hover:bg-slate-600/30 transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </Link>
      </div>

      <main>
        {children}
      </main>
    </div>
  );
}