import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Users, BarChart, ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#1A1F2E] to-[#0D121E] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#F0B35B]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#F0B35B]/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F0B35B]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F0B35B]/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Título da seção com animação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F0B35B]/5 rounded-full border border-[#F0B35B]/10 mb-4"
          >
            <span className="text-[#F0B35B] text-sm">Recursos Exclusivos</span>
            <ArrowRight className="w-4 h-4 text-[#F0B35B]" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
            Recursos <span className="text-[#F0B35B]">Poderosos</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Tudo o que você precisa para transformar sua barbearia em um negócio de sucesso
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
        >
          {[
            { 
              icon: Clock, 
              title: 'Economize Tempo Real', 
              desc: 'Reduza 80% do tempo gasto com agendamentos. Sistema automatizado que gerencia toda sua agenda, permitindo focar no que realmente importa: atender seus clientes.',
              highlight: 'Economia 4h/dia',
              metrics: {
                label: 'Tempo economizado/mês',
                value: '80 horas'
              },
              delay: 0 
            },
            { 
              icon: Calendar, 
              title: 'Agenda Profissional', 
              desc: 'Sistema inteligente que elimina conflitos de horários, reduz faltas com lembretes automáticos e permite agendamento 24/7 pelo cliente.',
              highlight: 'Zero Conflitos',
              metrics: {
                label: 'Redução de faltas',
                value: '-85%'
              },
              delay: 0.1 
            },
            { 
              icon: BarChart, 
              title: 'Gestão Completa', 
              desc: 'Acompanhe em tempo real seu faturamento, serviços mais lucrativos e horários de pico. Tome decisões baseadas em dados para maximizar seus lucros.',
              highlight: 'Mais Lucro',
              metrics: {
                label: 'Aumento no faturamento',
                value: '+45%'
              },
              delay: 0.3 
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.5 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 25px rgba(240,179,91,0.2)",
                y: -3
              }}
              className="
                group p-4 sm:p-6
                bg-gradient-to-br from-[#252B3B] to-[#1A1F2E] 
                rounded-xl border border-[#F0B35B]/10 
                transition-all duration-300 
                hover:border-[#F0B35B]/30
                relative overflow-hidden
                flex flex-col
              "
            >
              {/* Tag de destaque */}
              <div className="absolute top-3 right-3 bg-[#F0B35B]/10 px-2 py-1 rounded-full">
                <span className="text-[#F0B35B] text-[10px] sm:text-xs font-medium">{item.highlight}</span>
              </div>

              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="
                w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                bg-gradient-to-br from-[#F0B35B]/20 to-[#F0B35B]/5 
                flex items-center justify-center 
                mb-4 relative z-10
                group-hover:from-[#F0B35B]/30 group-hover:to-[#F0B35B]/10
                transition-all duration-300
              ">
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#F0B35B] group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#F0B35B] transition-colors duration-300 relative z-10">
                {item.title}
              </h3>
              
              <p className="text-[13px] sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10 flex-grow">
                {item.desc}
              </p>

              <div className="mt-4 pt-4 border-t border-[#F0B35B]/10 relative z-10">
                <div className="flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="text-gray-500">{item.metrics.label}</span>
                  <span className="text-[#F0B35B] font-semibold">{item.metrics.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;