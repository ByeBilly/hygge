import React, { useState } from 'react';
import { User } from '../../types';
import { X, Heart, MapPin, Coffee, Sparkles } from 'lucide-react';

interface HomeProps {
  currentUser: User | null;
  users: User[];
  onLike: (user: User) => void;
}

const Home: React.FC<HomeProps> = ({ currentUser, users, onLike }) => {
  // Filter out current user and potentially already swiped (simplified for demo)
  const [deck, setDeck] = useState(users.filter(u => u.id !== currentUser?.id));
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeUser = deck[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && activeUser) {
      onLike(activeUser);
    }
    
    // Animate out (simplified: just move index)
    setTimeout(() => {
        if (currentIndex < deck.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // End of deck
            setDeck([]); 
        }
    }, 200);
  };

  if (!activeUser) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 text-center pb-24">
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Coffee size={40} className="text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-stone-100 mb-2">No more profiles nearby.</h2>
        <p className="text-slate-400 max-w-xs">Make some tea, read a book, and check back a little later.</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col pb-24 overflow-hidden relative">
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-amber-500 tracking-wide font-sans">HYGGE</h1>
        <button className="p-2 bg-slate-800 rounded-full text-slate-400">
            <Sparkles size={18} />
        </button>
      </div>

      <div className="flex-1 px-4 py-2 relative flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Card Container */}
        <div className="relative w-full aspect-[3/4] bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 select-none">
          
          {/* Main Photo */}
          <img 
            src={activeUser.photos[0]} 
            alt={activeUser.name} 
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
            <div>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold text-white">{activeUser.name}, {activeUser.age}</h2>
                </div>
                <div className="flex items-center gap-1 text-slate-300 text-sm mt-1">
                    <MapPin size={14} />
                    <span>{activeUser.city}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 my-2">
                {activeUser.cozyThings.slice(0, 3).map(thing => (
                    <span key={thing} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-amber-200 border border-white/10">
                        {thing}
                    </span>
                ))}
            </div>

            <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
                <p className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-1">Perfect Cozy Evening</p>
                <p className="text-sm text-stone-200 leading-relaxed italic">"{activeUser.cozyEvening}"</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 mt-6">
            <button 
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 rounded-full bg-slate-800 text-rose-400 flex items-center justify-center border border-slate-700 shadow-lg hover:scale-110 hover:bg-slate-700 transition-all"
            >
                <X size={32} />
            </button>
            <button 
                onClick={() => handleSwipe('right')}
                className="w-16 h-16 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center shadow-lg shadow-amber-500/20 hover:scale-110 hover:bg-amber-400 transition-all"
            >
                <Heart size={32} fill="currentColor" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;