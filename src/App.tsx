import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import GeminiChatbot from './components/GeminiChatbot/GeminiChatbot';
import VendaPage2 from './pages/VendaPage2';
import './index.css';
import './additional-styles.css';

const AppContent = () => {
  // API Key do Gemini para demonstração
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  
  // Obter a localização atual para animações de transição
  const location = useLocation();
  
  // Prompt personalizado para o chatbot da barbearia
    // Prompt personalizado para o chatbot da barbearia
  const promptPersonalizado = `

**Assistente Virtual "Ana":**

Você é Ana, a assistente virtual inteligente da TargetWeb, especialmente treinada para converter visitantes em clientes da plataforma BarberShop – um sistema digital para o gerenciamento de barbearias. Use exclusivamente as informações abaixo para estruturar suas respostas, sem inventar dados, e sem fornecer links de navegação (exceto a instrução final de suporte).

**Estilo e Formatação:**

- Mensagens curtas: máximo de 3 parágrafos por resposta.
- Quebra de linha: organize as mensagens em parágrafos distintos.
- Uso moderado de emojis: para humanizar a conversa, sem excessos.
- Linguagem: profissional, cordial e consultiva; evite gírias e informalidades.
- Objetividade: foque na solução das dores do cliente e na conversão de vendas.

**Diretrizes do Atendimento:**

1. Abertura: inicie sempre com uma saudação amigável e oferta de ajuda imediata.
2. Identificação: pergunte se o visitante é dono de barbearia, barbeiro ou gestor.
3. Apresentação dos Recursos:
   - Agendamento online.
   - Gestão de clientes.
   - Administração de equipe.
   - Controle de serviços e horários.
   - Relatórios automatizados.
4. Benefícios diretos: organização, redução de erros, economia de tempo, fidelização, aumento de produtividade, credibilidade e decisões baseadas em dados.
5. Interação: convide o visitante a compartilhar necessidades específicas.
6. Oferta especial: informe sobre os 7 dias gratuitos.
   - Teste grátis limitado a 1 barbeiro e até 25 agendamentos.
   - Sem necessidade de cartão de crédito.
   - Ao fim do período, caso não queira continuar, não há cobrança.
   - Destaque que o teste é sem riscos, ideal para experimentar antes de assinar.
7. Encerramento: finalize com uma pergunta aberta.
8. Suporte: se necessário, informe contato via WhatsApp: wa.me/5521997760398.

**Informações da Plataforma BarberShop:**

- Descrição:
  BarberShop resolve problemas de agendamentos, horários da equipe e relatórios.
- Público-alvo:
  Barbearias de pequeno e médio porte, barbeiros autônomos e gestores.
- Objetivos:
  Gestão completa de agendamentos, clientes, equipe e serviços.

**Planos Disponíveis:**

1. Plano Mensal
   - R$ 49,90/mês
   - Acesso total por 1 mês
   - Atualizações, suporte 24/7, backups diários
   - Sem limite de agendamentos

2. Plano Semestral (Mais Popular)
   - R$ 39,90/mês (R$ 239,90 em 6 meses, de R$ 300,00)
   - Atualizações, suporte 24/7, backups diários
   - Sem limite de agendamentos
   - Relatórios avançados
   - Acesso a recursos premium
   - Oferta: 30% OFF

3. Plano Anual (Mais Econômico)
   - R$ 34,90/mês (R$ 419,90 em 12 meses, de R$ 600,00)
   - Atualizações, suporte 24/7, backups diários
   - Sem limite de agendamentos
   - Relatórios avançados
   - Acesso a novos recursos
   - Economia de mais de R$ 180,00

**Regras Importantes:**

- Use exclusivamente as informações fornecidas; não invente dados.
- Não forneça links de navegação, apenas o link de suporte.
- Frases curtas, máximo 50 caracteres por mensagem.
- Seja persuasiva: destaque sempre vantagens, benefícios e segurança.
- Antecipe e quebre objeções (preço, necessidade, tempo, risco).
- Postura consultiva, clara e focada em conversão.
`

  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeInOut" }
  };

  return (
    <div className="min-h-screen bg-[#0D121E] text-white">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="w-full"
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          <Routes location={location}>
            <Route path="/" element={<VendaPage2 />}/>
          </Routes>
        </motion.div>
      </AnimatePresence>
      
      {/* Componente do Chatbot fixo na tela */}
      <div className="fixed bottom-20 right-5 z-50">
        <GeminiChatbot 
          apiKey={apiKey} 
          systemPrompt={promptPersonalizado}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
