import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  openDemoModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openDemoModal }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full bg-[#1A1F2E]/95 backdrop-blur-md z-50 border-b border-[#F0B35B]/20 shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8 py-2 xs:py-2.5 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1.5 xs:space-x-2"
            >
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-[#F0B35B]/10 flex items-center justify-center">
                <span className="text-[#F0B35B] text-sm xs:text-base sm:text-lg font-bold">B</span>
              </div>
              <h1 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-[#F0B35B] tracking-wide">BarberShop</h1>
            </motion.div>
          </div>
          
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openDemoModal}
              className="
                relative overflow-hidden
                px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg
                border border-[#F0B35B] xs:border-2 text-[#F0B35B]
                text-xs xs:text-sm font-medium
                transition-all duration-300
                hover:bg-[#F0B35B]/10
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-[#F0B35B]/0 
                before:via-white/20 before:to-[#F0B35B]/0
                before:-skew-x-45 before:animate-shine
                shadow-sm xs:shadow-md hover:shadow-lg
                flex items-center space-x-1 xs:space-x-2
              "
            >
              <span className="relative z-10 whitespace-nowrap">Como funciona?</span>
              <svg 
                className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;