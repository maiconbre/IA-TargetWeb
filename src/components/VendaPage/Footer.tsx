import React from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface FooterProps {
  commonAnimations: {
    headerGradient: string;
    cardGradient: string;
    glowEffect: string;
    buttonGradient: string;
    buttonShine: string;
  };
}

const Footer: React.FC<FooterProps> = ({ commonAnimations }) => {
  return (
    <footer className="relative overflow-hidden pb-12">
      {/* Gradiente de fundo */}
      <div className={`absolute inset-0 ${commonAnimations.headerGradient} opacity-95`} />
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0">
        <Parallax translateY={[-15, 15]} className="h-full">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#F0B35B]/5 rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#F0B35B]/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000" />
        </Parallax>
      </div>

      <div className="relative border-t border-[#F0B35B]/10">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Logo e Descrição */}
            <div className="md:col-span-5 space-y-4 sm:space-y-6">
              <Parallax speed={-5}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#F0B35B]">BarberShop</h2>
                <p className="text-[13px] sm:text-sm leading-relaxed text-gray-400">
                  Transforme sua barbearia com nossa solução completa de gestão. 
                  Aumente seu faturamento, reduza faltas e tenha mais tempo livre 
                  com nosso sistema intuitivo e profissional.
                </p>
                
                {/* Newsletter */}
                <div className="pt-2 sm:pt-4">
                  <h3 className="text-white text-xs sm:text-sm font-medium mb-2 sm:mb-3">Receba dicas exclusivas:</h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      className="w-full sm:flex-1 bg-[#252B3B] border border-[#F0B35B]/20 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#F0B35B]/50"
                    />
                    <button className="w-full sm:w-auto bg-[#F0B35B] hover:bg-[#E5A44D] text-black font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                      <span className="text-xs sm:text-sm">Enviar</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
            </div>
          </div>

                {/* Social Links */}
                <div className="flex gap-3 sm:gap-4 pt-2">
                  {[
                    { icon: Instagram, link: '#' },
                    { icon: Facebook, link: '#' },
                    { icon: Twitter, link: '#' }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.link}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#252B3B] border border-[#F0B35B]/20 flex items-center justify-center text-gray-400 hover:text-[#F0B35B] hover:border-[#F0B35B]/50 transition-all duration-300"
                    >
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
              </Parallax>
            </div>

            {/* Links e Contato */}
            <div className="md:col-span-7">
              <Parallax speed={-2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {/* Links Rápidos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Links Rápidos</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      'Início',
                      'Recursos',
                      'Planos',
                      'Demonstração',
                      'Contato'
                    ].map((item) => (
                      <motion.li
                        key={item}
                        whileHover={{ x: 5 }}
                        className="transform transition-transform duration-200"
                      >
                        <a href="#" className="text-gray-400 hover:text-[#F0B35B] transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 group text-[13px] sm:text-sm">
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>{item}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

          {/* Contato */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Contato</h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      { icon: Mail, text: 'contato@barbershop.com.br' },
                      { icon: Phone, text: '(21) 99776-0398' },
                      { icon: MapPin, text: 'Rio de Janeiro, RJ' }
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2 sm:gap-3 group"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#252B3B] border border-[#F0B35B]/20 flex items-center justify-center group-hover:border-[#F0B35B]/50 transition-all duration-300">
                          <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0B35B]" />
                        </div>
                        <span className="text-[13px] sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.text}</span>
                      </motion.li>
                    ))}
            </ul>
                </motion.div>
              </div>
              </Parallax>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <Parallax speed={1}>
          <div className="border-t border-[#F0B35B]/10">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="text-gray-500 text-[11px] sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} BarberShop. Todos os direitos reservados.
          </p>
              <div className="flex gap-4 sm:gap-6">
                <a href="/terms-of-use" className="text-gray-500 hover:text-gray-400 text-[11px] sm:text-sm">Termos de Uso</a>
                <a href="/privacy-policy" className="text-gray-500 hover:text-gray-400 text-[11px] sm:text-sm">Privacidade</a>
              </div>
            </div>
          </div>
          </div>
        </Parallax>
      </div>
    </footer>
  );
};

export default Footer;
