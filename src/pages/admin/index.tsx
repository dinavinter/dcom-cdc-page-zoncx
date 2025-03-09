import React, { useState, useEffect, useCallback } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { motion, AnimatePresence } from 'framer-motion';
import NFLPage from '../nfl';
import { Settings, Image, RotateCcw, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';

function AdminPage() {
  const { bannerImage, setBannerImage, customClasses, setCustomClass, resetStore } = useAdminStore();
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      resetStore();
    }
  };

  const extractClasses = useCallback(() => {
    const img = document.querySelector('img[alt="Super Bowl Banner"]');
    if (img) {
      setSelectedElement(img);
      const classes = img.className;
      setCustomClass('banner-image', classes);
    }
  }, [setCustomClass]);

  // Enable element inspection mode
  const enableInspectMode = () => {
    const handleHover = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.tagName === 'IMG') {
        target.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.tagName === 'IMG') {
        target.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as Element;
      if (target.tagName === 'IMG') {
        setSelectedElement(target);
        const classes = target.className;
        setCustomClass('banner-image', classes);
        
        // Cleanup
        document.removeEventListener('mouseover', handleHover);
        document.removeEventListener('mouseout', handleMouseOut);
        document.removeEventListener('click', handleClick);
      }
    };

    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Panel Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 left-4 z-[60] p-2 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg text-white transition-colors"
        onClick={() => setIsPanelVisible(!isPanelVisible)}
      >
        {isPanelVisible ? <ChevronLeft /> : <ChevronRight />}
      </motion.button>

      {/* Admin Panel */}
      <AnimatePresence>
        {isPanelVisible && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-lg border-r border-blue-500/20 p-6 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Admin Controls</h2>
              </div>
              <button
                onClick={handleReset}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                title="Reset all changes"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Banner Image Control */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Image className="w-4 h-4" />
                Banner Image
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-blue-500/20 rounded-lg text-white text-sm"
                  placeholder="Enter image URL"
                />
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <img
                    src={bannerImage}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* CSS Classes Control */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Custom Classes</h3>
                <button
                  onClick={enableInspectMode}
                  className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors flex items-center gap-2"
                  title="Extract classes from element"
                >
                  <Wand2 className="w-4 h-4" />
                  <span className="text-sm">Inspect</span>
                </button>
              </div>
              
              {/* Banner Image Classes */}
              <div className="space-y-4">
                <div>
                  <textarea
                    value={customClasses['banner-image'] || ''}
                    onChange={(e) => setCustomClass('banner-image', e.target.value)}
                    className="w-full h-32 px-3 py-2 bg-gray-800 border border-blue-500/20 rounded-lg text-white text-sm font-mono"
                    placeholder="Enter CSS classes"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Area */}
      <div className={`${isPanelVisible ? 'ml-80' : 'ml-0'} transition-[margin] duration-300`}>
        <NFLPage />
      </div>
    </div>
  );
}

export default AdminPage;