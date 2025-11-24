import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-primary text-white p-3 shadow-lg sticky top-0 z-50 border-b border-brand-accent">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Logo Container - Adjusted for variable aspect ratios */}
          <div className="h-12 w-auto min-w-[3rem] flex items-center justify-center shrink-0 rounded-lg bg-white p-1">
             <img 
               src="/logo.png" 
               alt="EB Tire Repair Logo" 
               className="h-full w-auto object-contain"
               onError={(e) => {
                   // Fallback if local file not found
                   e.currentTarget.src = "https://placehold.co/400x400/ec4899/ffffff?text=EB";
               }}
             />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide leading-tight">EB 24小時換呔服務</h1>
            <p className="text-xs text-pink-100 font-medium">24小時 專業換呔及補呔服務</p>
          </div>
        </div>
      </div>
    </header>
  );
};