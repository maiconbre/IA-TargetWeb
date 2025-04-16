import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Users, BarChart } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#1A1F2E] to-[#0D121E] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#F0B35B]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#F0B35B]/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F0B35B]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F0B35B]/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título da seção com animação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">Recursos <span className="text-[#F0B35B]">Poderosos</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Tudo o que você precisa para transformar sua barbearia em um negócio de sucesso</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
        >
          {[
            { icon: Clock, title: 'Economia de Tempo', desc: 'Reduza em até 70% o tempo gasto com agendamentos', delay: 0 },
            { icon: Calendar, title: 'Agenda Inteligente', desc: 'Organize todos os agendamentos em um só lugar', delay: 0.1 },
            { icon: Users, title: 'Gestão de Clientes', desc: 'Histórico completo e perfil de cada cliente', delay: 0.2 },
            { icon: BarChart, title: 'Relatórios Detalhados', desc: 'Análise completa do seu negócio', delay: 0.3 }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.5 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 25px rgba(240,179,91,0.2)",
                y: -5
              }}
              className="
                group p-6 sm:p-8 
                bg-gradient-to-br from-[#252B3B] to-[#1A1F2E] 
                rounded-xl border border-[#F0B35B]/10 
                transition-all duration-300 
                hover:border-[#F0B35B]/30
                relative overflow-hidden
              "
            >
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="
                w-16 h-16 rounded-full 
                bg-gradient-to-br from-[#F0B35B]/20 to-[#F0B35B]/5 
                flex items-center justify-center 
                mb-6 relative z-10
                group-hover:from-[#F0B35B]/30 group-hover:to-[#F0B35B]/10
                transition-all duration-300
              ">
                <item.icon className="w-8 h-8 text-[#F0B35B] group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#F0B35B] transition-colors duration-300 relative z-10">{item.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;