import React, { useState, useEffect, useRef } from 'react';
import { User, Message } from '../../types';
import { ChevronLeft, Send, Sparkles, MoreVertical } from 'lucide-react';
import { generateDateIdea } from '../../services/geminiService';

interface ChatProps {
  matchId: string;
  messages: Message[];
  currentUser: User;
  otherUser: User;
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

const Chat: React.FC<ChatProps> = ({ messages, currentUser, otherUser, onSendMessage, onBack }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [dateIdea, setDateIdea] = useState<{title: string, description: string} | null>(null);
  const [loadingIdea, setLoadingIdea] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, dateIdea]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleGenerateDateIdea = async () => {
      setLoadingIdea(true);
      const idea = await generateDateIdea(currentUser, otherUser);
      setDateIdea(idea);
      setLoadingIdea(false);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Header */}
      <div className="h-20 bg-slate-900 border-b border-slate-800 flex items-center px-4 pt-4 sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white">
            <ChevronLeft size={24} />
        </button>
        
        <div className="flex items-center gap-3 ml-2 flex-1">
            <img 
                src={otherUser.photos[0]} 
                alt={otherUser.name} 
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
            />
            <div>
                <h3 className="font-semibold text-stone-100">{otherUser.name}</h3>
                <p className="text-xs text-amber-500">Feels like home?</p>
            </div>
        </div>

        <button className="p-2 text-slate-400">
            <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center py-6">
            <p className="text-xs text-slate-600 uppercase tracking-widest">You matched with {otherUser.name}</p>
        </div>

        {messages.map(msg => {
            const isMe = msg.senderId === currentUser.id;
            const isSystem = msg.senderId === 'system';

            if (isSystem) {
                return (
                    <div key={msg.id} className="flex justify-center my-4">
                        <div className="bg-slate-800/80 border border-amber-500/20 rounded-2xl p-3 px-5 max-w-xs text-center shadow-lg">
                            <div className="flex justify-center mb-1 text-amber-400">
                                <Sparkles size={16} />
                            </div>
                            <p className="text-sm text-stone-300 italic">{msg.text.replace('Hygge AI Suggestion: ', '')}</p>
                        </div>
                    </div>
                );
            }

            return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && (
                        <img 
                            src={otherUser.photos[0]} 
                            className="w-8 h-8 rounded-full object-cover mr-2 self-end mb-1"
                            alt="avatar"
                        />
                    )}
                    <div className={`max-w-[75%] rounded-2xl p-3 px-4 ${
                        isMe 
                            ? 'bg-amber-500 text-slate-900 rounded-br-none' 
                            : 'bg-slate-800 text-stone-100 rounded-bl-none border border-slate-700'
                    }`}>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                </div>
            );
        })}

        {dateIdea && (
             <div className="flex justify-center my-4 animate-fade-in">
             <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-4 max-w-xs w-full shadow-xl">
                 <div className="flex items-center gap-2 mb-2 text-amber-400">
                     <Sparkles size={16} />
                     <span className="text-xs font-bold uppercase tracking-wider">Date Idea</span>
                 </div>
                 <h4 className="font-bold text-white mb-1">{dateIdea.title}</h4>
                 <p className="text-sm text-slate-300 mb-3">{dateIdea.description}</p>
                 <button className="w-full py-2 bg-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-600 text-white transition-colors">
                     Suggest this date
                 </button>
             </div>
         </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 pb-8">
        {/* Helper Chips */}
        {!dateIdea && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
                <button 
                    onClick={handleGenerateDateIdea}
                    disabled={loadingIdea}
                    className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-amber-400 hover:bg-slate-700 whitespace-nowrap transition-colors"
                >
                    <Sparkles size={12} />
                    {loadingIdea ? 'Thinking...' : 'Get Date Idea'}
                </button>
                <button className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 whitespace-nowrap">
                    Tell me about your day
                </button>
            </div>
        )}

        <div className="flex items-center gap-2">
            <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a cozy message..."
                className="flex-1 bg-slate-800 text-white rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="p-3 bg-amber-500 rounded-full text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-400 transition-colors"
            >
                <Send size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;