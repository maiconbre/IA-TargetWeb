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
        transition={{ type: "spring", stiffness: 300 }}
        className="relative w-full aspect-video rounded-xl overflow-hidden "
      >
        {/* Imagem de demonstração */}
        <img
          src="/images/mockup.png"
          alt="Interface do sistema BarberShop"
          className="absolute inset-0 w-full h-full mb-8 object-cover z-10"
        />

        {/* Elementos flutuantes - Posicionados abaixo */}
        {/* Ajustado 'inset-0 flex items-end p-6' para 'bottom-0 left-0 right-0 p-4' */}
        <div className="absolute bottom-0 left-0 right-0 z-30 "> 
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F0B35B] flex items-center justify-center text-black font-bold text-sm">BO</div>
              <div>
                <div className="text-white font-sm">Barber Online</div>
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
