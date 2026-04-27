'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntelligenceHub() {
  const [messages, setMessages] = useState<any[]>([
    { role: 'model', content: 'Hello! I am your Architecture Assistant. I’ve analyzed your current stack. How can I help you optimize your infrastructure today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stack, setStack] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadStack() {
      try {
        const res = await fetch('/api/stack');
        const data = await res.json();
        setStack(data.items || []);
      } catch (e) {
        console.error('Failed to load stack', e);
      }
    }
    loadStack();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });
      const data = await res.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'model', content: data.content }]);
      }
    } catch (e) {
      console.error('Chat failed', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-slate-50">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Stack Info */}
        <div className="w-80 border-r border-slate-200 bg-white p-6 hidden lg:flex flex-col gap-8">
          <div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Current Stack</h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((item, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm">
                  {item}
                </span>
              ))}
              {stack.length === 0 && <p className="text-xs text-slate-400 italic">No stack selected</p>}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">AI Focus Areas</h3>
            <ul className="space-y-4">
              {[
                { icon: 'security', label: 'Vulnerability Scanning', color: 'text-rose-500' },
                { icon: 'bolt', label: 'Performance Optimization', color: 'text-emerald-500' },
                { icon: 'monitoring', label: 'Ecosystem Health', color: 'text-blue-500' },
                { icon: 'account_tree', label: 'Scalability Planning', color: 'text-purple-500' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                  <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Powering Analysis</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold text-slate-700">Gemini 1.5 Flash Active</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white lg:bg-transparent relative">
          {/* Chat Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-8"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-6 rounded-[2rem] shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}>
                    <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-6 rounded-[2rem] rounded-tl-none shadow-sm flex gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 lg:p-12 bg-gradient-to-t from-slate-50 to-transparent">
            <div className="max-w-4xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-900 to-slate-700 rounded-[2.5rem] blur opacity-5 group-focus-within:opacity-10 transition duration-500"></div>
              <div className="relative flex items-center bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden px-2 py-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about architectural patterns, security risks, or library updates..."
                  className="flex-1 bg-transparent border-none outline-none px-6 py-3 text-sm font-medium text-slate-800"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isLoading || !input.trim() 
                      ? 'bg-slate-100 text-slate-400' 
                      : 'bg-slate-900 text-white hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isLoading ? 'hourglass_empty' : 'arrow_upward'}
                  </span>
                </button>
              </div>
              <p className="mt-3 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                AI can provide insights based on your selected stack and real-time ecosystem updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
