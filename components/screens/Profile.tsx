
import React, { useState, useRef } from 'react';
import { User } from '../../types';
import { Settings, LogOut, Edit2, Shield, X, ChevronLeft, ChevronRight, Plus, Camera, GripHorizontal, Check } from 'lucide-react';

interface ProfileProps {
  user: User | null;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onOpenSafety: () => void;
}

const AVAILABLE_COZY_THINGS = [
  'Blankets', 'Tea', 'Candles', 'Rain', 'Books', 'Vinyl', 
  'Sweaters', 'Soups', 'Cats', 'Fireplace', 'Music', 
  'Cooking', 'Nature', 'Gaming', 'Art', 'Travel', 
  'Photography', 'Coffee', 'Plants', 'Movies', 'Yoga',
  'Baking', 'Hiking', 'Board Games'
];

const AVAILABLE_INTERESTS = [
  'Nature', 'Gaming', 'Cooking', 'Art', 'Music', 'Travel', 
  'Photography', 'Writing', 'Fitness', 'Tech', 'Reading', 
  'Anime', 'Gardening', 'Vegan Food', 'Pottery'
];

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onUpdateUser, onOpenSafety }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  // Determine which data to show: the live user data or the draft edit data
  const displayUser = isEditing && editData ? editData : user;

  const startEditing = () => {
    setEditData({ ...user });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditData(null);
    setIsEditing(false);
  };

  const saveEditing = () => {
    if (editData) {
      // Basic validation
      const finalData = {
          ...editData,
          age: editData.age || 18, // Fallback if age was cleared/NaN
          name: editData.name.trim() || 'User',
      };
      onUpdateUser(finalData);
    }
    setIsEditing(false);
    setEditData(null);
  };

  const updateField = (field: keyof User, value: any) => {
    setEditData(prev => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const toggleCozyThing = (thing: string) => {
    setEditData(prev => {
        if (!prev) return null;
        const current = prev.cozyThings || [];
        if (current.includes(thing)) {
             return { ...prev, cozyThings: current.filter(t => t !== thing) };
        } else {
             // Strict limit of 3 to match Onboarding and Brand
             if (current.length >= 3) return prev; 
             return { ...prev, cozyThings: [...current, thing] };
        }
    });
  };

  const toggleInterest = (interest: string) => {
    setEditData(prev => {
        if (!prev) return null;
        const current = prev.interests || [];
        if (current.includes(interest)) {
             return { ...prev, interests: current.filter(i => i !== interest) };
        } else {
             return { ...prev, interests: [...current, interest] };
        }
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_DIM = 800;
          if (width > height) {
            if (width > MAX_DIM) {
              height *= MAX_DIM / width;
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width *= MAX_DIM / height;
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          const base64 = canvas.toDataURL('image/jpeg', 0.8);
          
          setEditData(prev => {
              if (!prev) return null;
              if (prev.photos.length >= 6) return prev;
              return { ...prev, photos: [...prev.photos, base64] };
          });
        };
        if (typeof e.target?.result === 'string') {
            img.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (index: number) => {
    setEditData(prev => {
        if (!prev) return null;
        const updatedPhotos = prev.photos.filter((_, i) => i !== index);
        return { ...prev, photos: updatedPhotos };
    });
  };

  const handleReorderPhoto = (index: number, direction: 'left' | 'right') => {
    setEditData(prev => {
        if (!prev) return null;
        if (direction === 'left' && index === 0) return prev;
        if (direction === 'right' && index === prev.photos.length - 1) return prev;

        const newPhotos = [...prev.photos];
        const targetIndex = direction === 'left' ? index - 1 : index + 1;
        
        [newPhotos[index], newPhotos[targetIndex]] = [newPhotos[targetIndex], newPhotos[index]];
        
        return { ...prev, photos: newPhotos };
    });
  };

  const handleMovePhoto = (fromIndex: number, toIndex: number) => {
    setEditData(prev => {
        if (!prev) return null;
        if (fromIndex === toIndex) return prev;
        
        const newPhotos = [...prev.photos];
        const [movedPhoto] = newPhotos.splice(fromIndex, 1);
        newPhotos.splice(toIndex, 0, movedPhoto);
        
        return { ...prev, photos: newPhotos };
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 max-w-md mx-auto relative">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Header Image */}
      <div className="h-64 relative bg-slate-900 group">
        {displayUser.photos.length > 0 ? (
            <img 
                src={displayUser.photos[0]} 
                alt="Profile" 
                className="w-full h-full object-cover transition-opacity duration-300"
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600">
                <Camera size={48} />
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950"></div>
        
        {/* Top Actions */}
        <div className="absolute top-6 right-6 flex gap-3">
             <button className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-colors">
                <Settings size={20} />
            </button>
        </div>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="flex justify-between items-end mb-6">
            <div className="flex-1 mr-4">
                {isEditing ? (
                  <div className="space-y-3 bg-slate-900/80 p-3 rounded-xl backdrop-blur-sm border border-slate-700/50">
                     <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Name</label>
                          <input 
                            type="text" 
                            value={displayUser.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none text-lg font-bold"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="w-20">
                          <label className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Age</label>
                          <input 
                            type="number" 
                            value={isNaN(displayUser.age) ? '' : displayUser.age}
                            onChange={(e) => updateField('age', parseInt(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none text-lg font-bold"
                            placeholder="18"
                          />
                        </div>
                     </div>
                     <div>
                        <label className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">City</label>
                        <input 
                          type="text" 
                          value={displayUser.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                          placeholder="Your City"
                        />
                     </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-white">{displayUser.name}, {displayUser.age}</h1>
                    <p className="text-slate-400">{displayUser.city}</p>
                  </>
                )}
            </div>

            <div className="flex gap-2 mb-1">
              {isEditing ? (
                 <>
                   <button 
                      onClick={cancelEditing}
                      className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 shadow-lg transition-colors"
                   >
                      <X size={20} />
                   </button>
                   <button 
                      onClick={saveEditing}
                      className="p-3 bg-amber-500 hover:bg-amber-400 rounded-full text-slate-900 shadow-lg shadow-amber-500/20 transition-colors"
                   >
                      <Check size={20} />
                   </button>
                 </>
              ) : (
                <button 
                  onClick={startEditing}
                  className="p-3 bg-amber-500 hover:bg-amber-400 rounded-full text-slate-900 shadow-lg shadow-amber-500/20 transition-colors"
                >
                    <Edit2 size={20} />
                </button>
              )}
            </div>
        </div>

        <div className="space-y-6">
            {/* BIO */}
            <section className={`bg-slate-900 rounded-2xl p-5 border ${isEditing ? 'border-amber-500/50' : 'border-slate-800'} transition-colors`}>
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">My Bio</h3>
                {isEditing ? (
                  <textarea 
                    value={displayUser.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-stone-300 focus:ring-2 focus:ring-amber-500 outline-none min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className={`leading-relaxed ${displayUser.bio ? 'text-stone-300' : 'text-slate-500 italic'}`}>
                    {displayUser.bio || "Tell us about yourself..."}
                  </p>
                )}
            </section>

            {/* COZY EVENING */}
            <section className={`bg-slate-900 rounded-2xl p-5 border ${isEditing ? 'border-amber-500/50' : 'border-slate-800'} transition-colors`}>
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-3">Perfect Cozy Evening</h3>
                {isEditing ? (
                   <textarea 
                   value={displayUser.cozyEvening}
                   onChange={(e) => updateField('cozyEvening', e.target.value)}
                   className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-stone-300 focus:ring-2 focus:ring-amber-500 outline-none min-h-[80px]"
                   placeholder="Describe your ideal night in..."
                 />
                ) : (
                  <p className={`text-stone-300 italic ${!displayUser.cozyEvening && 'text-slate-500'}`}>
                    "{displayUser.cozyEvening || "No description yet"}"
                  </p>
                )}
            </section>

            {/* COZY THINGS */}
            <section>
                <div className="flex justify-between items-baseline mb-3">
                   <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cozy Things</h3>
                   {isEditing && <span className="text-xs text-amber-500">Pick up to 3</span>}
                </div>
                
                {isEditing ? (
                   <div className="flex flex-wrap gap-2">
                     {AVAILABLE_COZY_THINGS.map(thing => {
                        const isSelected = displayUser.cozyThings.includes(thing);
                        const disabled = !isSelected && displayUser.cozyThings.length >= 3;
                        return (
                          <button
                            key={thing}
                            onClick={() => toggleCozyThing(thing)}
                            disabled={disabled}
                            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                              isSelected 
                                ? 'bg-amber-500 text-slate-900 border-amber-500' 
                                : disabled
                                    ? 'bg-slate-900 text-slate-700 border-slate-800 cursor-not-allowed'
                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                            }`}
                          >
                            {thing}
                          </button>
                        );
                     })}
                   </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                      {displayUser.cozyThings.map(thing => (
                          <span key={thing} className="px-3 py-1.5 bg-slate-800 rounded-full text-sm text-stone-300 border border-slate-700">
                              {thing}
                          </span>
                      ))}
                      {displayUser.cozyThings.length === 0 && (
                          <span className="text-sm text-slate-500 italic">No items selected</span>
                      )}
                  </div>
                )}
            </section>

            {/* INTERESTS */}
            <section>
                <div className="flex justify-between items-baseline mb-3">
                   <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interests</h3>
                   {isEditing && <span className="text-xs text-amber-500">Tap to toggle</span>}
                </div>
                
                {isEditing ? (
                   <div className="flex flex-wrap gap-2">
                     {AVAILABLE_INTERESTS.map(item => {
                        const isSelected = displayUser.interests?.includes(item);
                        return (
                          <button
                            key={item}
                            onClick={() => toggleInterest(item)}
                            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                              isSelected 
                                ? 'bg-slate-700 text-white border-amber-500' 
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                            }`}
                          >
                            {item}
                          </button>
                        );
                     })}
                   </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                      {displayUser.interests?.map(item => (
                          <span key={item} className="px-3 py-1.5 bg-slate-800 rounded-full text-sm text-stone-300 border border-slate-700">
                              {item}
                          </span>
                      ))}
                      {(!displayUser.interests || displayUser.interests.length === 0) && (
                          <span className="text-sm text-slate-500 italic">No interests selected</span>
                      )}
                  </div>
                )}
            </section>

             {/* PHOTOS */}
            <section>
                <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">My Photos</h3>
                    <span className="text-xs text-slate-600">{displayUser.photos.length} / 6</span>
                </div>
                
                {isEditing && <p className="text-xs text-amber-500 mb-2 animate-pulse">Drag to reorder • Tap + to add</p>}

                {!isEditing && displayUser.photos.length === 0 && (
                     <div className="bg-slate-900 rounded-xl p-8 text-center border border-slate-800 border-dashed">
                        <Camera className="mx-auto text-slate-700 mb-2" size={24} />
                        <p className="text-sm text-slate-500">No photos added yet.</p>
                     </div>
                )}

                <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
                    {displayUser.photos.map((photo, index) => {
                        const isDragged = draggedIndex === index;
                        const isDragOver = dragOverIndex === index;
                        return (
                        <div 
                            key={index} 
                            draggable={isEditing}
                            onDragStart={(e) => {
                                if (!isEditing) {
                                  e.preventDefault();
                                  return;
                                }
                                // Defer state update so the browser grabs the full opacity element for the ghost image
                                setTimeout(() => setDraggedIndex(index), 0);
                                e.dataTransfer.effectAllowed = "move";
                                e.dataTransfer.setData("text/plain", index.toString());
                            }}
                            onDragEnter={(e) => {
                                if (isEditing && draggedIndex !== null && draggedIndex !== index) {
                                    setDragOverIndex(index);
                                }
                            }}
                            onDragOver={(e) => {
                                if (!isEditing) return;
                                e.preventDefault();
                                e.dataTransfer.dropEffect = "move";
                            }}
                            onDrop={(e) => {
                                if (!isEditing) return;
                                e.preventDefault();
                                const sourceIndexStr = e.dataTransfer.getData("text/plain");
                                const sourceIndex = parseInt(sourceIndexStr, 10);
                                if (!isNaN(sourceIndex) && sourceIndex !== index) {
                                    handleMovePhoto(sourceIndex, index);
                                }
                                setDraggedIndex(null);
                                setDragOverIndex(null);
                            }}
                            onDragEnd={() => {
                                setDraggedIndex(null);
                                setDragOverIndex(null);
                            }}
                            className={`flex-shrink-0 snap-center relative group w-32 h-48 transition-all duration-200 ${
                                isDragged 
                                    ? 'opacity-40 scale-95 ring-2 ring-amber-500 rounded-xl cursor-grabbing' 
                                    : isEditing ? 'cursor-grab' : 'cursor-default'
                            } ${isDragOver && !isDragged ? 'scale-105 ring-2 ring-amber-500 rounded-xl z-10' : ''} ${isEditing && !isDragged && !isDragOver ? 'hover:scale-[1.02] hover:shadow-lg' : ''}`}
                        >
                            <img 
                                src={photo} 
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover rounded-xl border border-slate-800 select-none pointer-events-none" 
                            />
                            
                            {/* Drag Handle Icon - Only in edit mode */}
                            {isEditing && (
                              <div className="absolute top-2 left-2 p-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-md text-white/80 cursor-grab active:cursor-grabbing transition-colors pointer-events-none">
                                  <GripHorizontal size={16} />
                              </div>
                            )}

                            {/* Delete Button - Only in edit mode */}
                            {isEditing && (
                              <button 
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemovePhoto(index);
                                  }}
                                  className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full shadow-sm backdrop-blur-sm transition-opacity"
                              >
                                  <X size={14} strokeWidth={3} />
                              </button>
                            )}

                            {/* Reorder Controls - Only in edit mode */}
                            {isEditing && (
                              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                                  {index > 0 && (
                                      <button 
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              handleReorderPhoto(index, 'left');
                                          }}
                                          className="p-1.5 bg-black/50 hover:bg-amber-500 text-white hover:text-slate-900 rounded-full backdrop-blur-sm transition-colors"
                                      >
                                          <ChevronLeft size={14} />
                                      </button>
                                  )}
                                  {index < displayUser.photos.length - 1 && (
                                      <button 
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              handleReorderPhoto(index, 'right');
                                          }}
                                          className="p-1.5 bg-black/50 hover:bg-amber-500 text-white hover:text-slate-900 rounded-full backdrop-blur-sm transition-colors"
                                      >
                                          <ChevronRight size={14} />
                                      </button>
                                  )}
                              </div>
                            )}
                        </div>
                        );
                    })}
                    
                    {/* Add Photo Button - Only in edit mode */}
                    {isEditing && displayUser.photos.length < 6 && (
                        <div className="flex-shrink-0 snap-center">
                             <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-32 h-48 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 hover:text-amber-500 hover:border-amber-500/50 hover:bg-slate-800 transition-all"
                            >
                                <Plus size={32} className="mb-2" />
                                <span className="text-xs font-medium">Add Photo</span>
                            </button>
                        </div>
                    )}
                </div>
            </section>

             <section className="pt-4 border-t border-slate-900 space-y-2">
                <button 
                  onClick={onOpenSafety}
                  className="w-full flex items-center gap-3 p-4 bg-slate-900 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors"
                >
                    <Shield size={20} className="text-slate-500" />
                    <span>Safety & Guidelines</span>
                </button>
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 p-4 bg-slate-900 rounded-xl text-rose-400 hover:bg-slate-800 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>
             </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
