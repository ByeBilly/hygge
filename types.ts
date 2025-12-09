
export enum Screen {
  LOGIN = 'LOGIN',
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  MATCHES = 'MATCHES',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
  SAFETY = 'SAFETY'
}

export interface User {
  id: string;
  name: string;
  age: number;
  city: string;
  bio: string;
  cozyEvening: string; // "Perfect cozy evening looks like..."
  cozyThings: string[]; // 3 things that make me feel at home
  interests: string[];
  photos: string[];
  gender: 'man' | 'woman' | 'non-binary' | 'other';
  interestedIn: string[];
}

export interface Match {
  id: string;
  users: [string, string]; // User IDs
  lastMessage: string;
  lastMessageAt: number;
  unread: boolean;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  createdAt: number;
  isAiGenerated?: boolean;
}

export interface AppState {
  currentUser: User | null;
  currentScreen: Screen;
  matches: Match[];
  users: User[]; // Mock database of other users
  messages: Record<string, Message[]>; // Map matchId to messages
  activeMatchId: string | null;
}

export interface CozyDateIdea {
  title: string;
  description: string;
}
