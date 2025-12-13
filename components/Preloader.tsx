import React, { useEffect, useState } from 'react';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(onComplete, 1200); // Wait for exit animation
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-navy-950 flex flex-col items-center justify-center transition-transform duration-1000 ease-[0.87,0,0.13,1] ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="relative mb-8 text-center">
        <h1 className="font-serif text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-600 tracking-widest opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
          AURA
        </h1>
        <p className="text-slate-500 text-xs uppercase tracking-[0.5em] mt-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
          Medical Excellence
        </p>
        
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-px bg-navy-800 overflow-hidden">
            <div className="h-full bg-gold-500 transition-all duration-300 ease-out shadow-[0_0_10px_#DBB62B]" style={{ width: `${Math.min(100, progress)}%` }}></div>
        </div>
      </div>
      <div className="font-mono text-[10px] text-gold-500/50 mt-12">
        LOADING SYSTEM {Math.min(100, Math.floor(progress))}%
      </div>
    </div>
  );
};