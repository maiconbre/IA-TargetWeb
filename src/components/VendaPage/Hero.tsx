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
      className="relative min-h-[90dvh] lg:min-h-[85dvh] flex items-start sm:items-center pt-8 sm:pt-12 pb-4 overflow-hidden"
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

      <div className="container mx-auto px-3 sm:px-6 lg:px-2 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-4 lg:gap-12 items-start sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 50
            }}
            className="max-w-2xl mx-auto text-center lg:text-left space-y-4 sm:space-y-6 pt-4 sm:pt-0 lg:pr-6"
          >
            {/* Tag com animação melhorada */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(240,179,91,0.15)" }}
                className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-[#F0B35B]/5 text-[#F0B35B] rounded-full border border-[#F0B35B]/10 backdrop-blur-sm w-fit mx-auto"
              >
                <span className="animate-bounce text-base">🔥</span>
                <span className="text-[11px] sm:text-sm font-medium">Chega de perder clientes no WhatsApp!</span>
              </motion.div>
            </div>

            {/* Headline com animação melhorada */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0"
            >
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 pb-2">
                Gerencie seus Agendamentos com 
              </span>
              <span className="relative mt-2 sm:mt-4">
                <span className={`relative inline-block bg-clip-text text-transparent ${commonAnimations.buttonGradient}`}>
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

            {/* Dores do cliente e benefícios */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Lista de dores */}
              <div className="space-y-2 px-2 sm:px-0">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex items-center gap-1.5 text-red-400/90"
                >
                  <span className="text-base min-w-[20px]">❌</span>
                  <p className="text-[12px] sm:text-sm">Cansado de perder horários por falta de organização?</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="flex items-center gap-1.5 text-red-400/90"
                >
                  <span className="text-base min-w-[20px]">❌</span>
                  <p className="text-[12px] sm:text-sm">Clientes mandando mensagens toda hora?</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="flex items-center gap-1.5 text-red-400/90"
                >
                  <span className="text-base min-w-[20px]">❌</span>
                  <p className="text-[12px] sm:text-sm">Perdendo tempo respondendo WhatsApp o dia todo?</p>
                </motion.div>
              </div>

              {/* Solução */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="bg-[#F0B35B]/5 p-3 sm:p-4 rounded-lg border border-[#F0B35B]/10 mx-2 sm:mx-0"
              >
                <p className="text-[#F0B35B] font-medium mb-2 text-[12px] sm:text-base">A solução que você precisa:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#F0B35B] min-w-[16px]">✓</span>
                    <p className="text-[12px] sm:text-base text-gray-300">Sistema automático de agendamentos 24h</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#F0B35B] min-w-[16px]">✓</span>
                    <p className="text-[12px] sm:text-base text-gray-300">Lembretes automáticos para você e seus clientes</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#F0B35B] min-w-[16px]">✓</span>
                    <p className="text-[12px] sm:text-base text-gray-300">Redução de 4 horas de gestão por dia</p>
                  </div>
                </div>
              </motion.div>

              {/* Cards de benefícios */}
              <div className="grid grid-cols-3 gap-1 sm:gap-3 max-w-lg mx-auto lg:mx-0 px-1 sm:px-0">
                {/* Card 1 */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(240,179,91,0.2)" }}
                  className={`${commonAnimations.cardGradient} rounded-lg p-1.5 sm:p-2 border border-[#F0B35B]/10 hover:border-[#F0B35B]/30 transition-all duration-300`}
                >
                  <div className="text-center">
                    <span className="text-base sm:text-lg mb-0.5 block">💰</span>
                    <h3 className="text-white font-bold text-[10px] sm:text-sm mb-0.5">+30% Faturamento</h3>
                    <p className="text-[9px] sm:text-xs text-gray-400">Menos faltas</p>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(240,179,91,0.2)" }}
                  className={`${commonAnimations.cardGradient} rounded-lg p-1.5 sm:p-2 border border-[#F0B35B]/10 hover:border-[#F0B35B]/30 transition-all duration-300`}
                >
                  <div className="text-center">
                    <span className="text-base sm:text-lg mb-0.5 block">⏱️</span>
                    <h3 className="text-white font-bold text-[10px] sm:text-sm mb-0.5">+4h Livres</h3>
                    <p className="text-[9px] sm:text-xs text-gray-400">Por dia</p>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(240,179,91,0.2)" }}
                  className={`${commonAnimations.cardGradient} rounded-lg p-1.5 sm:p-2 border border-[#F0B35B]/10 hover:border-[#F0B35B]/30 transition-all duration-300`}
                >
                  <div className="text-center">
                    <span className="text-base sm:text-lg mb-0.5 block">📱</span>
                    <h3 className="text-white font-bold text-[10px] sm:text-sm mb-0.5">Agenda Online</h3>
                    <p className="text-[9px] sm:text-xs text-gray-400">24h por dia</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Lado direito - Componente Mockup com animação de entrada */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hidden lg:block lg:scale-115 lg:translate-x-12 transform lg:-mr-8 relative"
          >
            {/* Tag flutuante centralizada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, type: "spring" }}
              className="absolute -top-16 left-0 -translate-x-12 z-20 w-full flex justify-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F0B35B]/10 text-[#F0B35B] rounded-full border border-[#F0B35B]/20 backdrop-blur-sm shadow-lg shadow-[#F0B35B]/5">
                <span className="animate-bounce text-xl">🔥</span>
                <span className="text-sm font-medium whitespace-nowrap">Chega de perder clientes no WhatsApp!</span>
              </div>
            </motion.div>

            <Mockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;