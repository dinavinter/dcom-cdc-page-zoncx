import React from 'react';
import {
  Users,
  Activity,
  Phone,
  Link2,
  Database,
  UserCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-blue-900/40 backdrop-blur-sm p-6 rounded-lg text-center border border-blue-500/20 hover:border-blue-400/30 transition-colors">
      <Icon className="w-8 h-8 mx-auto mb-2 text-blue-300" />
      <div className="text-2xl font-bold text-blue-100">{value}</div>
      <div className="text-sm text-blue-200">{label}</div>
    </div>
  );
}

function AppShowcase({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  return (
    <motion.div 
      className="relative w-full sm:w-64 md:w-72 lg:w-48 xl:w-56 aspect-[9/19] mx-auto group"
      whileHover={{ scale: 1.05, rotateY: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-[2rem] bg-blue-500/10 blur-xl transform scale-105 group-hover:bg-blue-500/20 transition-colors duration-300" />
      
      {/* Border gradient container */}
      <div className="absolute inset-0 p-[2px] rounded-[2rem] bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-blue-500/30">
        <div className="absolute inset-0 rounded-[2rem] backdrop-blur-sm" />
      </div>

      {/* Main content container */}
      <div className="relative h-full w-full rounded-[2rem] overflow-hidden">
        {/* Image */}
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-blue-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        
        {/* Edge highlights */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Inner glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          boxShadow: [
            "inset 0 0 20px rgba(59, 130, 246, 0.2)",
            "inset 0 0 40px rgba(59, 130, 246, 0.3)",
            "inset 0 0 20px rgba(59, 130, 246, 0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

function ScalePage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Turn <span className="text-blue-400">unknown users</span> into{' '}
          <span className="text-blue-400">known</span> loyal brand ambassadors
        </motion.h1>

        {/* App Showcase */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          <AppShowcase imageUrl="/images/1.png" alt="Magnum app - For the ultimate indulgence" />
          <AppShowcase imageUrl="/images/2.png" alt="C&G baby club app" />
          <AppShowcase imageUrl="/images/3.png" alt="Manchester United app" />
          <AppShowcase imageUrl="/images/4.png" alt="Golf app" />
          <AppShowcase imageUrl="/images/5.png" alt="Nescafe app" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard icon={Users} value="3B+" label="Unique Identities" />
          <StatCard icon={Activity} value="2.3B+" label="Monthly Logins" />
          <StatCard icon={Phone} value="25B+" label="Monthly API Requests" />
          <StatCard icon={Link2} value="15B+" label="Consent transactions" />
          <StatCard icon={Database} value="400M+" label="Active Users" />
          <StatCard icon={UserCheck} value="85K+" label="Active Sites" />
        </div>
      </div>
    </div>
  );
}

export default ScalePage;