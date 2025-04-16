import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Mockup from './Mockup';

interface HeroProps {
  heroRef: React.RefObject<HTMLDivElement>;
  commonAnimations: {
    headerGradient: string;
    cardGradient: string;
    glowEffect: string;
    buttonGradient: string;
    buttonShine: string;
  };
}

const Hero: React.FC<HeroProps> = ({ heroRef, commonAnimations }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] lg:min-h-[90dvh] flex items-center pt-8 sm:pt-8 lg:pt-0 pb-8 overflow-hidden"
      tabIndex={-1}
    >
      {/* Elementos de fundo animados com parallax */}
      <motion.div 
        style={{ opacity, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#F0B35B]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#F0B35B]/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#F0B35B]/5 rounded-full filter blur-3xl animate-float"></div>

        {/* Linhas decorativas com gradiente melhorado */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F0B35B]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F0B35B]/30 to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 50
            }}
            className="max-w-2xl mx-auto text-center lg:text-left space-y-4"
          >
            {/* Tag com animação melhorada */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(240,179,91,0.15)" }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F0B35B]/5 text-[#F0B35B] rounded-full border border-[#F0B35B]/10 backdrop-blur-sm"
              >
                <span className="animate-pulse text-base">🔥</span>
                <span className="text-xs sm:text-sm">Chega de confusão no WhatsApp</span>
              </motion.div>
            </div>

            {/* Headline com animação de texto otimizado para mobile-first */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span className="block mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
                Gerencie seus Agendamentos com 
              </span>
              <span className="relative mt-2">
                <span className={`relative inline-block bg-clip-text text-transparent text-[1.2em] sm:text-[1em] ${commonAnimations.buttonGradient}`}>
                  Profissionalismo
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute -bottom-1 sm:-bottom-2 left-0 h-[2px] sm:h-[3px] bg-gradient-to-r from-[#F0B35B]/0 via-[#F0B35B] to-[#F0B35B]/0"
                  />
                </span>
              </span>
            </motion.h1>

            {/* Subtítulo atualizado com benefícios mais detalhados */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
                Chega de perder clientes e tempo com agendamentos pelo WhatsApp:
              </p>

              {/* Cards de benefícios com hover melhorado */}
              <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto lg:mx-0">
                {/* Card 1 */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(240,179,91,0.2)" }}
                  className={`${commonAnimations.cardGradient} rounded-lg p-2 border border-[#F0B35B]/10 hover:border-[#F0B35B]/30 transition-all duration-300`}
                >
                  <div className="text-center">
                    <span className="text-base sm:text-lg mb-0.5 block">💰</span>
                    <h3 className="text-white font-bold text-xs sm:text-sm mb-0.5">+30% Faturamento</h3>
                    <p className="text-gray-400 text-[10px] sm:text-xs">Menos faltas</p>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(240,179,91,0.2)" }}
                  className={`${commonAnimations.cardGradient} rounded-lg p-2 border border-[#F0B35B]/10 hover:border-[#F0B35B]/30 transition-all duration-300`}
                >
                  <div className="text-center">
                    <span className="text-base sm:text-lg mb-0.5 block">⏱️</span>
                    <h3 className="text-white font-bold text-xs sm:text-sm mb-0.5">+4h Livres</h3>
                    <p className="text-gray-400 text-[10px] sm:text-xs">Por dia</p>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(240,179,91,0.2)" }}
                  className={`${commonAnimations.cardGradient} rounded-lg p-2 border border-[#F0B35B]/10 hover:border-[#F0B35B]/30 transition-all duration-300`}
                >
                  <div className="text-center">
                    <span className="text-base sm:text-lg mb-0.5 block">📱</span>
                    <h3 className="text-white font-bold text-xs sm:text-sm mb-0.5">Agenda Online</h3>
                    <p className="text-gray-400 text-[10px] sm:text-xs">24h por dia</p>
                  </div>
                </motion.div>
              </div>

              {/* Elementos adicionais para mobile com animações melhoradas */}
              <div className="lg:hidden space-y-3 mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-2 text-[#F0B35B] bg-[#F0B35B]/5 p-2 rounded-lg border border-[#F0B35B]/10"
                >
                  <span className="text-xl">⚡</span>
                  <span className="text-xs font-medium">Sistema mais rápido do RJ</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-2 text-[#F0B35B] bg-[#F0B35B]/5 p-2 rounded-lg border border-[#F0B35B]/10"
                >
                  <span className="text-xl">🎯</span>
                  <span className="text-xs font-medium">+1000 barbearias usando</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-2 text-[#F0B35B] bg-[#F0B35B]/5 p-2 rounded-lg border border-[#F0B35B]/10"
                >
                  <span className="text-xl">💪</span>
                  <span className="text-xs font-medium">Suporte 24/7</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Lado direito - Componente Mockup com animação de entrada */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hidden lg:block"
          >
            <Mockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;