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
  chatTitle?: string;
  primaryColor?: string;
}

// Função melhorada para detectar e transformar links em elementos clicáveis
const processMessageWithLinks = (text: string): React.ReactNode => {
  // Regex aprimorada para capturar diferentes tipos de links
  const linkRegex = /\b(https?:\/\/\S+|wa\.me\/\d+)\b/g;
  
  // Se não houver links, retornar o texto original
  if (!linkRegex.test(text)) {
    return text;
  }
  
  // Encontrar todas as ocorrências de links
  const matches = Array.from(text.matchAll(linkRegex));
  
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
    
    // Preparar URL completa para o link
    const url = fullMatch.startsWith('http') ? fullMatch : `https://${fullMatch}`;
    
    // Adicionar o link como elemento clicável
    result.push(
      <a 
        key={`link-${index}`}
        href={url} 
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
  systemPrompt,
  chatTitle = "Assistente Virtual Ana",
  primaryColor = "#F0B35B"  // Cor dourada definida no CSS
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
  const [isEmptyInput, setIsEmptyInput] = useState(true);
  const [showClearButton, setShowClearButton] = useState(false);

  // Definir variáveis CSS para cores personalizadas apenas se for diferente da padrão
  useEffect(() => {
    // Não sobrescrever as variáveis CSS se a cor for a padrão
    if (primaryColor !== "#F0B35B") {
      document.documentElement.style.setProperty('--chatbot-primary-color', primaryColor);
      document.documentElement.style.setProperty('--chatbot-primary-hover', adjustColor(primaryColor, -20));
    }
  }, [primaryColor]);

  // Função para ajustar a cor (clareando ou escurecendo)
  const adjustColor = (color: string, amount: number): string => {
    // Converter hex para RGB
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    
    // Ajustar valores
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    
    // Converter de volta para hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Verificar se há mensagens para mostrar o botão de limpar
  useEffect(() => {
    setShowClearButton(messages.length > 1);
  }, [messages]);

  // Rolar para a mensagem mais recente quando novas mensagens são adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Manter o foco no input após enviar mensagem
  useEffect(() => {
    if (!isLoading && inputRef.current && isOpen) {
      inputRef.current.focus();
    }
  }, [isLoading, messages, isOpen]);

  // Adicionar evento de tecla ESC para fechar o chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Focar no input quando o chat é aberto
    if (!isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);
    setIsEmptyInput(value.trim() === '');
  };

  const generateUniqueId = (): string => {
    return `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Limpar o histórico de conversa
  const clearChat = () => {
    setMessages([
      { id: 'welcome', text: "Olá, como posso ajudar hoje?", sender: 'bot', isComplete: true }
    ]);
    setInputText('');
    setIsEmptyInput(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Função melhorada para fragmentar mensagens longas em parágrafos
  const fragmentMessage = (text: string, sender: 'bot'): void => {
    // Verificar se o texto contém links
    const containsLink = /\b(https?:\/\/\S+|wa\.me\/\d+)\b/g.test(text);
    
    // Limpar pontuação excessiva - correção principal
    // Não adicionar pontos após pontos de interrogação/exclamação
    const cleanText = text.replace(/([!?])\./g, '$1');
    
    if (containsLink || cleanText.length < 150) {
      // Se contiver links ou for uma mensagem curta, não fragmentar
      const msgId = generateUniqueId();
      setMessages(prev => [...prev, { 
        id: msgId, 
        text: cleanText, 
        sender, 
        isComplete: true 
      }]);
      
      // Mostrar animação brevemente e depois remover
      setAnimatingBetween(msgId);
      setTimeout(() => {
        setAnimatingBetween(null);
      }, 1500);
      
      return;
    }
    
    // Dividir a mensagem em frases/sentenças (usando ponto, interrogação ou exclamação)
    let sentences = cleanText.split(/(?<=[.!?])\s+/);
    
    // Agrupar sentenças em fragmentos legíveis
    const fragments: string[] = [];
    let currentFragment = '';
    
    for (const sentence of sentences) {
      if (currentFragment.length + sentence.length < 200) {
        currentFragment += (currentFragment ? ' ' : '') + sentence;
      } else {
        if (currentFragment) {
          fragments.push(currentFragment);
        }
        currentFragment = sentence;
      }
    }
    
    if (currentFragment) {
      fragments.push(currentFragment);
    }
    
    // Limitar a no máximo 3 fragmentos para não sobrecarregar o chat
    const finalFragments: string[] = [];
    if (fragments.length <= 3) {
      finalFragments.push(...fragments);
    } else {
      // Distribuir o conteúdo em 3 partes lógicas
      const firstThird = Math.floor(fragments.length / 3);
      const secondThird = firstThird * 2;
      
      finalFragments.push(
        fragments.slice(0, firstThird).join(' '),
        fragments.slice(firstThird, secondThird).join(' '),
        fragments.slice(secondThird).join(' ')
      );
    }

    // Adicionar o primeiro fragmento imediatamente
    const firstMsgId = generateUniqueId();
    setMessages(prev => [...prev, { 
      id: firstMsgId, 
      text: finalFragments[0], 
      sender, 
      isComplete: finalFragments.length === 1 
    }]);
    
    // Se houver animação entre mensagens, mostrar após a primeira mensagem
    if (finalFragments.length > 1) {
      setAnimatingBetween(firstMsgId);
    }
    
    // Adicionar os fragmentos restantes com intervalo
    if (finalFragments.length > 1) {
      finalFragments.slice(1).forEach((fragment, index) => {
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
              isComplete: index === finalFragments.length - 2
            }];
          });
          
          // Mover animação para após a nova mensagem
          setAnimatingBetween(newMsgId);
          
          // Se for o último fragmento, limpar a animação após um tempo
          if (index === finalFragments.length - 2) {
            setTimeout(() => {
              setAnimatingBetween(null);
            }, 1500);
          }
        }, (index + 1) * 1500); // 1.5 segundos de intervalo entre fragmentos (mais rápido)
      });
    } else {
      // Se for apenas um fragmento, mostrar animação por 1.5 segundos e depois remover
      setTimeout(() => {
        setAnimatingBetween(null);
      }, 1500);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    // Adicionar mensagem do usuário
    const userMessageId = generateUniqueId();
    const userMessage = { id: userMessageId, text: inputText, sender: 'user' as const, isComplete: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsEmptyInput(true);
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

  // Formatar data e hora para exibição
  const formatTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
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
          <h3 className="gemini-chatbot-title">{chatTitle}</h3>
          <div className="gemini-chatbot-header-actions">
            {showClearButton && (
              <button 
                className="gemini-chatbot-clear" 
                onClick={clearChat}
                aria-label="Limpar conversa"
                title="Limpar conversa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            )}
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
        </div>

        <div className="gemini-chatbot-messages">
          {messages.map((message, index) => (
            <React.Fragment key={message.id}>
              <div className={`gemini-chatbot-message ${message.sender}`}>
                <div className="gemini-chatbot-message-content">
                  {processMessageWithLinks(message.text)}
                </div>
                <div className="gemini-chatbot-message-time">
                  {formatTimestamp()}
                </div>
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

        <div className="gemini-chatbot-input-area">
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
              className={`gemini-chatbot-send ${!isEmptyInput ? 'active' : ''}`}
              onClick={sendMessage}
              disabled={isLoading || isEmptyInput}
              aria-label="Enviar mensagem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <div className="gemini-chatbot-powered-by">
            Powered by TargetWeb
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChatbot;