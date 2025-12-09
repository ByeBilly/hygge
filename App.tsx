
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, Screen, User, Match, Message } from './types';
import { MOCK_USERS, INITIAL_MATCHES, INITIAL_MESSAGES } from './services/mockData';
import Login from './components/screens/Login';
import Onboarding from './components/screens/Onboarding';
import Home from './components/screens/Home';
import Matches from './components/screens/Matches';
import Chat from './components/screens/Chat';
import Profile from './components/screens/Profile';
import Safety from './components/screens/Safety';
import { Layout } from './components/Layout';
import { generateCozyIcebreaker } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    currentScreen: Screen.LOGIN,
    matches: INITIAL_MATCHES,
    users: MOCK_USERS,
    messages: INITIAL_MESSAGES,
    activeMatchId: null,
  });

  // Hydrate from local storage (simulate session)
  useEffect(() => {
    const savedUser = localStorage.getItem('hygge_user');
    if (savedUser) {
      setState(prev => ({
        ...prev,
        currentUser: JSON.parse(savedUser),
        currentScreen: Screen.HOME
      }));
    }
  }, []);

  const handleLogin = () => {
    // In a real app, this would use Firebase Auth
    // We'll jump to onboarding if no profile exists, or home if it does
    // For demo, we go to Onboarding first
    setState(prev => ({ ...prev, currentScreen: Screen.ONBOARDING }));
  };

  const handleCompleteOnboarding = (user: User) => {
    localStorage.setItem('hygge_user', JSON.stringify(user));
    setState(prev => ({
      ...prev,
      currentUser: user,
      currentScreen: Screen.HOME
    }));
  };

  const handleUpdateUser = (updatedUser: User) => {
    localStorage.setItem('hygge_user', JSON.stringify(updatedUser));
    setState(prev => ({
      ...prev,
      currentUser: updatedUser
    }));
  };

  const navigateTo = (screen: Screen) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const handleLike = useCallback(async (targetUser: User) => {
    // Simulate 50% chance of matching for demo purposes
    const isMatch = Math.random() > 0.5;
    
    if (isMatch && state.currentUser) {
      const newMatchId = `match_${Date.now()}`;
      
      // Generate an AI icebreaker
      const icebreaker = await generateCozyIcebreaker(state.currentUser, targetUser);
      
      const newMatch: Match = {
        id: newMatchId,
        users: [state.currentUser.id, targetUser.id],
        lastMessage: "It's a cozy match! Say hi.",
        lastMessageAt: Date.now(),
        unread: true
      };

      const aiMessage: Message = {
        id: `msg_${Date.now()}`,
        matchId: newMatchId,
        senderId: 'system',
        text: `Hygge AI Suggestion: "${icebreaker}"`,
        createdAt: Date.now(),
        isAiGenerated: true
      };

      setState(prev => ({
        ...prev,
        matches: [newMatch, ...prev.matches],
        messages: {
            ...prev.messages,
            [newMatchId]: [aiMessage]
        }
      }));
      
      alert(`It's a match with ${targetUser.name}!`);
    }
  }, [state.currentUser]);

  const handleOpenChat = (matchId: string) => {
    setState(prev => ({
      ...prev,
      activeMatchId: matchId,
      currentScreen: Screen.CHAT
    }));
  };

  const handleSendMessage = (text: string) => {
    if (!state.activeMatchId || !state.currentUser) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      matchId: state.activeMatchId,
      senderId: state.currentUser.id,
      text,
      createdAt: Date.now()
    };

    setState(prev => {
        const updatedMessages = {
            ...prev.messages,
            [prev.activeMatchId!]: [...(prev.messages[prev.activeMatchId!] || []), newMessage]
        };
        
        const updatedMatches = prev.matches.map(m => 
            m.id === prev.activeMatchId 
            ? { ...m, lastMessage: text, lastMessageAt: Date.now() } 
            : m
        );

        return {
            ...prev,
            messages: updatedMessages,
            matches: updatedMatches
        };
    });
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case Screen.LOGIN:
        return <Login onLogin={handleLogin} />;
      case Screen.ONBOARDING:
        return <Onboarding onComplete={handleCompleteOnboarding} />;
      case Screen.HOME:
        return (
            <Home 
                currentUser={state.currentUser}
                users={state.users}
                onLike={handleLike}
            />
        );
      case Screen.MATCHES:
        return (
            <Matches 
                matches={state.matches} 
                users={state.users}
                currentUserId={state.currentUser?.id || ''}
                onOpenChat={handleOpenChat}
            />
        );
      case Screen.CHAT:
        const activeMatch = state.matches.find(m => m.id === state.activeMatchId);
        if (!activeMatch || !state.currentUser) return <div className="text-white">Error loading chat</div>;
        
        const otherUserId = activeMatch.users.find(id => id !== state.currentUser?.id);
        const otherUser = state.users.find(u => u.id === otherUserId) || MOCK_USERS[0]; // Fallback for mock

        return (
            <Chat 
                matchId={state.activeMatchId!}
                messages={state.messages[state.activeMatchId!] || []}
                currentUser={state.currentUser}
                otherUser={otherUser}
                onSendMessage={handleSendMessage}
                onBack={() => navigateTo(Screen.MATCHES)}
            />
        );
      case Screen.PROFILE:
        return (
            <Profile 
                user={state.currentUser} 
                onUpdateUser={handleUpdateUser}
                onOpenSafety={() => navigateTo(Screen.SAFETY)}
                onLogout={() => {
                    localStorage.removeItem('hygge_user');
                    setState(prev => ({ ...prev, currentUser: null, currentScreen: Screen.LOGIN }));
                }}
            />
        );
      case Screen.SAFETY:
        return <Safety onBack={() => navigateTo(Screen.PROFILE)} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-white">
      {renderScreen()}
      {state.currentUser && 
       state.currentScreen !== Screen.LOGIN && 
       state.currentScreen !== Screen.ONBOARDING && 
       state.currentScreen !== Screen.CHAT && 
       state.currentScreen !== Screen.SAFETY && (
        <Layout currentScreen={state.currentScreen} onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;
