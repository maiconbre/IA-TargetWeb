import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-[#F0B35B]/10 rounded-lg overflow-hidden bg-gradient-to-br from-[#252B3B] to-[#1A1F2E]"
    >
      <button
        onClick={onClick}
        className="w-full p-2.5 sm:p-3 md:p-4 flex items-center justify-between text-left hover:bg-[#F0B35B]/5 transition-colors duration-200"
      >
        <span className="font-semibold text-base sm:text-lg text-white pr-2">{question}</span>
        <ChevronDown 
          className={`w-4 h-4 sm:w-5 sm:h-5 text-[#F0B35B] transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 sm:p-6 pt-2 text-gray-200 text-sm sm:text-base leading-relaxed space-y-4 sm:space-y-6">
          <div className="whitespace-pre-line">
            {answer}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Como o sistema de agendamento funciona?",
      answer: "O sistema permite que seus clientes agendem serviços 24/7 através de uma interface intuitiva. Você recebe notificações em tempo real e tem controle total sobre sua agenda, com confirmações automáticas e lembretes para reduzir faltas."
    },
    {
      question: "Quanto tempo leva para implementar o sistema?",
      answer: "A implementação pode ser feita em menos de 48 horas. Nossa equipe oferece suporte completo durante todo o processo, garantindo que você e sua equipe estejam prontos para usar todas as funcionalidades."
    },
    {
      question: "O sistema funciona para múltiplos profissionais?",
      answer: "Sim! O sistema foi desenvolvido para gerenciar equipes de qualquer tamanho. Cada profissional tem sua própria agenda e você pode controlar permissões e visualizar relatórios individuais ou da equipe completa."
    },
    {
      question: "Como faço para começar a usar?",
      answer: "Você pode começar gratuitamente por 7 dias. Basta preencher o formulário no final da página e nossa equipe entrará em contato para configurar seu acesso e realizar um treinamento personalizado."
    },
    {
      question: "Quais relatórios o sistema oferece?",
      answer: "O sistema gera relatórios detalhados de faturamento, serviços mais procurados, horários de pico, desempenho da equipe, taxa de retorno de clientes e muito mais. Todos os dados são apresentados em dashboards intuitivos."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#1A1F2E] to-[#0D121E] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 z-0">
        <Parallax translateY={[-20, 20]} className="h-full">
          <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-64 h-48 sm:h-64 bg-[#F0B35B]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-4 sm:right-10 w-52 sm:w-72 h-52 sm:h-72 bg-[#F0B35B]/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </Parallax>
      </div>

      <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <Parallax speed={-5}>
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
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-[#F0B35B]/5 rounded-full border border-[#F0B35B]/10 mb-3 sm:mb-4"
          >
            <span className="text-[#F0B35B] text-xs sm:text-sm">Dúvidas Frequentes</span>
            <ArrowRight className="w-4 h-4 text-[#F0B35B]" />
          </motion.div>
          
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
            Perguntas <span className="text-[#F0B35B]">Frequentes</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-base px-2">
            Tire suas principais dúvidas sobre nossa plataforma
          </p>
          </motion.div>
        </Parallax>

        <Parallax speed={2} className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </Parallax>
      </div>
    </section>
  );
};

export default FAQ;
