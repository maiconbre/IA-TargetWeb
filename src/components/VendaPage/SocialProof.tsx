import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Star, ArrowRight, Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [constraints, setConstraints] = React.useState({ left: 0, right: 0 });

  // Array de depoimentos
  const testimonials = [
    {
      id: 1,
      name: "João Silva",
      business: "Barbearia Silva",
      location: "Rio de Janeiro, RJ",
      image: "/images/avatar1.png",
      quote: "Desde que comecei a usar o sistema, minha agenda está sempre cheia e organizada. Reduzi as faltas em mais de 80%!",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Santos",
      business: "Los Barberos",
      location: "São Paulo, SP",
      image: "/images/avatar2.png",
      quote: "O sistema é muito fácil de usar. Meus clientes adoram poder agendar pelo celular a qualquer hora.",
      rating: 5
    },
    {
      id: 3,
      name: "Pedro Costa",
      business: "Barber Kings",
      location: "Curitiba, PR",
      image: "/images/avatar3.png",
      quote: "Não perco mais tempo respondendo WhatsApp. O sistema faz tudo automaticamente e meu faturamento aumentou.",
      rating: 5
    },
    {
      id: 4,
      name: "Ana Oliveira",
      business: "Studio Beauty",
      location: "Belo Horizonte, MG",
      image: "/images/avatar4.png",
      quote: "Excelente sistema! Ajudou muito na organização do meu salão. Recomendo para todos os profissionais.",
      rating: 5
    },
    {
      id: 5,
      name: "Lucas Mendes",
      business: "Barbearia Vintage",
      location: "Salvador, BA",
      image: "/images/avatar5.png",
      quote: "Depois que implementei o sistema, minha produtividade aumentou significativamente. Vale cada centavo!",
      rating: 5
    },
    {
      id: 6,
      name: "Mariana Santos",
      business: "Mari Hair",
      location: "Florianópolis, SC",
      image: "/images/avatar6.png",
      quote: "Sistema completo e fácil de usar. O suporte é excelente e sempre me ajuda quando preciso.",
      rating: 5
    }
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const updateConstraints = () => {
      if (carouselRef.current) {
        setIsPaused(true);
        setConstraints({
          left: -carouselRef.current.scrollWidth,
          right: 0
        });
        // Resume animation after a short delay
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setIsPaused(false), 100);
      }
    };

    // Initial update
    updateConstraints();

    // Setup ResizeObserver
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateConstraints, 250); // Debounce resize updates
    });

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [testimonials.length]);

  const handleInteractionStart = React.useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleInteractionEnd = React.useCallback(() => {
    setIsPaused(false);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#1A1F2E] to-[#0D121E] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 z-0">
        <Parallax translateY={[-15, 15]} className="h-full">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#F0B35B]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#F0B35B]/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </Parallax>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título da seção com animação */}
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
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F0B35B]/5 rounded-full border border-[#F0B35B]/10 mb-4"
            >
              <span className="text-[#F0B35B] text-sm">O que dizem nossos usuários</span>
              <ArrowRight className="w-4 h-4 text-[#F0B35B]" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
              Histórias de <span className="text-[#F0B35B]">Sucesso</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Veja o que outros profissionais estão achando do nosso sistema
            </p>
          </motion.div>
        </Parallax>

        {/* Carousel de depoimentos */}
        <Parallax speed={2} className="relative w-full overflow-hidden mask-image-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] group">
          <motion.div
            ref={carouselRef}
            className="flex gap-20 md:gap-12"
            style={{ 
              width: 'fit-content',
              cursor: 'grab',
              touchAction: 'pan-y pinch-zoom'
            }}
            initial={{ x: 0 }}
            animate={{
              x: isPaused ? undefined : [0, "-50%"]
            }}
            transition={{
              x: {
                duration: 25,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0
              }
            }}
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
            onDrag={() => {
              if (!isPaused) setIsPaused(true);
            }}
            onDragStart={handleInteractionStart}
            onDragEnd={(_, info) => {
              handleInteractionEnd();
              const velocity = Math.abs(info.velocity.x);
              if (velocity > 100) {
                setIsPaused(true);
                const delay = Math.min(1000, Math.max(300, velocity * 2));
                setTimeout(() => setIsPaused(false), delay);
              }
            }}
            whileDrag={{ cursor: "grabbing" }}
            onHoverStart={handleInteractionStart}
            onHoverEnd={handleInteractionEnd}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
              handleInteractionStart();
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              handleInteractionEnd();
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="group relative bg-gradient-to-br from-[#252B3B] to-[#1A1F2E] rounded-xl p-4 sm:p-6 border border-[#F0B35B]/10 hover:border-[#F0B35B]/30 transition-all duration-300"
                style={{ width: 'min(360px, 80vw)', flexShrink: 0 }}
            >
              {/* Aspas decorativas */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-[#F0B35B]/10" />

              {/* Cabeçalho do card */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F0B35B]/20 flex items-center justify-center text-[#F0B35B] font-bold text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-xs sm:sm">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm sm:text-md">{testimonial.business}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs">{testimonial.location}</p>
                </div>
              </div>

              {/* Estrelas */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#F0B35B] text-[#F0B35B]" />
                ))}
              </div>

              {/* Depoimento */}
              <p className="text-gray-300 text-sm sm:text-md leading-relaxed min-h-[80px]">
                "{testimonial.quote}"
              </p>

            </motion.div>
            ))}
          </motion.div>
        </Parallax>

        {/* Chamada para ação */}
        <Parallax speed={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 text-center"
          >
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Junte-se a milhares de profissionais que já estão transformando seus negócios
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#F0B35B] text-black rounded-lg font-medium text-sm sm:text-base"
          >
            Começar Agora
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
};

export default SocialProof;
