import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '../../types';

const QUICK_REPLIES = [
  'What services do you offer?',
  'How much does smart home cost?',
  'Do you service Vijayawada?',
  'Book a free consultation',
];

const getBotResponse = (msg: string): string => {
  const m = msg.toLowerCase();
  if (m.includes('cost') || m.includes('price') || m.includes('budget')) {
    return 'Our packages start from ₹45,000 for basic automation. Full home systems range from ₹1.5L to ₹25L depending on your needs. Use our Cost Calculator on the website for an instant estimate, or WhatsApp us for a free site visit & quote!';
  }
  if (m.includes('service') || m.includes('offer') || m.includes('what do')) {
    return 'We offer: 🏠 Home Automation, 📹 CCTV Systems, 🎬 Home Theater, 💡 Smart Lighting, 🔐 Smart Door Locks, 📞 Video Door Phones, 🚪 Remote Gates, 🎵 Audio Systems, 📽️ Projectors, ⚡ Solar Fencing, and 🪵 Wooden Flooring.';
  }
  if (m.includes('vijayawada') || m.includes('tenali') || m.includes('area') || m.includes('location') || m.includes('service')) {
    return 'Yes! We serve Guntur, Vijayawada, Tenali, Narasaraopet, and all surrounding areas in Andhra Pradesh. We also take large projects anywhere in AP & Telangana.';
  }
  if (m.includes('consult') || m.includes('book') || m.includes('visit') || m.includes('appointment')) {
    return 'Great! To book your FREE home consultation, please call us at 📞 +91 92486 83744 or click the WhatsApp button to chat directly. We\'ll visit your home at your convenience!';
  }
  if (m.includes('warranty') || m.includes('guarantee') || m.includes('support')) {
    return 'We provide a 1-year comprehensive warranty on all installations with free service visits. We also offer Annual Maintenance Contracts (AMC) for ongoing peace of mind.';
  }
  if (m.includes('hi') || m.includes('hello') || m.includes('hey')) {
    return 'Hello! Welcome to ABHEE Smart Home Systems 👋 I\'m here to help you transform your home. What would you like to know?';
  }
  return 'Thank you for your interest! For detailed information, please call us at +91 92486 83744 or WhatsApp us. Our experts are available Mon-Sat 9AM-7PM.';
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m the ABHEE Smart Home Assistant 🏠 How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getBotResponse(text),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gold-600 to-gold-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-900/30 flex items-center justify-center text-base">🏠</div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">ABHEE Assistant</div>
                  <div className="flex items-center gap-1 text-gray-800 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-900 hover:opacity-70 transition-opacity text-lg"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 sm:h-72 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gold-600 text-gray-900 rounded-br-sm'
                        : 'bg-gray-800 text-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-2.5 py-1 bg-white/5 hover:bg-gold-500/10 text-gray-300 hover:text-gold-400 border border-white/10 hover:border-gold-500/30 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50"
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-9 h-9 bg-gradient-to-r from-gold-500 to-gold-700 rounded-xl flex items-center justify-center text-gray-900 font-bold text-sm hover:opacity-90 transition-opacity"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-gradient-to-r from-gold-500 to-gold-700 rounded-full shadow-xl shadow-gold-500/30 flex items-center justify-center text-2xl"
        aria-label="Open chat assistant"
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>
    </>
  );
};

export default AIChat;
