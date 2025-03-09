import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NFLRegistrationDemo } from './components/NFLRegistrationDemo';
import { SuperBowlImages } from './components/SuperBowlImages';
import { Banner } from './components/Banner';
import { useAdminStore } from '../../store/adminStore';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Users, Lock, Zap } from 'lucide-react';

function NFLPage() {
  const [showDemo, setShowDemo] = useState(true);
  const { setBannerImage, setCustomClass } = useAdminStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Load state from URL parameters if they exist
    const bannerParam = searchParams.get('banner');
    const classesParam = searchParams.get('classes');

    if (bannerParam) {
      setBannerImage(bannerParam);
    }

    if (classesParam) {
      try {
        const classes = JSON.parse(classesParam);
        Object.entries(classes).forEach(([key, value]) => {
          setCustomClass(key, value as string);
        });
      } catch (e) {
        console.error('Failed to parse classes from URL:', e);
      }
    }
  }, [searchParams, setBannerImage, setCustomClass]);

  useEffect(() => {
    const showInterval = setInterval(() => {
      setShowDemo(true);
    }, 15000);

    return () => clearInterval(showInterval);
  }, []);

  const metrics = [
    { value: '3.54M', label: 'API Calls', color: 'from-blue-500 to-blue-400' },
    { value: '3.7K', label: 'Peak RPS', color: 'from-blue-500 to-blue-400' },
    { value: '379K', label: 'Active Users', color: 'from-blue-500 to-blue-400' },
    { value: '99.9%', label: 'Uptime', color: 'from-blue-500 to-blue-400' }
  ];

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <SuperBowlImages />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Banner */}
        <Banner />

        {/* Content Section */}
        <main className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto py-6">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
            <motion.div 
              className="backdrop-blur-md bg-gray-800/40 p-8 rounded-2xl border border-gray-700"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Platform Coverage</h3>
              <ul className="space-y-4">
                {['NFL+ (game streaming services)', 'NFL ID (personal accounts)', 'NFL Fantasy', 'Club websites and mobile apps'].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center space-x-3 text-gray-300"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                  >
                    <CheckCircle2 className="text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="backdrop-blur-md bg-gray-800/40 p-8 rounded-2xl border border-gray-700"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                {metrics.map((metric, i) => (
                  <motion.div 
                    key={i}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                    >
                      {metric.value}
                    </motion.div>
                    <motion.div 
                      className="text-sm text-gray-400 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + (i * 0.1) }}
                    >
                      {metric.label}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {[
              { icon: Users, title: 'Seamless Login', desc: 'Single sign-on across all NFL properties' },
              { icon: Lock, title: 'Secure Authentication', desc: 'Advanced ATO Prevention' },
              { icon: Zap, title: 'High Performance', desc: 'Handles peak game day traffic' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="backdrop-blur-md bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-blue-600/50 transition-all group"
                whileHover={{ scale: 1.02 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + (i * 0.1) }}
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-4 group-hover:text-blue-500 transition-colors" />
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {showDemo && (
          <NFLRegistrationDemo 
            onComplete={() => {
              setShowDemo(false);
            }} 
          />
        )}
      </div>
    </div>
  );
}

export default NFLPage;