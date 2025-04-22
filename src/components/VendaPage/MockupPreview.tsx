import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Users, BarChart } from 'lucide-react';

interface MockupSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  color: string;
}

interface MockupPreviewProps {
  commonAnimations?: {
    headerGradient: string;
    cardGradient: string;
    glowEffect: string;
    buttonGradient: string;
    buttonShine: string;
  };
}

const MockupPreview: React.FC<MockupPreviewProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Dados dos slides
  const slides: MockupSlide[] = [
    {
      id: 1,
      title: "Agendamento Simplificado",
      description: "Seus clientes podem agendar serviços com apenas alguns cliques, escolhendo data, horário e profissional.",
      image: "/images/step1.gif",
      icon: Calendar,
      color: "from-green-500 to-green-600"
    },
    {
      id: 2,
      title: "Gestão de Clientes",
      description: "Acompanhe o histórico completo dos seus clientes, preferências e agendamentos anteriores.",
      image: "/images/step2.PNG",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      title: "Agenda Inteligente",
      description: "Gerencie seus agendamentos com facilidade, com visualização diária, semanal e mensal.",
      image: "/images/agenda.PNG",
      icon: Calendar,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Análise de Desempenho",
      description: "Acompanhe métricas importantes do seu negócio com gráficos e relatórios detalhados.",
      image: "/images/analise.PNG",
      icon: BarChart,
      color: "from-amber-500 to-amber-600"
    }
  ];

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Função para voltar ao slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Função para ir para um slide específico
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Configurar autoplay
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovered]);

  // Pausar autoplay ao passar o mouse
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Retomar autoplay ao remover o mouse
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className="py-8 xs:py-12 sm:py-16 px-2 xs:px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-6 xs:mb-8 sm:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-2 xs:mb-3"
          >
            Conheça a <span className="text-[#F0B35B]">Experiência</span> do App
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-xs xs:text-sm sm:text-base"
          >
            Interface intuitiva e amigável para você e seus clientes
          </motion.p>
        </div>

        {/* Container do carrossel */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Botões de navegação - Visíveis apenas em mobile/tablet */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-0 xs:left-2 top-1/2 -translate-y-1/2 z-10 bg-[#1A1F2E]/80 backdrop-blur-sm p-1.5 xs:p-2 rounded-full border border-[#F0B35B]/20 text-[#F0B35B] shadow-lg lg:hidden"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-0 xs:right-2 top-1/2 -translate-y-1/2 z-10 bg-[#1A1F2E]/80 backdrop-blur-sm p-1.5 xs:p-2 rounded-full border border-[#F0B35B]/20 text-[#F0B35B] shadow-lg lg:hidden"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5" />
          </motion.button>

          {/* Carrossel - Layout reorganizado para desktop */}
          <div className="flex flex-col lg:flex-row items-center gap-4 xs:gap-6 sm:gap-8 lg:gap-12">
            {/* Informações do slide atual - Agora à esquerda em desktop */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 flex flex-col items-center lg:items-start order-2 lg:order-1"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center lg:text-left"
                >
                  {/* Ícone e título */}
                  <div className="flex items-center justify-center lg:justify-start gap-2 xs:gap-3 mb-3 xs:mb-4">
                    <div className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center`}>
                      {React.createElement(slides[currentSlide].icon, { className: "w-4 h-4 xs:w-5 xs:h-5 text-white" })}
                    </div>
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white">{slides[currentSlide].title}</h3>
                  </div>
                  
                  {/* Descrição */}
                  <p className="text-gray-400 mb-4 xs:mb-6 text-xs xs:text-sm sm:text-base">
                    {slides[currentSlide].description}
                  </p>
                  
                  {/* Indicadores de slide */}
                  <div className="flex justify-center lg:justify-start gap-1.5 xs:gap-2 mb-4 xs:mb-6">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index 
                            ? 'bg-[#F0B35B] w-4 xs:w-5 sm:w-6' 
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        aria-label={`Ir para slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Botão de ação */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 xs:px-4 xs:py-2 bg-[#F0B35B] text-black rounded-lg text-xs xs:text-sm font-medium shadow-lg"
                  >
                    Ver mais recursos
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Mockup do iPhone - Agora à direita em desktop */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[300px] relative order-1 lg:order-2"
            >
              {/* Frame do iPhone */}
              <div className="relative mx-auto">
                {/* Borda do iPhone */}
                <div className="absolute inset-0 rounded-[2.5rem] xs:rounded-[3rem] border-[10px] xs:border-[12px] sm:border-[14px] border-[#1A1F2E] shadow-2xl"></div>
                
                {/* Notch do iPhone */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[20px] xs:h-[25px] sm:h-[30px] bg-[#1A1F2E] rounded-b-2xl z-10"></div>
                
                {/* Tela do iPhone */}
                <div className="w-full aspect-[9/19.5] rounded-[2rem] xs:rounded-[2.5rem] overflow-hidden bg-[#252B3B] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      {/* Imagem do slide atual */}
                      <div className="w-full h-full relative">
                        {slides[currentSlide].image.endsWith('.gif') ? (
                          <img 
                            src={slides[currentSlide].image} 
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img 
                            src={slides[currentSlide].image} 
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Botão home do iPhone */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100px] xs:w-[120px] h-[4px] xs:h-[5px] bg-[#1A1F2E] rounded-full"></div>
              </div>
            </motion.div>
          </div>

          {/* Botões de navegação para desktop - Mais sutis e posicionados nas laterais */}
          <div className="hidden lg:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="pointer-events-auto opacity-50 hover:opacity-100 transition-opacity bg-[#1A1F2E]/50 backdrop-blur-sm p-2 rounded-full border border-[#F0B35B]/10 text-[#F0B35B] shadow-lg ml-[46%]"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="pointer-events-auto opacity-50 hover:opacity-100 transition-opacity bg-[#1A1F2E]/50 backdrop-blur-sm p-2 rounded-full border border-[#F0B35B]/10 text-[#F0B35B] shadow-lg mr-4 lg:mr-40"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockupPreview; 
