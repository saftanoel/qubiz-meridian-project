import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import type { Employee } from '../types/api';

interface Message {
  id: string;
  text: string;
  createdAt: string;
  sender: 'me';
}

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const STORAGE_KEY = 'meridian-chat-messages';

const ChatPopup = ({ isOpen, onClose, employee }: ChatPopupProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage when employee changes or popup opens
  useEffect(() => {
    if (isOpen && employee) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const empMessages = parsed[employee.id] || [];
          setMessages(empMessages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error('Failed to load messages from localStorage', err);
        setMessages([]);
      }
    }
  }, [isOpen, employee]);

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen) {
      // Small timeout to ensure it focuses after mounting animation
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = () => {
    if (!inputValue.trim() || !employee) return;

    const newMessage: Message = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7),
      text: inputValue.trim(),
      createdAt: new Date().toISOString(),
      sender: 'me',
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInputValue('');

    // Persist to localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[employee.id] = newMessages;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch (err) {
      console.error('Failed to save messages to localStorage', err);
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
      {isOpen && employee && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-[60] w-full max-w-[380px] bg-card rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border-warm flex flex-col overflow-hidden sm:right-8 sm:bottom-8"
          data-testid="chat-popup"
          style={{ maxHeight: '520px', height: 'calc(100vh - 100px)' }}
        >
          {/* Header */}
          <div className="bg-card-soft px-5 py-4 border-b border-border-warm flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-subtle-peach grid place-items-center font-bold text-text-main text-sm shadow-sm relative overflow-hidden shrink-0">
                {employee.name.charAt(0)}
                {employee.avatar_url && (
                  <img
                    src={employee.avatar_url}
                    alt={`${employee.name} profile`}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-deep-navy truncate">{employee.name}</h3>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide truncate">
                  {employee.role}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close chat"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-deep-navy hover:bg-border-warm/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-5 bg-card flex flex-col gap-4">
            {messages.length === 0 ? (
              <div className="m-auto text-center space-y-2 max-w-[200px]">
                <div className="w-12 h-12 rounded-full bg-card-soft border border-border-warm grid place-items-center mx-auto mb-3">
                  <Send className="w-5 h-5 text-soft-teal opacity-50" />
                </div>
                <p className="text-sm font-semibold text-deep-navy">Start the conversation</p>
                <p className="text-xs text-slate-500">
                  Say hi to {employee.name.split(' ')[0]}. They're here to help you get settled!
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="flex flex-col items-end w-full">
                  <div className="bg-text-main text-app text-[13.5px] py-2.5 px-4 rounded-2xl rounded-br-sm max-w-[85%] leading-relaxed shadow-sm font-medium">
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1.5 font-medium mr-1">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-4 bg-card-soft border-t border-border-warm shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-end gap-2 bg-card border border-border-warm rounded-[20px] p-1.5 focus-within:border-soft-teal/40 focus-within:ring-2 focus-within:ring-soft-teal/10 transition-all shadow-sm"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none text-[14px] text-text-main placeholder-slate-400 focus:ring-0 px-3 py-2 min-w-0"
                data-testid="chat-input"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label="Send message"
                className="w-9 h-9 shrink-0 rounded-full bg-text-main text-app flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 transition-colors"
                data-testid="chat-send-button"
              >
                <Send className="w-4 h-4 ml-[1px]" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPopup;
