import React, { useEffect, useState, useRef } from 'react';
import { Trophy, Users, HeartPulse, Globe } from 'lucide-react';

const stats = [
  {
    id: 1,
    label: "Fios Implantados",
    value: 12,
    suffix: "M+",
    icon: <Trophy size={20} />,
    desc: "Precisão microscópica em escala massiva."
  },
  {
    id: 2,
    label: "Vidas Transformadas",
    value: 5400,
    suffix: "+",
    icon: <Users size={20} />,
    desc: "Histórias reais de confiança recuperada."
  },
  {
    id: 3,
    label: "Índice de Satisfação",
    value: 99,
    suffix: ".8%",
    icon: <HeartPulse size={20} />,
    desc: "Excelência confirmada por auditoria externa."
  },
  {
    id: 4,
    label: "Países Atendidos",
    value: 24,
    suffix: "",
    icon: <Globe size={20} />,
    desc: "Referência global em tricologia."
  }
];

export const ImpactMetrics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom hook logic inside component for counting animation
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const interval = duration / steps;
    
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

      setCounts(stats.map(stat => Math.floor(stat.value * easeOut)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(stats.map(stat => stat.value)); // Ensure exact final numbers
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={containerRef} className="py-20 bg-navy-950 relative border-b border-white/5 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-600/10 via-navy-950 to-navy-950 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={stat.id} className="relative group">
              {/* Vertical Separator */}
              {index !== 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block"></div>
              )}
              
              <div className="flex flex-col items-center text-center p-4 transition-transform duration-500 hover:-translate-y-2">
                <div className="mb-4 p-3 bg-white/5 rounded-full text-gold-500 border border-white/5 group-hover:border-gold-500/50 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(219,182,43,0.1)]">
                  {stat.icon}
                </div>
                
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tighter">
                    {counts[index]}
                  </span>
                  <span className="text-2xl md:text-3xl font-serif text-gold-500">
                    {stat.suffix}
                  </span>
                </div>
                
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-2">
                  {stat.label}
                </h4>
                
                <p className="text-[10px] text-slate-500 max-w-[150px] leading-relaxed group-hover:text-gold-400/80 transition-colors">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};