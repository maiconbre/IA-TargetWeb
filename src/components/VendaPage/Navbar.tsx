import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  openDemoModal: () => void;
  commonAnimations: {
    headerGradient: string;
    cardGradient: string;
    glowEffect: string;
    buttonGradient: string;
    buttonShine: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ openDemoModal, commonAnimations }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full bg-[#1A1F2E]/90 backdrop-blur-md z-50 border-b border-[#F0B35B]/10`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1 sm:py-2">
        <div className="grid grid-cols-2 items-center">
          <div className="justify-self-start">
            <h1 className="text-base sm:text-lg font-bold text-[#F0B35B]">BarberShop</h1>
          </div>
          <div className="justify-self-end">
            <button
              onClick={openDemoModal}
              className="
                relative overflow-hidden
                px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg
                border border-[#F0B35B] text-[#F0B35B]
                text-xs sm:text-sm font-medium
                transition-all duration-300
                hover:bg-[#F0B35B]/10
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-[#F0B35B]/0 
                before:via-white/20 before:to-[#F0B35B]/0
                before:-skew-x-45 before:animate-shine
              "
            >
              <span className="relative z-10">Como funciona?</span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;