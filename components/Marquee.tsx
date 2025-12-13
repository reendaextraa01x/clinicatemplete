import React from 'react';

interface MarqueeProps {
  text: string;
  reverse?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ text, reverse = false, className = '' }) => {
  return (
    <div className={`relative flex overflow-hidden py-6 bg-navy-950 border-y border-white/5 z-20 ${className}`}>
      {/* Container needs width to allow scrolling */}
      <div className={`flex whitespace-nowrap animate-${reverse ? 'marquee-reverse' : 'marquee'} hover:[animation-play-state:paused]`}>
        {/* Tripled content to ensure gapless loop on wide screens */}
        {[...Array(12)].map((_, i) => (
          <span key={i} className="mx-8 text-4xl md:text-6xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/5 uppercase tracking-tighter hover:from-gold-500/80 hover:to-gold-500/60 transition-all duration-700 cursor-default select-none">
            {text} <span className="text-gold-500/20 mx-6 text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};