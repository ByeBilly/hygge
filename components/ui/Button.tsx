import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-full font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/20",
    secondary: "bg-rose-300 hover:bg-rose-200 text-slate-900",
    outline: "border-2 border-slate-700 hover:border-amber-500 hover:text-amber-500 text-slate-300",
    ghost: "bg-transparent text-slate-400 hover:text-stone-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};