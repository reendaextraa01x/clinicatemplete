import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Olá. Bem-vindo à Aura Capilar. Sou seu consultor pessoal. Como posso auxiliar em sua jornada de restauração capilar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    // Optimistic update
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create a clean history for the API
      // IMPORTANT: We must exclude the artificial "Welcome" message (id: '1') 
      // because Gemini API often rejects history starting with a 'model' turn.
      const apiHistory = messages
        .filter(m => m.id !== '1') 
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const responseText = await sendMessageToGemini(apiHistory, userMessage.text);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'model',
        text: "Desculpe, ocorreu um erro momentâneo em nossa conexão. Por favor, tente novamente."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gold-500 text-navy-950 shadow-[0_0_20px_rgba(219,182,43,0.3)] hover:scale-110 transition-transform duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-8 right-8 z-50 w-[90vw] md:w-[400px] h-[500px] bg-navy-900 border border-gold-500/20 rounded-2xl shadow-2xl flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-navy-950 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-900">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-white font-serif tracking-wide">Aura Concierge</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gold-500 text-navy-950 rounded-br-none font-medium' 
                  : 'bg-navy-800 text-slate-200 border border-white/5 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-navy-800 p-4 rounded-2xl rounded-bl-none border border-white/5">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-navy-950 border-t border-white/5 rounded-b-2xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua dúvida..."
              className="w-full bg-navy-900 text-white placeholder-slate-500 pl-4 pr-12 py-3 rounded-xl border border-white/10 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gold-500 hover:text-white transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};