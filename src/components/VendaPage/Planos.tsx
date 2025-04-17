import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Rocket } from 'lucide-react';

interface PlanosProps {
  commonAnimations: {
    headerGradient: string;
    cardGradient: string;
    glowEffect: string;
    buttonGradient: string;
    buttonShine: string;
  };
}

const Planos: React.FC<PlanosProps> = ({ commonAnimations }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#1A1F2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Escolha o Plano Ideal para Você
          </h2>
          <p className="text-sm sm:text-base text-gray-400">Aproveite nossa oferta especial por tempo limitado</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Card Plano Mensal */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative ${commonAnimations.cardGradient} p-4 sm:p-6 lg:p-8 rounded-lg border border-[#F0B35B]/10 w-full sm:w-[calc(33%-1rem)] max-w-[350px] mx-auto ${commonAnimations.glowEffect}`}
          >
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">Plano Mensal</h3>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0B35B] mb-1">R$ 49,90</div>
              <div className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Acesso total por 1 mês</div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {['Atualizações', 'Suporte 24/7', 'Backups diários', 'Sem limite de agendamentos'].map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F0B35B] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 sm:py-3 bg-[#252B3B] text-[#F0B35B] rounded-lg font-bold border border-[#F0B35B]/30 hover:bg-[#F0B35B]/10 transition-all duration-300 text-sm sm:text-base"
              >
                Assinar Agora
              </motion.button>
            </div>
          </motion.div>

          {/* Card Plano Semestral em Destaque */}
          <div className="relative bg-gradient-to-br from-[#1A1F2E] to-[#252B3B] p-4 sm:p-6 lg:p-8 rounded-lg border-2 border-[#F0B35B] shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-[calc(33%-1rem)] max-w-[350px] mx-auto z-10">
            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-[#F0B35B] text-black text-xs sm:text-sm px-3 py-1 rounded-full font-bold">
              Mais Popular
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Plano Semestral</h3>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0B35B] mb-1">R$ 39,90<span className="text-lg sm:text-xl">/mês</span></div>
            <div className="text-xs sm:text-sm mt-2 text-gray-400 mb-3 sm:mb-4">
              de <span className="text-[#F0B35B]">R$ 300,00</span> por R$ 239,90
              <span className="text-xs text-gray-400 ml-2">em 6 meses</span>
            </div>

            <ul className="space-y-2 sm:space-y-3 my-3 sm:my-4">
              {['Atualizações', 'Suporte 24/7', 'Backups diários', 'Sem limite de agendamentos', 'Relatórios avançados', 'Acesso a recursos premium'].map((item, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F0B35B] mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative overflow-hidden w-full
                py-2 sm:py-3 bg-[#F0B35B] text-black rounded-lg
                font-bold text-sm sm:text-base
                transition-all duration-500
                shadow-[0_0_15px_rgba(240,179,91,0.3)]
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-[#F0B35B]/0 
                before:via-white/40 before:to-[#F0B35B]/0
                before:-skew-x-45 before:animate-shine
              "
            >
              <span className="relative z-10">Assinar Agora</span>
            </motion.button>
          </div>

          {/* Card Plano Anual - Promoção Imperdível */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative ${commonAnimations.cardGradient} p-4 sm:p-6 lg:p-8 rounded-lg border-2 border-[#F0B35B]/30 w-full sm:w-[calc(33%-1rem)] max-w-[350px] mx-auto ${commonAnimations.glowEffect}`}
          >
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
              ⚡ 30% OFF ⚡
            </div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">Plano Anual</h3>
              </div>

              <div className="flex items-end">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0B35B]">R$ 34,90<span className="text-lg sm:text-xl text-[#F0B35B]">/mês</span></div>
              </div>
              <div className="text-xs sm:text-sm mt-2 text-gray-400 mb-3 sm:mb-4">
                de <span className="text-[#F0B35B]">R$ 600,00</span> por R$ 419,90
                <span className="text-xs text-gray-400 ml-2">em 12 meses</span>
              </div>
              <div className="bg-[#F0B35B]/10 p-1 rounded-lg mb-2 border border-[#F0B35B]/20">
                <div className="flex items-center text-[#F0B35B] mb-1">
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  <span className="text-xs">ECONOMIZE mais de R$ 180,00</span>
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {['Atualizações', 'Suporte 24/7', 'Backups diários', 'Sem limite de agendamentos', 'Relatórios avançados', 'Economia garantida', 'Acesso a novos recursos'].map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F0B35B] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                w-full py-2 sm:py-3 bg-gradient-to-r from-[#F0B35B] to-[#D4943D] text-black rounded-lg
                font-bold text-sm sm:text-base
                transition-all duration-300
                shadow-md hover:shadow-lg hover:shadow-[#F0B35B]/30
                border border-[#F0B35B]
              ">
                <div className="flex items-center justify-center">
                  <span>Assinar Agora</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Informação adicional */}
        <div className="text-center mt-6 sm:mt-8 text-gray-400 text-xs sm:text-sm">
          <p>Todos os planos incluem implementação gratuita e suporte técnico</p>
          <p className="mt-2">Garantia de 7 dias ou seu dinheiro de volta</p>
        </div>
      </div>
    </section>
  );
};

export default Planos;