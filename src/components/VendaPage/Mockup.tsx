import React from 'react';
import { motion } from 'framer-motion';

const Mockup: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.02, rotate: -1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative w-full aspect-video bg-[#1A1F2E] rounded-xl overflow-hidden border border-[#F0B35B]/20 shadow-2xl transform perspective-1000"
      >
        {/* Efeito de brilho nas bordas */}
        <div className="absolute inset-0 rounded-xl border border-[#F0B35B]/30 filter blur-[2px] z-0"></div>

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D121E] via-[#0D121E]/50 to-transparent opacity-70 z-20"></div>

        {/* Imagem de demonstração */}
        <img
          src="/images/demofoto.webp"
          alt="Interface do sistema BarberShop"
          className="absolute inset-0 w-full h-full object-cover z-10"
        />

        {/* Elementos flutuantes */}
        <div className="absolute inset-0 z-30 flex items-end p-6">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F0B35B] flex items-center justify-center text-black font-bold text-sm">BO</div>
              <div>
                <div className="text-white font-medium">Barber Online</div>
                <div className="text-xs text-gray-300">Sistema de Gestão</div>
              </div>
            </div>

            <div className="flex gap-2 mb-2">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                className="px-3 py-1.5 bg-[#F0B35B]/20 rounded-md text-[#F0B35B] text-xs font-medium"
              >
                Agendamentos
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                className="px-3 py-1.5 bg-[#F0B35B]/10 rounded-md text-[#F0B35B] text-xs font-medium"
              >
                Relatórios
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                className="px-3 py-1.5 bg-[#F0B35B]/10 rounded-md text-[#F0B35B] text-xs font-medium"
              >
                Clientes
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Mockup;