import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Star } from 'lucide-react';

const cases = [
  {
    id: 1,
    title: "Reconstrução Frontal",
    desc: "Técnica FUE Sapphire",
    before: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1200&auto=format&fit=crop", 
    after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop" 
  },
  {
    id: 2,
    title: "Densidade Coroa",
    desc: "Técnica DHI Precision",
    before: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1200&auto=format&fit=crop" 
  },
  {
    id: 3,
    title: "Redesign Artístico",
    desc: "Técnica Híbrida 4k UFs",
    before: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
  }
];

export const ResultsGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = cases[activeIndex];

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag as any);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleDrag as any);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag as any);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleDrag as any);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % cases.length);
    setSliderPosition(50);
  };
  
  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length);
    setSliderPosition(50);
  };

  return (
    <section id="resultados" className="py-20 md:py-32 bg-navy-950 relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold md:pl-1 flex items-center justify-center md:justify-start gap-2">
              <Star size={10} fill="currentColor" /> Casos Verificados
            </span>
            <h2 className="mt-4 text-5xl md:text-6xl font-serif text-white leading-none">
              A Arte da <br/>
              <span className="italic text-slate-400">Restauração</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button onClick={prev} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition-all duration-300 active:scale-95">
              <ArrowLeft size={20} />
            </button>
            <button onClick={next} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition-all duration-300 active:scale-95">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Comparison Slider Component */}
        <div 
          ref={containerRef}
          className="relative w-full h-[400px] md:h-[700px] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 group"
          onMouseDown={handleDrag}
          onTouchMove={handleDrag}
          onClick={handleDrag}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={activeCase.after} 
              alt="Depois" 
              className="w-full h-full object-cover"
              draggable="false"
            />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-gold-500 text-navy-950 px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm z-10 shadow-lg">
              Depois
            </div>
            
            {/* Info Overlay */}
            <div className="absolute bottom-0 right-0 p-6 md:p-12 text-right bg-gradient-to-t from-navy-950/90 via-navy-950/60 to-transparent w-full">
               <h3 className="text-2xl md:text-4xl font-serif text-white mb-1">{activeCase.title}</h3>
               <p className="text-gold-400 tracking-wide text-xs md:text-base">{activeCase.desc}</p>
            </div>
          </div>

          {/* Before Image (Overlay - Clipped) */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden border-r border-white/20"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={activeCase.before} 
              alt="Antes" 
              className="absolute top-0 left-0 h-full max-w-none w-[100vw] md:w-[calc(100vw-2rem)] lg:w-[1280px] object-cover filter grayscale contrast-125"
              style={{ objectPosition: 'left' }}
              draggable="false"
            />
            <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-black/60 text-white border border-white/20 px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm backdrop-blur-md">
              Antes
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-gold-500 cursor-ew-resize z-20 shadow-[0_0_20px_rgba(219,182,43,0.8)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-gold-500 active:scale-110 transition-transform">
              <div className="flex gap-1">
                <ChevronRight size={16} className="text-navy-950 rotate-180" />
                <ChevronRight size={16} className="text-navy-950" />
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-center text-slate-500 text-[10px] tracking-widest uppercase opacity-80 animate-pulse">
          &larr; Arraste para comparar &rarr;
        </p>

        {/* Stats Strip - Optimized Grid for Mobile */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { number: "5k+", label: "Procedimentos" },
              { number: "98%", label: "Taxa de Sucesso" },
              { number: "15", label: "Anos de Exp." },
              { number: "ISO", label: "Certificação" }
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default p-4 bg-navy-900/50 rounded-xl border border-white/5 hover:bg-navy-900 transition-colors">
                <div className="text-3xl md:text-5xl font-serif text-white mb-1 group-hover:text-gold-400 transition-colors duration-500">{stat.number}</div>
                <div className="text-slate-500 text-[10px] md:text-xs tracking-[0.2em] uppercase">{stat.label}</div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};