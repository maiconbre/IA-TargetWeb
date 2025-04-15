import React, { useState, useRef, useEffect } from 'react';
import './GeminiChatbot.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface GeminiChatbotProps {
  apiKey: string;
  systemPrompt?: string;
}

const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ 
  apiKey, 
  systemPrompt 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Olá, como posso ajudar hoje?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Rolar para a mensagem mais recente quando novas mensagens são adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    // Adicionar mensagem do usuário
    const userMessage = { text: inputText, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

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
            parts: [{ text: systemPrompt }]
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
                  { text: systemPrompt + "\n\nHistórico de conversa:\n" + 
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
          setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        } else {
          throw new Error('Formato de resposta inesperado');
        }
      } else {
        const data = await response.json();
        
        // Verificar se a resposta contém o conteúdo esperado
        if (data.candidates && data.candidates[0]?.content?.parts && data.candidates[0].content.parts[0]?.text) {
          const botResponse = data.candidates[0].content.parts[0].text;
          setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        } else {
          throw new Error('Formato de resposta inesperado');
        }
      }
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      setMessages(prev => [...prev, { text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, verifique sua conexão e tente novamente.", sender: 'bot' }]);
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
            <div 
              key={index} 
              className={`gemini-chatbot-message ${message.sender}`}
            >
              {message.text}
            </div>
          ))}
          
          {isLoading && (
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
