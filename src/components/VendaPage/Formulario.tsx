import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface FormularioProps {
  commonAnimations: {
    headerGradient: string;
    cardGradient: string;
    glowEffect: string;
    buttonGradient: string;
    buttonShine: string;
  };
}

const Formulario: React.FC<FormularioProps> = ({ commonAnimations }) => {
  return (
    <section className="py-16 md:py-24 w-full relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F0B35B]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F0B35B]/20 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#F0B35B]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-[#F0B35B]/5 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Oferta Exclusiva Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#F0B35B]/5 text-[#F0B35B] rounded-full border border-[#F0B35B]/10 backdrop-blur-sm">
              <span className="animate-pulse text-xl">🎁</span>
              <span className="text-lg font-medium">Oferta Exclusiva</span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 mb-3">
                Experimente Gratuitamente por
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F0B35B] to-[#D4943D]">
                7 Dias Completos
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              Preencha o formulário abaixo e receba acesso ao sistema completo
              <br className="hidden sm:block" /> sem compromisso e sem necessidade de cartão de crédito
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`${commonAnimations.cardGradient} rounded-2xl p-6 sm:p-8 border border-[#F0B35B]/20 shadow-lg relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-card-shine"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Cadastre-se para Acesso Gratuito</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="barbershopName" className="block text-sm font-medium text-gray-300">Nome da Barbearia</label>
                      <input
                        type="text"
                        id="barbershopName"
                        placeholder="Ex: Barbearia Estilo"
                        className="w-full px-4 py-3 rounded-xl bg-[#252B3B] border border-[#F0B35B]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#F0B35B] focus:ring-1 focus:ring-[#F0B35B] transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-300">Instagram da Barbearia</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                        <input
                          type="text"
                          id="socialMedia"
                          placeholder="seu.instagram"
                          className="w-full pl-8 pr-4 py-3 rounded-xl bg-[#252B3B] border border-[#F0B35B]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#F0B35B] focus:ring-1 focus:ring-[#F0B35B] transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-300">Seu Nome</label>
                    <input
                      type="text"
                      id="ownerName"
                      placeholder="Nome completo"
                      className="w-full px-4 py-3 rounded-xl bg-[#252B3B] border border-[#F0B35B]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#F0B35B] focus:ring-1 focus:ring-[#F0B35B] transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">Seu E-mail</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="email@exemplo.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#252B3B] border border-[#F0B35B]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#F0B35B] focus:ring-1 focus:ring-[#F0B35B] transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300">WhatsApp</label>
                      <input
                        type="tel"
                        id="whatsapp"
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-[#252B3B] border border-[#F0B35B]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#F0B35B] focus:ring-1 focus:ring-[#F0B35B] transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="
                        w-full px-6 py-4 bg-gradient-to-r from-[#F0B35B] to-[#D4943D] text-black rounded-xl
                        text-lg font-bold
                        shadow-[0_0_25px_rgba(240,179,91,0.4)]
                        border-2 border-[#F0B35B]
                        transition-all duration-300
                        relative overflow-hidden
                        group
                      "
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 -skew-x-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Quero Testar Gratuitamente
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm">
                    Após o envio, nossa equipe analisará seu cadastro e enviará suas credenciais de acesso
                    <br className="hidden sm:block" /> e link personalizado em até <span className="text-[#F0B35B] font-medium">48 horas</span>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 bg-[#252B3B]/40 backdrop-blur-sm p-4 rounded-xl border border-[#F0B35B]/10"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#252B3B] flex items-center justify-center text-[#F0B35B] shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">Sem cartão de crédito</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 bg-[#252B3B]/40 backdrop-blur-sm p-4 rounded-xl border border-[#F0B35B]/10"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#252B3B] flex items-center justify-center text-[#F0B35B] shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">Acesso completo por 7 dias</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 bg-[#252B3B]/40 backdrop-blur-sm p-4 rounded-xl border border-[#F0B35B]/10"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#252B3B] flex items-center justify-center text-[#F0B35B] shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">Suporte personalizado</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Formulario;