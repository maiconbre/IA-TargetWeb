import React, { useState, useRef, useEffect } from 'react';
import './GeminiChatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isComplete: boolean;
}

interface GeminiChatbotProps {
  apiKey: string;
  systemPrompt?: string;
}

// Função melhorada para detectar e transformar links em elementos clicáveis
const processMessageWithLinks = (text: string): React.ReactNode => {
  // Regex aprimorada para capturar links do WhatsApp (wa.me/número)
  // Adicionamos uma verificação de limite de palavra (\b) para evitar duplicação
  const whatsappLinkRegex = /\b(wa\.me\/\d+)\b/g;
  
  // Se não houver links, retornar o texto original
  if (!whatsappLinkRegex.test(text)) {
    return text;
  }
  
  // Encontrar todas as ocorrências de links
  const matches = Array.from(text.matchAll(whatsappLinkRegex));
  
  if (matches.length === 0) return text;
  
  // Criar resultado com links substituídos
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  
  matches.forEach((match, index) => {
    const [fullMatch] = match;
    const matchIndex = match.index as number;
    
    // Adicionar texto antes do link
    if (matchIndex > lastIndex) {
      result.push(text.substring(lastIndex, matchIndex));
    }
    
    // Adicionar o link como elemento clicável
    result.push(
      <a 
        key={`link-${index}`}
        href={`https://${fullMatch}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="gemini-chatbot-link"
      >
        {fullMatch}
      </a>
    );
    
    lastIndex = matchIndex + fullMatch.length;
  });
  
  // Adicionar qualquer texto restante após o último link
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }
  
  return result;
};

const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ 
  apiKey, 
  systemPrompt 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', text: "Olá, como posso ajudar hoje?", sender: 'bot', isComplete: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animatingBetween, setAnimatingBetween] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rolar para a mensagem mais recente quando novas mensagens são adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Manter o foco no input após enviar mensagem
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading, messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const generateUniqueId = (): string => {
    return `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Função para fragmentar mensagens longas em parágrafos completos - corrigida
  const fragmentMessage = (text: string, sender: 'bot'): void => {
    // Verificar se o texto contém links do WhatsApp
    const containsWhatsAppLink = /\bwa\.me\/\d+\b/g.test(text);
    
    if (containsWhatsAppLink) {
      // Se contiver links do WhatsApp, não fragmentar a mensagem para evitar problemas
      const msgId = generateUniqueId();
      setMessages(prev => [...prev, { 
        id: msgId, 
        text: text, 
        sender, 
        isComplete: true 
      }]);
      
      // Mostrar animação brevemente e depois remover
      setAnimatingBetween(msgId);
      setTimeout(() => {
        setAnimatingBetween(null);
      }, 2000);
      
      return;
    }
    
    // Para mensagens sem links, continuar com a lógica de fragmentação original
    // Dividir a mensagem em parágrafos
    let paragraphs = text.split(/(?<=\.)\s+/);
    
    // Combinar os parágrafos muito curtos
    const consolidatedParagraphs: string[] = [];
    let currentParagraph = '';
    
    for (const paragraph of paragraphs) {
      if (currentParagraph.length + paragraph.length < 100) {
        currentParagraph += (currentParagraph ? ' ' : '') + paragraph;
      } else {
        if (currentParagraph) {
          consolidatedParagraphs.push(currentParagraph);
        }
        currentParagraph = paragraph;
      }
    }
    
    if (currentParagraph) {
      consolidatedParagraphs.push(currentParagraph);
    }
    
    // Limitar a 3 mensagens e garantir que todas terminem com ponto final
    const finalParagraphs: string[] = [];
    if (consolidatedParagraphs.length <= 3) {
      finalParagraphs.push(...consolidatedParagraphs);
    } else {
      // Distribuir o conteúdo em 3 partes proporcionais
      const combinedText = consolidatedParagraphs.join(' ');
      const avgLength = Math.ceil(combinedText.length / 3);
      
      let currentSegment = '';
      let segmentCount = 0;
      
      for (const paragraph of consolidatedParagraphs) {
        if (segmentCount < 2 && (currentSegment.length + paragraph.length > avgLength)) {
          finalParagraphs.push(currentSegment);
          currentSegment = paragraph;
          segmentCount++;
        } else {
          currentSegment += (currentSegment ? ' ' : '') + paragraph;
        }
      }
      
      // Adicionar o último segmento
      if (currentSegment) {
        finalParagraphs.push(currentSegment);
      }
    }
    
    // Garantir que cada fragmento termine com um ponto final (exceto se já tiver pontuação)
    finalParagraphs.forEach((paragraph, index) => {
      if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
        finalParagraphs[index] = paragraph + '.';
      }
    });

    // Adicionar o primeiro fragmento imediatamente
    const firstMsgId = generateUniqueId();
    setMessages(prev => [...prev, { 
      id: firstMsgId, 
      text: finalParagraphs[0], 
      sender, 
      isComplete: finalParagraphs.length === 1 
    }]);
    
    // Se houver animação entre mensagens, mostrar após a primeira mensagem
    if (finalParagraphs.length > 1) {
      setAnimatingBetween(firstMsgId);
    }
    
    // Adicionar os fragmentos restantes com intervalo
    if (finalParagraphs.length > 1) {
      finalParagraphs.slice(1).forEach((fragment, index) => {
        setTimeout(() => {
          const newMsgId = generateUniqueId();
          setMessages(prev => {
            // Marcar fragmento anterior como completo
            const updatedMessages = prev.map(msg => {
              if (index === 0 && msg.id === firstMsgId) {
                return { ...msg, isComplete: true };
              } else if (index > 0 && prev.length > 0 && msg.id === prev[prev.length - 1].id) {
                return { ...msg, isComplete: true };
              }
              return msg;
            });
            
            // Adicionar novo fragmento
            return [...updatedMessages, { 
              id: newMsgId, 
              text: fragment, 
              sender, 
              isComplete: index === finalParagraphs.length - 2
            }];
          });
          
          // Mover animação para após a nova mensagem
          setAnimatingBetween(newMsgId);
          
          // Se for o último fragmento, limpar a animação após um tempo
          if (index === finalParagraphs.length - 2) {
            setTimeout(() => {
              setAnimatingBetween(null);
            }, 2000);
          }
        }, (index + 1) * 2000); // 2 segundos de intervalo entre fragmentos
      });
    } else {
      // Se for apenas um fragmento, mostrar animação por 2 segundos e depois remover
      setTimeout(() => {
        setAnimatingBetween(null);
      }, 2000);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    // Adicionar mensagem do usuário
    const userMessageId = generateUniqueId();
    const userMessage = { id: userMessageId, text: inputText, sender: 'user' as const, isComplete: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    // Mostrar animação após a mensagem do usuário
    setAnimatingBetween(userMessageId);

    try {
      // Construir o histórico de mensagens no formato correto para a API Gemini
      const messageHistory = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      // Adicionar a mensagem atual do usuário
      messageHistory.push({
        role: 'user',
        parts: [{ text: inputText }]
      });

      // Preparar o corpo da solicitação no formato correto
      const requestBody = {
        contents: [
          // Adicionar o system prompt como uma mensagem do modelo no início
          {
            role: 'model',
            parts: [{ text: systemPrompt || "Você é um assistente virtual útil e amigável." }]
          },
          ...messageHistory
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      };

      // Fazer a chamada para a API do Gemini
      // Usando o modelo gemini-2.0-flash conforme documentação mais recente
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // Se a resposta não for bem-sucedida, tentar com o modelo gemini-pro como fallback
        const fallbackResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: (systemPrompt || "Você é um assistente virtual útil e amigável.") + 
                    "\n\nHistórico de conversa:\n" + 
                    messages.map(msg => `${msg.sender === 'user' ? 'Usuário' : 'Assistente'}: ${msg.text}`).join("\n") +
                    "\n\nUsuário: " + inputText }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          }),
        });

        if (!fallbackResponse.ok) {
          throw new Error(`Erro na API: ${fallbackResponse.status} ${fallbackResponse.statusText}`);
        }

        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.candidates && fallbackData.candidates[0]?.content?.parts && fallbackData.candidates[0].content.parts[0]?.text) {
          const botResponse = fallbackData.candidates[0].content.parts[0].text;
          fragmentMessage(botResponse, 'bot');
        } else {
          throw new Error('Formato de resposta inesperado');
        }
      } else {
        const data = await response.json();
        
        // Verificar se a resposta contém o conteúdo esperado
        if (data.candidates && data.candidates[0]?.content?.parts && data.candidates[0].content.parts[0]?.text) {
          const botResponse = data.candidates[0].content.parts[0].text;
          fragmentMessage(botResponse, 'bot');
        } else {
          throw new Error('Formato de resposta inesperado');
        }
      }
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      fragmentMessage("Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, verifique sua conexão e tente novamente.", 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="gemini-chatbot-container">
      <button 
        className="gemini-chatbot-button" 
        onClick={toggleChat}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      <div className={`gemini-chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="gemini-chatbot-header">
          <h3 className="gemini-chatbot-title">Assistente Virtual</h3>
          <button 
            className="gemini-chatbot-close" 
            onClick={toggleChat}
            aria-label="Fechar chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="gemini-chatbot-messages">
          {messages.map((message, index) => (
            <React.Fragment key={message.id}>
              <div className={`gemini-chatbot-message ${message.sender}`}>
                {processMessageWithLinks(message.text)}
              </div>
              
              {/* Animação entre mensagens */}
              {animatingBetween === message.id && (
                <div className="gemini-chatbot-animation-between">
                  <div className="gemini-chatbot-typing-dot"></div>
                  <div className="gemini-chatbot-typing-dot"></div>
                  <div className="gemini-chatbot-typing-dot"></div>
                </div>
              )}
            </React.Fragment>
          ))}
          
          {isLoading && !animatingBetween && (
            <div className="gemini-chatbot-loading">
              <div className="gemini-chatbot-loading-dot"></div>
              <div className="gemini-chatbot-loading-dot"></div>
              <div className="gemini-chatbot-loading-dot"></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="gemini-chatbot-input-container">
          <input
            type="text"
            className="gemini-chatbot-input"
            placeholder="Digite sua mensagem..."
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            ref={inputRef}
          />
          <button 
            className="gemini-chatbot-send" 
            onClick={sendMessage}
            disabled={isLoading || inputText.trim() === ''}
            aria-label="Enviar mensagem"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiChatbot;