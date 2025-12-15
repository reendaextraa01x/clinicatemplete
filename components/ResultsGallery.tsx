import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, Star, CheckCircle2 } from 'lucide-react';

const activeCase = {
  id: 1,
  title: "Reconstrução Frontal & Densidade",
  desc: "Protocolo FUE Sapphire Elite • 3.200 UFs",
  // Imagens de alta resolução perfeitamente alinhadas
  before: "https://i.imgur.com/iyFp8fA.jpeg", 
  after: "https://i.imgur.com/8PhP1De.png" 
};

export const ResultsGallery: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Função otimizada para calcular a posição
  const calculatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    // Calcular posição imediata ao clicar na barra (jump to click)
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const newPos = calculatePosition(clientX);
    if (newPos !== undefined) setSliderPosition(newPos);
  };

  const handleStopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    // Previne seleção de texto ou arrastar imagem fantasma
    if (e.cancelable) e.preventDefault(); 

    const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const newPos = calculatePosition(clientX);
    
    if (newPos !== undefined) {
      // Usando requestAnimationFrame para performance ultra-smooth
      requestAnimationFrame(() => {
        setSliderPosition(newPos);
      });
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleStopDrag);
      window.addEventListener('touchmove', handleMouseMove, { passive: false }); // passive: false permite preventDefault
      window.addEventListener('touchend', handleStopDrag);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleStopDrag);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleStopDrag);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleStopDrag);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleStopDrag);
    };
  }, [isDragging, handleMouseMove, handleStopDrag]);

  return (
    <section id="resultados" className="py-20 md:py-32 bg-navy-950 relative border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold flex items-center justify-center md:justify-start gap-2">
              <Star size={10} fill="currentColor" /> Resultado Platinum
            </span>
            <h2 className="mt-4 text-4xl md:text-6xl font-serif text-white leading-none">
              A Arte da <br/>
              <span className="italic text-slate-400">Transformação</span>
            </h2>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-400 font-mono border border-white/10 px-4 py-2 rounded-full bg-navy-900">
             <CheckCircle2 size={14} className="text-green-500" />
             Caso Real Verificado • 12 meses pós-operatório
          </div>
        </div>

        {/* Comparison Slider Component */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          <div 
            ref={containerRef}
            className={`relative w-full h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 select-none touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-ew-resize'}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* 1. After Image (Background Layer) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={activeCase.after} 
                alt="Depois" 
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable="false"
              />
              <div className="absolute top-6 right-6 bg-gold-500 text-navy-950 px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-sm z-10 shadow-lg">
                Depois
              </div>
            </div>

            {/* 2. Before Image (Clipped Layer) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-gold-500 bg-navy-950"
              style={{ width: `${sliderPosition}%`, transition: isDragging ? 'none' : 'width 0.1s ease-out' }}
            >
              <img 
                src={activeCase.before} 
                alt="Antes" 
                className="absolute top-0 left-0 h-full max-w-none w-full object-cover filter grayscale contrast-110 select-none pointer-events-none"
                style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
                draggable="false"
              />
              <div className="absolute top-6 left-6 bg-black/70 text-white border border-white/20 px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-sm backdrop-blur-md">
                Antes
              </div>
            </div>

            {/* 3. Slider Handle (Interactive) */}
            <div 
              className="absolute top-0 bottom-0 w-12 -ml-6 cursor-ew-resize z-30 flex items-center justify-center group outline-none"
              style={{ left: `${sliderPosition}%` }}
              // No event handlers here, simpler to handle on container
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] border-2 border-gold-500 transition-transform duration-200 ${isDragging ? 'scale-110 bg-gold-100' : 'scale-100 group-hover:scale-105'}`}>
                <div className="flex gap-0.5">
                  <ChevronRight size={16} className="text-navy-950 rotate-180" />
                  <ChevronRight size={16} className="text-navy-950" />
                </div>
              </div>
            </div>
            
            {/* Info Overlay Bottom */}
             <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8 pointer-events-none">
                <h3 className="text-2xl text-white font-serif">{activeCase.title}</h3>
                <p className="text-gold-400 text-sm font-medium">{activeCase.desc}</p>
             </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <p className="text-slate-500 text-[10px] tracking-widest uppercase animate-pulse flex items-center gap-2">
              <span className="w-10 h-px bg-slate-700"></span>
              Arraste para comparar
              <span className="w-10 h-px bg-slate-700"></span>
            </p>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/5 pt-12">
            {[
              { number: "5k+", label: "Procedimentos" },
              { number: "98%", label: "Taxa de Sucesso" },
              { number: "15", label: "Anos de Exp." },
              { number: "ISO", label: "Certificação" }
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default p-4 hover:bg-navy-900/30 rounded-xl transition-colors">
                <div className="text-3xl md:text-5xl font-serif text-white mb-1 group-hover:text-gold-400 transition-colors duration-500">{stat.number}</div>
                <div className="text-slate-500 text-[10px] md:text-xs tracking-[0.2em] uppercase">{stat.label}</div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};