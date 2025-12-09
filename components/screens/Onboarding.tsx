import React, { useState } from 'react';
import { User } from '../../types';
import { Button } from '../ui/Button';
import { ChevronRight, Camera, Coffee, Moon, Book } from 'lucide-react';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

const STEPS = ['Basic', 'Cozy Vibes', 'Interests', 'Photos'];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    age: 18,
    city: '',
    gender: 'woman', // default
    interestedIn: ['man'],
    bio: '',
    cozyEvening: '',
    cozyThings: [],
    interests: [],
    photos: []
  });

  const updateForm = (key: keyof User, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Create user ID and complete
      const newUser = {
        ...formData,
        id: `user_${Date.now()}`,
      } as User;
      onComplete(newUser);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Basic
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-amber-400">Let's introduce you.</h2>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="What do friends call you?"
                value={formData.name}
                onChange={(e) => updateForm('name', e.target.value)}
              />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">City</label>
                <input 
                    type="text" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="Where are you located?"
                    value={formData.city}
                    onChange={(e) => updateForm('city', e.target.value)}
                />
            </div>
            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="block text-sm font-medium text-slate-400 mb-2">Age</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  value={formData.age}
                  onChange={(e) => updateForm('age', parseInt(e.target.value))}
                />
              </div>
              <div className="w-2/3">
                <label className="block text-sm font-medium text-slate-400 mb-2">Gender</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none"
                  value={formData.gender}
                  onChange={(e) => updateForm('gender', e.target.value)}
                >
                  <option value="woman">Woman</option>
                  <option value="man">Man</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 1: // Cozy Vibes
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-amber-400">What feels like home?</h2>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">A perfect cozy evening is...</label>
              <textarea 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none h-32 resize-none"
                placeholder="e.g., Watching rain from the window with a hot tea..."
                value={formData.cozyEvening}
                onChange={(e) => updateForm('cozyEvening', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">3 Cozy Things</label>
              <div className="flex flex-wrap gap-2">
                {['Blankets', 'Tea', 'Candles', 'Rain', 'Books', 'Vinyl', 'Sweaters', 'Soups', 'Cats', 'Fireplace'].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      const current = formData.cozyThings || [];
                      if (current.includes(item)) {
                        updateForm('cozyThings', current.filter(i => i !== item));
                      } else if (current.length < 3) {
                        updateForm('cozyThings', [...current, item]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.cozyThings?.includes(item) 
                        ? 'bg-amber-500 text-slate-900' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">Select up to 3</p>
            </div>
          </div>
        );
      case 2: // Interests
        return (
             <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-amber-400">Your Interests</h2>
                <div className="grid grid-cols-2 gap-3">
                    {['Nature', 'Gaming', 'Cooking', 'Art', 'Music', 'Travel', 'Photography', 'Writing', 'Fitness', 'Tech'].map(interest => (
                         <button
                         key={interest}
                         onClick={() => {
                           const current = formData.interests || [];
                           if (current.includes(interest)) {
                             updateForm('interests', current.filter(i => i !== interest));
                           } else {
                             updateForm('interests', [...current, interest]);
                           }
                         }}
                         className={`p-4 rounded-xl text-left transition-all ${
                           formData.interests?.includes(interest) 
                             ? 'bg-slate-700 border-2 border-amber-500 text-white' 
                             : 'bg-slate-800 border-2 border-transparent text-slate-400'
                         }`}
                       >
                         {interest}
                       </button>
                    ))}
                </div>
             </div>
        );
      case 3: // Photos
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-amber-400">Add some warmth.</h2>
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div 
                  key={index}
                  className="aspect-[3/4] rounded-xl bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center relative overflow-hidden group hover:border-amber-500 transition-colors cursor-pointer"
                  onClick={() => {
                     // Simulate upload
                     const newPhotos = [...(formData.photos || [])];
                     newPhotos[index] = `https://picsum.photos/400/600?random=${Date.now() + index}`;
                     updateForm('photos', newPhotos);
                  }}
                >
                  {formData.photos?.[index] ? (
                    <img src={formData.photos[index]} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="text-slate-600 group-hover:text-amber-500" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 text-center">Tap to simulate photo upload</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col p-6">
        {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-800 rounded-full mb-8 mt-4">
        <div 
            className="h-full bg-amber-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {renderStep()}
      </div>

      <div className="mt-8 max-w-md mx-auto w-full">
        <Button fullWidth onClick={handleNext}>
          {step === STEPS.length - 1 ? "Complete Profile" : "Next"} <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;