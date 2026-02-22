# 🤖 IA TargetWeb — Assistente Virtual com IA

> Projeto pessoal de **Maicon Brendon** — Assistente virtual inteligente para atendimento automatizado com IA generativa.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_API-LLM-F55036)

---

## 📋 Sobre o Projeto

Aplicação web fullscreen com um chatbot inteligente alimentado por IA (Groq API). O assistente virtual "Ana" é treinado para atender clientes de barbearias, responder dúvidas sobre planos e funcionalidades do sistema BarberShop, e converter visitantes em clientes — tudo de forma automatizada.

### ✨ Destaques

- 💬 **Chat com IA** — Respostas em tempo real via Groq API (modelo `openai/gpt-oss-120b`)
- 🎨 **UI Premium** — Design glassmorphism com animações suaves e efeitos de glow
- 📱 **Responsivo** — Funciona em desktop e mobile
- 🔄 **Streaming** — Coleta resposta em background com animação de digitação
- 🏠 **Landing Page** — Página de vendas integrada com chat widget flutuante
- ⚡ **Rápido** — Build com Vite + React + TypeScript

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **React 18** | Interface e componentização |
| **TypeScript** | Tipagem estática |
| **Vite** | Bundler e dev server |
| **TailwindCSS** | Estilização utilitária |
| **Framer Motion** | Animações e transições |
| **Groq API** | IA generativa (LLM) |
| **React Router** | Navegação SPA |

---

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Chave da [Groq API](https://console.groq.com/)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/maiconbre/IA-TargetWeb.git
cd IA-TargetWeb

# Instale as dependências
npm install

# Configure a API Key
cp .env.example .env
# Edite o .env e adicione sua VITE_GROQ_API_KEY
```

### Executar em Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura do Projeto

```
src/
├── pages/
│   ├── ChatPage.tsx       # Chat fullscreen com IA (rota /)
│   ├── ChatPage.css       # Estilos premium do chat
│   └── VendaPage2.tsx     # Landing page (rota /landing)
├── components/
│   └── VendaPage/         # Componentes da landing page
├── App.tsx                # Rotas e system prompt da IA
├── main.tsx               # Entry point
└── index.css              # Estilos globais
```

---

## ⚙️ Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `VITE_GROQ_API_KEY` | Chave da API Groq para o chatbot |

---

## 🎯 Funcionalidades

### Chat Principal (`/`)
- Tela fullscreen com design glassmorphism
- Mensagem de boas-vindas com chips de sugestão
- Indicador de digitação animado ("...")
- Formatação de texto com quebras de linha
- Histórico de conversa com contexto

### Landing Page (`/landing`)
- Página de vendas do BarberShop
- Chat widget flutuante no canto inferior direito
- Mesmo assistente IA integrado

### System Prompt
- Assistente "Ana" treinada para o BarberShop
- Respostas curtas e bem formatadas
- Tratamento de perguntas fora de tema
- Saudação apenas na primeira mensagem

---

## 👤 Autor

**Maicon Brendon**

- 🌐 Portfólio: [targetweb.tech](https://targetweb.tech)
- 💻 GitHub: [github.com/maiconbre](https://github.com/maiconbre/)
- 📂 Repositório: [IA-TargetWeb](https://github.com/maiconbre/IA-TargetWeb)

---

## 📄 Licença

Este projeto é de uso pessoal e educacional.

---

<p align="center">
  Feito com ❤️ por <a href="https://github.com/maiconbre/">Maicon Brendon</a>
</p>
