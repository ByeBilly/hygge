import React from 'react';
import { Screen } from '../types';
import { Home, MessageCircle, User } from 'lucide-react';

interface LayoutProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Layout: React.FC<LayoutProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { icon: Home, label: 'Discover', screen: Screen.HOME },
    { icon: MessageCircle, label: 'Matches', screen: Screen.MATCHES },
    { icon: User, label: 'Profile', screen: Screen.PROFILE },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};