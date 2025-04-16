import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface DemoStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
  features: { title: string; desc: string }[];
  color: string;
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
  // Verificar se demoSteps existe e tem elementos
  if (!demoSteps || demoSteps.length === 0) {
    return null;
  }

  // Garantir que currentStep esteja dentro dos limites
  const safeCurrentStep = Math.min(Math.max(0, currentStep), demoSteps.length - 1);
  const currentDemoStep = demoSteps[safeCurrentStep];

  return (
    <AnimatePresence>
      {showDemo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-4 py-8">
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0D121E] rounded-2xl overflow-hidden border border-[#F0B35B]/20">
                {/* Header */}
                <div className="sticky top-0 z-20 bg-[#1A1F2E] border-b border-[#F0B35B]/10 px-4 py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F0B35B] to-[#D4943D]">
                        Como Funciona
                      </h3>
                      <p className="text-gray-400 text-xs">Passo {safeCurrentStep + 1} de {demoSteps.length}</p>
                    </div>
                    <button
                      onClick={() => setShowDemo(false)}
                      className="p-1.5 hover:bg-[#252B3B] rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Sidebar com Steps mais compacta */}
                    <div className="md:col-span-4">
                      <div className="bg-[#252B3B]/50 rounded-xl p-3 sticky top-24">
                        {demoSteps.map((step, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setCurrentStep(idx)}
                            whileHover={{ x: 4 }}
                            className={`w-full text-left p-2.5 rounded-lg mb-2 transition-all ${
                              safeCurrentStep === idx 
                                ? 'bg-[#F0B35B]/20 border border-[#F0B35B]' 
                                : 'hover:bg-[#F0B35B]/10'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-lg ${
                                safeCurrentStep === idx ? 'bg-[#F0B35B] text-black' : 'bg-[#1A1F2E] text-[#F0B35B]'
                              } flex items-center justify-center text-sm font-medium`}>
                                {idx + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{step.title}</div>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Área de Conteúdo */}
                    <div className="md:col-span-8">
                      <motion.div
                        key={safeCurrentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-[#252B3B]/30 rounded-xl p-6"
                      >
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`w-12 h-12 rounded-xl flex-shrink-0 bg-gradient-to-br ${currentDemoStep.color} flex items-center justify-center`}>
                            {React.createElement(currentDemoStep.icon, { className: "w-6 h-6" })}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{currentDemoStep.title}</h4>
                            <p className="text-gray-400">{currentDemoStep.description}</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Lista de Detalhes */}
                          <div className="space-y-3">
                            {currentDemoStep.details.map((detail, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-2 text-gray-300 bg-[#1A1F2E]/50 p-3 rounded-lg"
                              >
                                {detail}
                              </motion.div>
                            ))}
                          </div>

                          {/* Features Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {currentDemoStep.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ y: -2 }}
                                className="bg-[#1A1F2E] p-4 rounded-lg border border-[#F0B35B]/10"
                              >
                                <div className="font-medium text-[#F0B35B] mb-1">{feature.title}</div>
                                <div className="text-sm text-gray-400">{feature.desc}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Footer com botões mais compactos */}
                <div className="sticky bottom-0 bg-[#1A1F2E] border-t border-[#F0B35B]/10 p-4">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => safeCurrentStep > 0 && setCurrentStep(safeCurrentStep - 1)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                        safeCurrentStep === 0 
                          ? 'text-gray-500 cursor-not-allowed' 
                          : 'text-[#F0B35B] hover:bg-[#F0B35B]/10'
                      }`}
                      disabled={safeCurrentStep === 0}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Anterior</span>
                    </button>

                    {safeCurrentStep === demoSteps.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDemo(false)}
                        className="px-4 py-1.5 bg-[#F0B35B] text-black rounded-lg text-sm font-medium"
                      >
                        Começar
                      </motion.button>
                    ) : (
                      <button
                        onClick={() => setCurrentStep(safeCurrentStep + 1)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[#F0B35B] hover:bg-[#F0B35B]/10 rounded-lg text-sm"
                      >
                        <span className="hidden sm:inline">Próximo</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;