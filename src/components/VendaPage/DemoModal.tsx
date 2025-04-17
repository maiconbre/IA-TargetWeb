import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Check} from 'lucide-react';

interface DemoStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
  features: { title: string; desc: string }[];
  color: string;
  image?: string;
  animate: any;
}

interface DemoModalProps {
  showDemo: boolean;
  setShowDemo: (show: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  demoSteps: DemoStep[];
}

const DemoModal: React.FC<DemoModalProps> = ({
  showDemo,
  setShowDemo,
  currentStep,
  setCurrentStep,
  demoSteps
}) => {
  const [, setIsExiting] = useState(false);
  
  // Verificar se demoSteps existe e tem elementos
  if (!demoSteps || demoSteps.length === 0) {
    return null;
  }

  // Garantir que currentStep esteja dentro dos limites
  const safeCurrentStep = Math.min(Math.max(0, currentStep), demoSteps.length - 1);
  const currentDemoStep = demoSteps[safeCurrentStep];

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowDemo(false);
      setIsExiting(false);
    }, 300);
  };

  const handleNext = () => {
    if (safeCurrentStep < demoSteps.length - 1) {
      setCurrentStep(safeCurrentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (safeCurrentStep > 0) {
      setCurrentStep(safeCurrentStep - 1);
    }
  };

  return (
    <AnimatePresence>
      {showDemo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div 
            className="min-h-screen px-3 xs:px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              className="w-full max-w-4xl mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0D121E] rounded-xl xs:rounded-2xl overflow-hidden border border-[#F0B35B]/20 shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-20 bg-[#1A1F2E]/90 backdrop-blur-sm border-b border-[#F0B35B]/10 px-3 xs:px-4 py-2 xs:py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base xs:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F0B35B] to-[#D4943D]">
                        BarberShop Pro
                      </h3>
                      <p className="text-gray-400 text-xs">Passo {safeCurrentStep + 1} de {demoSteps.length}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClose}
                      className="p-1.5 hover:bg-[#252B3B] rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="p-3 xs:p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                    {/* Sidebar com Steps mais compacta */}
                    <div className="md:w-1/3">
                      <div className="bg-[#252B3B]/50 rounded-lg xs:rounded-xl p-2 xs:p-3 md:sticky md:top-24">
                        <h4 className="text-xs xs:text-sm font-medium text-gray-400 mb-2 px-1">Navegue pelos passos</h4>
                        <div className="space-y-1.5">
                          {demoSteps.map((step, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => setCurrentStep(idx)}
                              whileHover={{ x: 4 }}
                              className={`w-full text-left p-2 rounded-lg transition-all ${
                                safeCurrentStep === idx 
                                  ? 'bg-[#F0B35B]/20 border border-[#F0B35B]' 
                                  : 'hover:bg-[#F0B35B]/10'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-5 h-5 xs:w-6 xs:h-6 rounded-lg ${
                                  safeCurrentStep === idx ? 'bg-[#F0B35B] text-black' : 'bg-[#1A1F2E] text-[#F0B35B]'
                                } flex items-center justify-center text-xs xs:text-sm font-medium`}>
                                  {idx + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-xs xs:text-sm truncate">{step.title}</div>
                                </div>
                                {safeCurrentStep === idx && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                  >
                                    <Check className="w-3 h-3 xs:w-4 xs:h-4 text-[#F0B35B]" />
                                  </motion.div>
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Área de Conteúdo */}
                    <div className="md:w-2/3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={safeCurrentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-[#252B3B]/30 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6"
                        >
                          <div className="flex items-start gap-3 xs:gap-4 mb-4 xs:mb-6">
                            <div className={`w-10 h-10 xs:w-12 xs:h-12 rounded-lg xs:rounded-xl flex-shrink-0 bg-gradient-to-br ${currentDemoStep.color} flex items-center justify-center`}>
                              {React.createElement(currentDemoStep.icon, { className: "w-5 h-5 xs:w-6 xs:h-6" })}
                            </div>
                            <div>
                              <h4 className="text-lg xs:text-xl font-bold text-white mb-1">{currentDemoStep.title}</h4>
                              <p className="text-gray-400 text-sm xs:text-base">{currentDemoStep.description}</p>
                            </div>
                          </div>

                          {/* Imagem do passo (se existir) */}
                          {currentDemoStep.image && (
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="mb-4 xs:mb-6 rounded-lg overflow-hidden"
                            >
                              <img 
                                src={currentDemoStep.image} 
                                alt={currentDemoStep.title} 
                                className="w-full h-auto object-cover"
                              />
                            </motion.div>
                          )}

                          <div className="space-y-4 xs:space-y-6">
                            {/* Lista de Detalhes */}
                            <div className="space-y-2 xs:space-y-3">
                              {currentDemoStep.details.map((detail, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center gap-2 text-gray-300 bg-[#1A1F2E]/50 p-2 xs:p-3 rounded-lg text-sm"
                                >
                                  <Check className="w-4 h-4 text-[#F0B35B] flex-shrink-0" />
                                  <span>{detail}</span>
                                </motion.div>
                              ))}
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3 mt-4 xs:mt-6">
                              {currentDemoStep.features.map((feature, idx) => (
                                <motion.div
                                  key={idx}
                                  whileHover={{ y: -2 }}
                                  className="bg-[#1A1F2E] p-3 xs:p-4 rounded-lg border border-[#F0B35B]/10"
                                >
                                  <div className="font-medium text-[#F0B35B] text-sm mb-1">{feature.title}</div>
                                  <div className="text-xs xs:text-sm text-gray-400">{feature.desc}</div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Footer com botões mais compactos */}
                <div className="sticky bottom-0 bg-[#1A1F2E] border-t border-[#F0B35B]/10 p-3 xs:p-4">
                  <div className="flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePrev}
                      className={`flex items-center gap-1.5 px-2 xs:px-3 py-1.5 rounded-lg text-xs xs:text-sm ${
                        safeCurrentStep === 0 
                          ? 'text-gray-500 cursor-not-allowed' 
                          : 'text-[#F0B35B] hover:bg-[#F0B35B]/10'
                      }`}
                      disabled={safeCurrentStep === 0}
                    >
                      <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4" />
                      <span className="hidden xs:inline">Anterior</span>
                    </motion.button>

                    {safeCurrentStep === demoSteps.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClose}
                        className="px-3 xs:px-4 py-1.5 bg-[#F0B35B] text-black rounded-lg text-xs xs:text-sm font-medium"
                      >
                        Começar Agora
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        className="flex items-center gap-1.5 px-2 xs:px-3 py-1.5 text-[#F0B35B] hover:bg-[#F0B35B]/10 rounded-lg text-xs xs:text-sm"
                      >
                        <span className="hidden xs:inline">Próximo</span>
                        <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;