import React, { useEffect, useState, useRef } from 'react';
import { MessageCircle, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToConsultation = () => {
    const section = document.getElementById('tecnologias');
    section?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const whatsappLink = "https://wa.me/5511999999999?text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20VIP.";

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-navy-950">
      
      {/* 1. Cinematic Composite Background */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        
        {/* Layer A: Luxury Clinic Interior (The Physical Space) */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2000&auto=format&fit=crop" 
             alt="Clinic Interior" 
             className="w-full h-full object-cover scale-110 opacity-60"
             style={{ 
               transform: `scale(1.1) translate(${-mousePos.x * 10}px, ${-mousePos.y * 10}px)`,
               transition: 'transform 0.1s ease-out'
             }}
           />
        </div>

        {/* Layer B: Atmosphere & Grading */}
        <div className="absolute inset-0 bg-navy-950/70 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-transparent z-10 opacity-80"></div>
        
        {/* Layer C: The Aura (Gold Fluid Video as Ethereal Fog) */}
        <div className="absolute inset-0 z-20 opacity-40 mix-blend-screen pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover grayscale-[20%] contrast-125"
            style={{ transform: `scale(1.2) translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-fluid-moving-slowly-3165-large.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* 2. Massive Aura Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full text-center pointer-events-none mix-blend-overlay opacity-40">
        <h1 
          className="font-serif text-[25vw] leading-none text-white tracking-widest blur-sm select-none animate-[pulse-slow_4s_ease-in-out_infinite]"
          style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
        >
          AURA
        </h1>
      </div>

      {/* 3. Main Content Layer */}
      <div className="relative z-30 max-w-[90rem] mx-auto px-4 w-full flex flex-col h-full justify-center pb-20 md:pb-0">
        
        {/* Top Label - GREEN DOT VIP (No Red Icon) */}
        <div className="flex justify-center mb-8 md:mb-12 overflow-hidden">
          <div className="animate-[reveal_1.2s_ease-out_forwards]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 backdrop-blur-md border border-gold-500/30 hover:bg-gold-500/10 transition-colors shadow-[0_0_15px_rgba(219,182,43,0.2)]">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_1s_ease-in-out_infinite]"></span>
               <span className="text-[9px] md:text-[10px] text-gold-100 uppercase tracking-[0.2em] font-bold">Atendimento VIP Online</span>
            </div>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center mb-8 md:mb-12 relative z-40">
           <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.9] md:leading-[0.85] tracking-tight drop-shadow-2xl">
             <span className="block animate-[reveal_1.2s_ease-out_0.2s_forwards] opacity-0 translate-y-10">Restaurando</span>
             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400 italic font-light animate-[reveal_1.4s_ease-out_0.4s_forwards] opacity-0 translate-y-10">
               A Sua Identidade
             </span>
           </h1>
        </div>

        {/* Bottom Details & Actions */}
        <div className="flex flex-col items-center animate-[reveal_1.5s_ease-out_0.8s_forwards] opacity-0 translate-y-10 z-50 w-full md:w-auto px-4">
          
          <p className="max-w-xs md:max-w-lg text-center text-slate-200 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 font-light text-balance drop-shadow-lg bg-navy-950/30 backdrop-blur-sm rounded-lg p-2 md:bg-transparent md:backdrop-blur-0">
            Tecnologia suíça, precisão microscópica e garantia vitalícia.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
             {/* WhatsApp VIP Button */}
             <a 
               href={whatsappLink}
               target="_blank"
               rel="noopener noreferrer"
               className="relative w-full md:w-auto group cursor-pointer overflow-hidden rounded-full p-[2px] shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(219,182,43,0.5)] active:scale-95 transition-all duration-300"
              >
               <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_60deg,#22c55e_120deg,#DBB62B_180deg,transparent_240deg)] animate-[spin_2.5s_linear_infinite]"></span>
               
               <div className="relative bg-navy-950 flex items-center justify-center gap-3 px-8 py-4 rounded-full h-full group-hover:bg-navy-900 transition-colors z-10">
                 <MessageCircle size={20} className="text-green-500 group-hover:scale-110 transition-transform duration-300" />
                 <span className="text-sm font-bold text-white uppercase tracking-widest group-hover:text-gold-400">WHATSAPP VIP</span>
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               </div>
             </a>

             {/* Diagnosis Button */}
             <button 
                onClick={scrollToConsultation}
                className="group w-full md:w-auto relative px-8 py-4 bg-white/5 border border-white/20 hover:border-gold-500 rounded-full md:rounded-sm overflow-hidden transition-all duration-300 active:scale-95 backdrop-blur-md"
             >
                <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-navy-950 transition-colors duration-500 flex items-center justify-center gap-2">
                  <Zap size={14} className="text-gold-500 group-hover:text-navy-950" />
                  Diagnóstico IA Gratuito
                </span>
                <div className="absolute inset-0 bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-[0.19,1,0.22,1]"></div>
             </button>
          </div>
          
          <p className="mt-6 text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2 drop-shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            2 Especialistas online agora
          </p>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-0 w-full flex justify-center z-30 pointer-events-none mix-blend-difference">
        <div className="flex flex-col items-center gap-2 animate-bounce opacity-60">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white to-transparent"></div>
        </div>
      </div>
    </div>
  );
};