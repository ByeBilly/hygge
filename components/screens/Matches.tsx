import React from 'react';
import { Match, User } from '../../types';
import { Search } from 'lucide-react';

interface MatchesProps {
  matches: Match[];
  users: User[];
  currentUserId: string;
  onOpenChat: (matchId: string) => void;
}

const Matches: React.FC<MatchesProps> = ({ matches, users, currentUserId, onOpenChat }) => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-stone-100 mb-6 px-2">Messages</h1>
      
      {/* Search (Visual only) */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-500" />
        </div>
        <input 
            type="text" 
            placeholder="Search matches"
            className="w-full bg-slate-800 border-none rounded-2xl py-3 pl-10 pr-4 text-sm text-stone-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 outline-none"
        />
      </div>

      <div className="space-y-2">
        {matches.length === 0 ? (
            <div className="text-center py-10">
                <p className="text-slate-500">No cozy matches yet.</p>
            </div>
        ) : (
            matches.map(match => {
                const otherUserId = match.users.find(id => id !== currentUserId);
                const otherUser = users.find(u => u.id === otherUserId);
                
                if (!otherUser) return null;

                return (
                    <div 
                        key={match.id}
                        onClick={() => onOpenChat(match.id)}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-800/50 transition-colors cursor-pointer group"
                    >
                        <div className="relative">
                            <img 
                                src={otherUser.photos[0]} 
                                alt={otherUser.name} 
                                className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 group-hover:border-amber-500/50 transition-colors"
                            />
                            {match.unread && (
                                <div className="absolute top-0 right-0 w-4 h-4 bg-amber-500 rounded-full border-2 border-slate-900"></div>
                            )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-lg font-semibold text-stone-100 truncate">{otherUser.name}</h3>
                                <span className="text-xs text-slate-500 whitespace-nowrap">
                                    {new Date(match.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className={`text-sm truncate ${match.unread ? 'text-stone-200 font-medium' : 'text-slate-500'}`}>
                                {match.lastMessage}
                            </p>
                        </div>
                    </div>
                );
            })
        )}
      </div>
    </div>
  );
};

export default Matches;