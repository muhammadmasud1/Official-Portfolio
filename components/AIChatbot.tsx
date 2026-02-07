
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Trash2, Bot, User, CornerDownRight } from 'lucide-react';
import { getChatbotResponse } from '../services/geminiService';
import { Language } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

interface Props {
  lang: Language;
}

const AIChatbot: React.FC<Props> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Load welcome message if empty
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome: Message = {
        id: 'welcome',
        role: 'model',
        text: lang === 'BN' 
          ? "আসসালামু আলাইকুম 😊\nআমি আপনার সহকারী।\nচাইনিজ শেখা, কোর্স, লেসন, বই বা যেকোনো প্রশ্নে আমি আপনাকে সাহায্য করবো। 🌸"
          : "Assalamu Alaikum 😊\nI am your assistant. I will help you with learning Chinese, courses, lessons, books or any questions you may have. 🌸",
        timestamp: Date.now()
      };
      setMessages([welcome]);
    }
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const botReply = await getChatbotResponse(input, history);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: botReply || '...',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 bg-[#C1121F] text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-500/30 group border-4 border-white dark:border-zinc-900"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="relative">
              <MessageSquare className="w-8 h-8" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-[60] w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#C1121F] text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">{lang === 'BN' ? 'এআই সহকারী' : 'AI Assistant'}</h3>
                  <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {lang === 'BN' ? 'অনলাইন' : 'Online'}
                  </p>
                </div>
              </div>
              <button 
                onClick={clearChat}
                className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/60 hover:text-white"
                title="Clear Chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth bg-zinc-50 dark:bg-zinc-950/30"
            >
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                    msg.role === 'user' ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700' : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30 text-[#C1121F]'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-400" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                    ? 'bg-zinc-900 text-white rounded-br-none' 
                    : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-center justify-center text-[#C1121F]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-3xl rounded-bl-none shadow-sm flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-500 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-500 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-500 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-6 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex gap-3 items-center">
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={lang === 'BN' ? 'আপনার প্রশ্ন লিখুন...' : 'Type your message...'}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#C1121F] rounded-2xl px-5 py-4 text-sm outline-none font-bold transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none opacity-30">
                  <CornerDownRight className="w-4 h-4" />
                </div>
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 bg-[#C1121F] text-white rounded-2xl flex items-center justify-center hover:bg-red-700 disabled:opacity-50 transition-all shadow-lg shadow-red-500/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <div className="px-6 pb-4 bg-white dark:bg-zinc-900 text-center">
              <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">
                Powered by Gemini AI • Masud Language Lab
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
