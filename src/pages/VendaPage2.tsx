import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useCountdown } from '../hooks/useCountdown';
import { UserPlus, Calendar, BarChart } from 'lucide-react';
import {
  Navbar,
  Hero,
  DemoModal,
  Planos,
  Features,
  CTA,
  Formulario,
  Footer
} from '../components/VendaPage';

// Configuração da promoção relâmpago
const PROMO_END_TIME = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
const SLOTS_LEFT = 3;

// CTAs otimizados com variantes de teste A/B
const ctaVariants = {
  primary: {
    text: "Comece Agora com 50% OFF",
    subtext: "Oferta válida por tempo limitado",
    urgency: "Apenas 3 descontos restantes!"
  },
  secondary: {
    text: "Ver Demonstração",
    subtext: "Conheça todas as funcionalidades"
  }
};

// Passos para o modal de demonstração
const demoSteps = [
  {
    id: 1,
    title: "Cadastro Rápido",
    description: "Configure sua barbearia em menos de 5 minutos",
    icon: UserPlus,
    details: [
      "Nome da barbearia",
      "Endereço e contato",
      "Serviços oferecidos",
      "Horário de funcionamento"
    ],
    features: [
      { title: "Fácil", desc: "Interface intuitiva" },
      { title: "Rápido", desc: "Menos de 5 minutos" },
      { title: "Completo", desc: "Todas as configurações necessárias" }
    ],
    color: "from-blue-500 to-blue-600",
    animate: {}
  },
  {
    id: 2,
    title: "Agendamento Online",
    description: "Seus clientes agendam diretamente pelo WhatsApp",
    icon: Calendar,
    details: [
      "Agendamento 24/7",
      "Confirmação automática",
      "Lembretes por WhatsApp",
      "Cancelamento fácil"
    ],
    features: [
      { title: "WhatsApp", desc: "Integração nativa" },
      { title: "Automatizado", desc: "Sem intervenção manual" },
      { title: "Conveniente", desc: "Para você e seus clientes" }
    ],
    color: "from-green-500 to-green-600",
    animate: {}
  },
  {
    id: 3,
    title: "Gestão Completa",
    description: "Acompanhe todos os aspectos do seu negócio",
    icon: BarChart,
    details: [
      "Dashboard intuitivo",
      "Relatórios financeiros",
      "Histórico de clientes",
      "Análise de desempenho"
    ],
    features: [
      { title: "Visual", desc: "Gráficos e estatísticas" },
      { title: "Detalhado", desc: "Informações completas" },
      { title: "Exportável", desc: "Dados para análise" }
    ],
    color: "from-purple-500 to-purple-600",
    animate: {}
  }
];

const VendaPage2: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);
  const { hours, minutes, seconds } = useCountdown(PROMO_END_TIME);
  const [currentStep, setCurrentStep] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Função para abrir o modal de demonstração sempre no primeiro passo
  const openDemoModal = () => {
    setCurrentStep(0); // Garante que sempre inicie no primeiro passo
    setShowDemo(true);
  };

  // Definição de animações comuns
  const commonAnimations = {
    headerGradient: "bg-gradient-to-br from-[#1A1F2E] to-[#0D121E]",
    cardGradient: "bg-gradient-to-br from-[#252B3B] to-[#1A1F2E]",
    glowEffect: "hover:shadow-[0_0_15px_rgba(240,179,91,0.3)]",
    buttonGradient: "bg-gradient-to-r from-[#F0B35B] to-[#D4943D]",
    buttonShine: "animate-shine relative overflow-hidden before:absolute before:inset-0 before:inset-0 before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
  };

  return (
    <>
      <Helmet>
        {/* SEO Meta Tags Básicas */}
        <title>BarberShop - Agendamento Online para Barbearias | Sem Cadastro, Sem App</title>
        <meta name="description" content="Sistema de agendamento para barbearias. Sem necessidade de cadastro ou aplicativo. Agende em 30 segundos e aumente seu faturamento em até 70%. Sistema completo de gestão." />
        <meta name="keywords" content="agendamento barbearia, sistema barbearia, agenda online, sem cadastro, sem aplicativo, gestão barbearia, software barbearia, agendamento online, barbeiro, barber shop" />
        <meta name="author" content="BarberShop" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="pt-BR" />
        <meta name="geo.region" content="BR-RJ" />
        <meta name="geo.placename" content="Rio de Janeiro" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://barber.targetweb.tech" />
        
        {/* Open Graph Tags para Facebook e outras redes sociais */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BarberShop - Agendamento Sem Complicação" />
        <meta property="og:description" content="Agende em 30 segundos, sem cadastro e sem baixar nada. Aumente seu faturamento em até 70% com nosso sistema completo." />
        <meta property="og:url" content="https://barber.targetweb.tech" />
        <meta property="og:site_name" content="BarberShop" />
        <meta property="og:image" content="https://barber.targetweb.tech/img/fotohero-optimized.avif" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/avif" />
        <meta property="og:image:alt" content="Sistema de agendamento para barbearias" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BarberShop - Agendamento Online para Barbearias" />
        <meta name="twitter:description" content="Sistema completo para gerenciar sua barbearia. Aumente seu faturamento em até 70%." />
        <meta name="twitter:image" content="https://barber.targetweb.tech/img/fotohero-optimized.avif" />
        <meta name="twitter:image:alt" content="Sistema de agendamento para barbearias" />
        
        {/* Tags para Google Ads */}
        <meta name="google-site-verification" content="seu-código-de-verificação" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Tags para Facebook Ads */}
        <meta name="facebook-domain-verification" content="seu-código-de-verificação" />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD para Rich Snippets */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "BarberShop",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "description": "Sistema de agendamento online para barbearias. Aumente seu faturamento em até 70%.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "127"
            }
          }
        `}</script>
        
        {/* Tags para remarketing */}
        <meta name="google-adwords-id" content="seu-id-adwords" />
        <meta name="facebook-pixel-id" content="seu-pixel-id" />
      </Helmet>

      <div className={`min-h-screen ${commonAnimations.headerGradient} text-white overflow-x-hidden w-full relative`}>
        {/* Componentes modulares */}
        <Navbar openDemoModal={openDemoModal} commonAnimations={commonAnimations} />
        <Hero heroRef={heroRef} commonAnimations={commonAnimations} />
        <Features />
        <Planos commonAnimations={commonAnimations} />
        <CTA 
          hours={hours} 
          minutes={minutes} 
          seconds={seconds} 
          slotsLeft={SLOTS_LEFT} 
        />
        <Formulario commonAnimations={commonAnimations} />
        <Footer commonAnimations={commonAnimations} />

        {/* Modal de demonstração */}
        {showDemo && (
          <DemoModal 
            showDemo={showDemo}
            setShowDemo={setShowDemo} 
            currentStep={currentStep} 
            setCurrentStep={setCurrentStep}
            demoSteps={demoSteps}
          />
        )}
      </div>
    </>
  );
};

export default VendaPage2;
