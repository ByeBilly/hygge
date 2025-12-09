
import React from 'react';
import { ChevronLeft, Shield, Heart, Hand, AlertTriangle } from 'lucide-react';

interface SafetyProps {
  onBack: () => void;
}

const Safety: React.FC<SafetyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 pb-24 flex flex-col relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -z-10"></div>

      {/* Header */}
      <div className="h-16 flex items-center px-4 sticky top-0 bg-slate-950/90 backdrop-blur-md z-20 border-b border-slate-900">
        <button 
            onClick={onBack}
            className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white ml-2">Safety & Guidelines</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 max-w-md mx-auto w-full space-y-8 animate-fade-in">
        
        {/* Intro Card */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-amber-500" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Staying Safe on HYGGE</h2>
            <p className="text-slate-400 leading-relaxed text-sm">
                We designed HYGGE to be a sanctuary—a warm, slow, and respectful space. Your safety and comfort are the foundation of everything we do here.
            </p>
        </div>

        {/* Guidelines List */}
        <div className="space-y-6">
            <div className="flex gap-4">
                <div className="mt-1">
                    <Heart className="text-rose-400" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-white mb-1">Kindness First</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Treat every match with the same warmth you’d want in your own home. Ghosting, rudeness, and hostility have no place here.
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="mt-1">
                    <Hand className="text-amber-400" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-white mb-1">Consent is Key</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Consent must be enthusiastic, ongoing, and clear. Whether it’s sharing a photo or meeting up for coffee, always ask and respect the answer.
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="mt-1">
                    <AlertTriangle className="text-amber-600" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-white mb-1">Zero Tolerance</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        We have a strict zero-tolerance policy for harassment, hate speech, or unsolicited explicit content.
                    </p>
                </div>
            </div>
        </div>

        {/* Tools Section */}
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Safety Tools</h3>
            <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    <span>Use the <strong>Report</strong> button in any chat or profile to flag bad behavior immediately.</span>
                </li>
                <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    <span>Use <strong>Block</strong> to instantly remove someone from your experience.</span>
                </li>
                <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    <span>Keep conversations on the app until you feel truly comfortable.</span>
                </li>
            </ul>
        </div>

        <div className="pt-4 text-center">
            <p className="text-xs text-slate-600">
                If you are in immediate danger, please contact your local emergency services.
            </p>
        </div>

      </div>
    </div>
  );
};

export default Safety;
