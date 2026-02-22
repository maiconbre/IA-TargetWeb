import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ChatPage.css';

// ---- Types ----
interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

interface ChatPageProps {
    apiKey: string;
    systemPrompt: string;
}

// ---- Helpers ----
const uid = () => `msg-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const stripMarkdown = (t: string) =>
    t
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/__(.*?)__/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/_(.*?)_/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^[\s]*[-*+]\s+/gm, '• ')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

const renderText = (text: string): React.ReactNode => {
    // Split by newlines first, then handle links within each segment
    const paragraphs = text.split(/\n+/);
    const result: React.ReactNode[] = [];

    paragraphs.forEach((para, pi) => {
        if (pi > 0) result.push(<br key={`br-${pi}`} />);
        if (!para.trim()) return;

        // Check for links in this paragraph
        const linkRe = /\b(https?:\/\/\S+|wa\.me\/\d+)\b/g;
        if (!linkRe.test(para)) {
            result.push(para);
            return;
        }

        let last = 0;
        for (const m of para.matchAll(linkRe)) {
            const idx = m.index!;
            if (idx > last) result.push(para.slice(last, idx));
            const url = m[0].startsWith('http') ? m[0] : `https://${m[0]}`;
            result.push(
                <a key={`l-${pi}-${idx}`} href={url} target="_blank" rel="noopener noreferrer" className="chat-msg-link">
                    {m[0]}
                </a>
            );
            last = idx + m[0].length;
        }
        if (last < para.length) result.push(para.slice(last));
    });

    return result;
};

const formatTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

// ---- Suggestions ----
const SUGGESTIONS = [
    '💈 O que é o BarberShop?',
    '💰 Quais os planos?',
    '🆓 Teste grátis',
    '📊 Funcionalidades',
];

// ========================================
// Shared Chat Core (used by both page & widget)
// ========================================
export const useChatCore = (apiKey: string, systemPrompt: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    useEffect(() => {
        if (!loading) inputRef.current?.focus();
    }, [loading]);

    const send = async (text?: string) => {
        const msg = (text || input).trim();
        if (!msg || loading) return;

        setShowWelcome(false);
        const userMsg: Message = { id: uid(), text: msg, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        if (!apiKey || apiKey.trim() === '') {
            setMessages(prev => [...prev, { id: uid(), text: '⚠️ API Key não configurada. Configure VITE_GROQ_API_KEY no arquivo .env', sender: 'bot' }]);
            setLoading(false);
            return;
        }

        try {
            const chatMessages = [
                { role: 'system', content: systemPrompt },
                ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
                { role: 'user', content: msg },
            ];

            const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'openai/gpt-oss-120b',
                    messages: chatMessages,
                    temperature: 1,
                    max_completion_tokens: 8192,
                    top_p: 1,
                    stream: true,
                    stop: null,
                }),
            });

            if (res.status === 429) throw new Error('⏳ Limite de requisições atingido. Aguarde um momento.');
            if (res.status === 401) throw new Error('❌ API Key inválida. Verifique sua chave do Groq.');
            if (!res.ok) throw new Error(`Erro ${res.status}`);

            // Collect stream silently while showing "..." animation
            const reader = res.body?.getReader();
            if (!reader) throw new Error('Streaming não suportado');

            const decoder = new TextDecoder();
            let fullText = '';
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || !trimmed.startsWith('data: ')) continue;
                    const jsonStr = trimmed.slice(6);
                    if (jsonStr === '[DONE]') continue;
                    try {
                        const parsed = JSON.parse(jsonStr);
                        const delta = parsed.choices?.[0]?.delta?.content;
                        if (delta) fullText += delta;
                    } catch { /* skip */ }
                }
            }

            // Stream done — show the complete message at once
            const clean = stripMarkdown(fullText).trim();
            if (clean) {
                setMessages(prev => [...prev, { id: uid(), text: clean, sender: 'bot' }]);
            } else {
                setMessages(prev => [...prev, { id: uid(), text: 'Desculpe, não consegui gerar uma resposta.', sender: 'bot' }]);
            }
        } catch (err: any) {
            const errMsg = err?.message?.startsWith('❌') || err?.message?.startsWith('⏳') ? err.message : 'Desculpe, ocorreu um erro. Tente novamente.';
            setMessages(prev => [...prev, { id: uid(), text: errMsg, sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
        setShowWelcome(true);
        inputRef.current?.focus();
    };

    return { messages, input, setInput, loading, showWelcome, endRef, inputRef, send, clearChat };
};

// ========================================
// Chat Messages Renderer (shared)
// ========================================
const ChatMessages: React.FC<{
    messages: Message[];
    loading: boolean;
    showWelcome: boolean;
    endRef: React.RefObject<HTMLDivElement>;
    send: (text?: string) => void;
    compact?: boolean;
}> = ({ messages, loading, showWelcome, endRef, send, compact }) => (
    <div className="chat-messages">
        {showWelcome && messages.length === 0 && (
            <>
                <div className="chat-welcome-spacer" />
                <div className="chat-welcome">
                    <div className="chat-welcome-avatar">A</div>
                    <h2>Olá! Sou a Ana 👋</h2>
                    <p>
                        {compact
                            ? 'Tire suas dúvidas sobre o BarberShop!'
                            : 'Assistente virtual da TargetWeb. Tire suas dúvidas sobre o BarberShop — sistema de agendamento para barbearias.'}
                    </p>
                </div>
                <div className="chat-suggestions">
                    {(compact ? SUGGESTIONS.slice(0, 3) : SUGGESTIONS).map((s, i) => (
                        <button key={i} className="chat-suggestion-chip" onClick={() => send(s)}>{s}</button>
                    ))}
                </div>
            </>
        )}

        {messages.map(m => (
            <div key={m.id} className={`chat-msg ${m.sender}`}>
                <div className="chat-msg-content">{renderText(m.text)}</div>
                <div className="chat-msg-time">{formatTime()}</div>
            </div>
        ))}

        {loading && (
            <div className="chat-typing">
                <div className="chat-typing-dot" />
                <div className="chat-typing-dot" />
                <div className="chat-typing-dot" />
            </div>
        )}

        <div ref={endRef} />
    </div>
);

// ========================================
// Chat Input Renderer (shared)
// ========================================
const ChatInput: React.FC<{
    input: string;
    setInput: (v: string) => void;
    loading: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    send: () => void;
}> = ({ input, setInput, loading, inputRef, send }) => (
    <div className="chat-input-area">
        <div className="chat-input-container">
            <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                disabled={loading}
            />
            <button
                className={`chat-send-btn ${input.trim() ? 'has-text' : ''}`}
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Enviar mensagem"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
            </button>
        </div>
        <div className="chat-footer">
            <a href="https://github.com/maiconbre/" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span style={{ margin: '0 8px', opacity: 0.4 }}>•</span>
            <a href="https://targetweb.tech" target="_blank" rel="noopener noreferrer">Portfólio</a>
        </div>
    </div>
);

// ========================================
// ChatPage — Full-screen (route /)
// ========================================
const ChatPage: React.FC<ChatPageProps> = ({ apiKey, systemPrompt }) => {
    const navigate = useNavigate();
    const chat = useChatCore(apiKey, systemPrompt);

    return (
        <div className="chat-page">
            {/* Test Banner */}
            <div className="chat-test-banner">
                🚀 Projeto pessoal de <strong>Maicon Brendon</strong><span> — Assistente virtual com IA</span>
            </div>

            {/* Main chat card */}
            <motion.div
                className="chat-wrapper"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-avatar">
                        <div className="chat-avatar-circle">A</div>
                        <div className="chat-avatar-status" />
                    </div>
                    <div className="chat-header-info">
                        <h1 className="chat-header-title">Assistente Virtual Ana</h1>
                        <p className="chat-header-subtitle">
                            <span style={{ fontSize: 8, marginRight: 2 }}>●</span> Online agora
                        </p>
                    </div>
                    <div className="chat-header-actions">
                        {chat.messages.length > 0 && (
                            <button className="chat-header-btn" onClick={chat.clearChat} title="Limpar conversa" aria-label="Limpar conversa">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <ChatMessages
                    messages={chat.messages}
                    loading={chat.loading}
                    showWelcome={chat.showWelcome}
                    endRef={chat.endRef as React.RefObject<HTMLDivElement>}
                    send={chat.send}
                />

                <ChatInput
                    input={chat.input}
                    setInput={chat.setInput}
                    loading={chat.loading}
                    inputRef={chat.inputRef as React.RefObject<HTMLInputElement>}
                    send={chat.send}
                />
            </motion.div>

            {/* FAB — Open Landing Page */}
            <button className="chat-fab" onClick={() => navigate('/landing')} aria-label="Ver site BarberShop">
                <span className="chat-fab-tooltip">Ver site BarberShop</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            </button>
        </div>
    );
};

// ========================================
// ChatWidget — Floating widget (for landing page)
// ========================================
export const ChatWidget: React.FC<ChatPageProps> = ({ apiKey, systemPrompt }) => {
    const [isOpen, setIsOpen] = useState(false);
    const chat = useChatCore(apiKey, systemPrompt);

    // Focus input when widget opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => chat.inputRef.current?.focus(), 350);
        }
    }, [isOpen]);

    // ESC to close
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) setIsOpen(false); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen]);

    return (
        <div className="chat-widget-container">
            {/* Toggle button */}
            <button className="chat-widget-toggle" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}>
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </button>

            {/* Chat window */}
            <div className={`chat-widget-window ${isOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-avatar">
                        <div className="chat-avatar-circle">A</div>
                        <div className="chat-avatar-status" />
                    </div>
                    <div className="chat-header-info">
                        <h3 className="chat-header-title">Assistente Virtual Ana</h3>
                        <p className="chat-header-subtitle">
                            <span style={{ fontSize: 8, marginRight: 2 }}>●</span> Online agora
                        </p>
                    </div>
                    <div className="chat-header-actions">
                        {chat.messages.length > 0 && (
                            <button className="chat-header-btn" onClick={chat.clearChat} title="Limpar conversa">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        )}
                        <button className="chat-header-btn" onClick={() => setIsOpen(false)} aria-label="Fechar chat">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                <ChatMessages
                    messages={chat.messages}
                    loading={chat.loading}
                    showWelcome={chat.showWelcome}
                    endRef={chat.endRef as React.RefObject<HTMLDivElement>}
                    send={chat.send}
                    compact
                />

                <ChatInput
                    input={chat.input}
                    setInput={chat.setInput}
                    loading={chat.loading}
                    inputRef={chat.inputRef as React.RefObject<HTMLInputElement>}
                    send={chat.send}
                />
            </div>
        </div>
    );
};

export default ChatPage;
