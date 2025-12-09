import React from 'react';
import { Button } from '../ui/Button';
import { Flame } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-rose-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center space-y-8">
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-sm">
            <div className="w-20 h-20 bg-amber-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20 rotate-3">
            <Flame size={40} className="text-slate-900" />
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-stone-100">HYGGE</h1>
            <p className="text-slate-400 text-lg">Find someone who feels like home.</p>
        </div>

        <div className="space-y-4 w-full">
          <Button fullWidth onClick={onLogin}>
            Sign in with Email
          </Button>
          <Button fullWidth variant="outline" onClick={onLogin}>
            Continue with Google
          </Button>
        </div>

        <p className="text-xs text-slate-500 mt-8">
          By signing up, you agree to our Terms of Service. 
          We prioritize safety, warmth, and respect.
        </p>
      </div>
    </div>
  );
};

export default Login;