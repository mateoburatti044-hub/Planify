
import React from 'react';

export const Logo: React.FC<{ size?: number; showText?: boolean; className?: string }> = ({ size = 48, showText = true, className = "" }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div 
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center rotate-45"
      >
        {/* Background Diamond */}
        <div className="absolute inset-0 bg-planify-accent rounded-lg shadow-accent-glow"></div>
        {/* Interlaced Geometric Pattern */}
        <svg 
          viewBox="0 0 100 100" 
          className="relative w-full h-full -rotate-45 p-2"
          fill="none" 
          stroke="white" 
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 20 L80 20 L80 80 L50 80 L50 40 L35 40 L35 65" />
          <path d="M20 35 L20 80 L35 80" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tighter text-planify-text-primary uppercase leading-none">Planify</span>
          <span className="text-[10px] font-black tracking-[0.25em] text-planify-accent-glow uppercase mt-1">Simplify, Organize, Succeed</span>
        </div>
      )}
    </div>
  );
};
