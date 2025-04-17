import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Users, X, Zap } from 'lucide-react';

interface CTAProps {
  hours: number;
  minutes: number;
  seconds: number;
  slotsLeft: number;
}

const CTA: React.FC<CTAProps> = ({ hours, minutes, seconds, slotsLeft }) => {
  // Garantir que os valores não sejam undefined
  const safeHours = hours || 0;
  const safeMinutes = minutes || 0;
  const safeSeconds = seconds || 0;
  const safeSlotsLeft = slotsLeft || 0;
  
  // Estado para controlar a visibilidade da barra fixa
  const [showFixedBar, setShowFixedBar] = useState(true);
  
  // Estado para o contador de 24 horas
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  
  // Efeito para atualizar o contador a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0B35B]/5 to-transparent opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-12"
          >
            {/* Oferta Especial Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#F0B35B]/5 text-[#F0B35B] rounded-full border border-[#F0B35B]/10 backdrop-blur-sm">
                <span className="animate-pulse text-base sm:text-xl">⚡</span>
                <span className="text-xs sm:text-base font-medium">Oferta Especial por Tempo Limitado</span>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="text-center space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 mb-2 sm:mb-3">
                  Eleve sua Barbearia ao
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F0B35B] to-[#D4943D]">
                  Próximo Nível
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
                Junte-se a centenas de barbearias que já estão revolucionando
                <br className="hidden sm:block" /> sua gestão e aumentando seus lucros
              </p>

              {/* CTA Buttons and Timer */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-3xl mx-auto px-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full sm:w-auto"
                >
                  <button className="
                    relative overflow-hidden w-full sm:w-auto
                    px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#F0B35B] to-[#D4943D] text-black rounded-xl
                    font-bold text-sm sm:text-base md:text-lg
                    transition-all duration-500
                    shadow-[0_0_15px_rgba(240,179,91,0.3)] sm:shadow-[0_0_25px_rgba(240,179,91,0.4)]
                    border-2 border-[#F0B35B]
                    hover:shadow-[0_0_25px_rgba(240,179,91,0.5)] sm:hover:shadow-[0_0_35px_rgba(240,179,91,0.6)]
                    group
                  ">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 -skew-x-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      Começar Agora
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </motion.div>

                <div className="flex items-center gap-3 sm:gap-4 bg-[#252B3B]/80 backdrop-blur-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-[#F0B35B]/10 w-full sm:w-auto">
                  <div className="flex flex-col items-start">
                    <span className="text-xs sm:text-sm text-gray-400">Oferta expira em:</span>
                    <div className="font-mono text-[#F0B35B] text-base sm:text-lg font-bold tracking-wider">
                      {safeHours.toString().padStart(2, '0')}:{safeMinutes.toString().padStart(2, '0')}:{safeSeconds.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="h-10 sm:h-12 w-px bg-[#F0B35B]/10"></div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs sm:text-sm text-gray-400">Vagas restantes:</span>
                    <div className="text-[#F0B35B] font-bold text-base sm:text-lg">{safeSlotsLeft}</div>
                  </div>
                </div>
              </motion.div>

              {/* Features Grid */}
              <div className="pt-8 sm:pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 sm:gap-3 bg-[#252B3B]/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-[#F0B35B]/10"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#252B3B] flex items-center justify-center text-[#F0B35B] shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base text-gray-300 font-medium">7 dias de garantia</span>
                    <span className="text-xs text-gray-400">Teste sem compromisso</span>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 sm:gap-3 bg-[#252B3B]/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-[#F0B35B]/10"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#252B3B] flex items-center justify-center text-[#F0B35B] shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base text-gray-300 font-medium">Suporte 24/7</span>
                    <span className="text-xs text-gray-400">Atendimento prioritário</span>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 sm:gap-3 bg-[#252B3B]/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-[#F0B35B]/10"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#252B3B] flex items-center justify-center text-[#F0B35B] shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base text-gray-300 font-medium">+1000 clientes ativos</span>
                    <span className="text-xs text-gray-400">Barbearias de sucesso</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Barra fixa na parte inferior */}
      {showFixedBar && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1F2E]/95 backdrop-blur-md border-t border-[#F0B35B]/10 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              {/* Timer e vagas restantes em uma linha */}
              <div className="w-full sm:w-auto grid grid-cols-2 sm:flex items-center gap-2 sm:gap-3">
                {/* Timer */}
                <div className="flex items-center gap-1.5 sm:gap-2 bg-[#252B3B]/40 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-lg border border-[#F0B35B]/10">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#F0B35B] animate-pulse" />
                  <div className="flex items-center gap-1">
                    <span className="text-[#F0B35B] text-[11px] sm:text-sm font-medium whitespace-nowrap hidden sm:inline">Oferta Especial:</span>
                    <div className="font-mono text-[#F0B35B] text-[11px] sm:text-sm font-bold tracking-wider flex items-center">
                      <span className="bg-[#1A1F2E] px-1.5 py-0.5 rounded">{timeLeft.hours.toString().padStart(2, '0')}</span>
                      <span className="mx-0.5">:</span>
                      <span className="bg-[#1A1F2E] px-1.5 py-0.5 rounded">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                      <span className="mx-0.5">:</span>
                      <span className="bg-[#1A1F2E] px-1.5 py-0.5 rounded">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
                
                {/* Vagas restantes */}
                <div className="flex items-center gap-1.5 sm:gap-2 bg-[#252B3B]/40 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-lg border border-[#F0B35B]/10">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#F0B35B]" />
                  <span className="text-[#F0B35B] text-[11px] sm:text-sm font-medium">Últimas <span className="font-bold">3</span> vagas!</span>
                </div>
              </div>
              
              {/* Botão CTA */}
              <div className="w-full sm:w-auto flex items-center gap-2 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    relative overflow-hidden w-full sm:w-auto
                    px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#F0B35B] to-[#D4943D] text-black rounded-lg
                    font-bold text-xs sm:text-sm
                    transition-all duration-300
                    shadow-[0_0_10px_rgba(240,179,91,0.2)]
                    hover:shadow-[0_0_15px_rgba(240,179,91,0.3)]
                    group
                  "
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 -skew-x-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                    Garantir Desconto Especial
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
                
                <button 
                  onClick={() => setShowFixedBar(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CTA;