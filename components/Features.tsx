import React from 'react';
import { Microscope, ShieldCheck, Sparkles, Check, Star, Zap } from 'lucide-react';

const protocols = [
  {
    id: '01',
    icon: <Microscope size={32} />,
    title: "FUE Sapphire Elite",
    rating: "4.98",
    reviews: "Satisfação Máxima",
    badge: "Mais Procurado",
    description: "A evolução da técnica FUE. Utilizando lâminas de safira ultra-precisas, minimizamos o trauma tecidual e aceleramos a recuperação em 50%.",
    features: ["Lâminas de Safira", "Sem cicatriz linear", "Recuperação em 3 dias"],
    image: "https://i.imgur.com/eQQFDXl.jpeg"
  },
  {
    id: '02',
    icon: <Sparkles size={32} />,
    title: "DHI Precision Art",
    rating: "5.0",
    reviews: "Design Artístico",
    badge: "Premium",
    description: "Implante Direto de Cabelo com canetas Choi. Controle total sobre a profundidade e ângulo. Ideal para densificar áreas sem raspar.",
    features: ["Sem raspar a receptora", "Máxima densidade", "Angulação 100% natural"],
    image: "https://i.imgur.com/QqizZw3.jpeg"
  },
  {
    id: '03',
    icon: <ShieldCheck size={32} />,
    title: "Aura Lifetime",
    rating: "5.0",
    reviews: "Garantia Vitalícia",
    badge: "Exclusivo",
    description: "Nossa confiança na excelência técnica é absoluta. Oferecemos garantia vitalícia por escrito para cada folículo transplantado.",
    features: ["Certificado Vitalício", "Acompanhamento 12 meses", "Suporte 24/7"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
  }
];

export const Features: React.FC = () => {
  return (
    <section id="protocolos" className="py-20 md:py-32 bg-navy-950 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 md:mb-32 md:w-2/3 relative z-10">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-8 md:w-12 h-px bg-gold-500"></div>
             <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-bold">Nossos Métodos</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-serif text-white leading-[1.1]">
            Protocolos <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-600 italic">Exclusivos</span>
          </h2>
        </div>

        <div className="relative">
          {protocols.map((protocol, index) => (
            <div 
              key={index} 
              className="sticky-card group bg-navy-900 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-12 lg:p-16 mb-8 md:mb-24 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out hover:border-gold-500/30 hover:scale-[1.01]"
              style={{ 
                position: 'sticky',
                top: `calc(100px + ${index * 15}px)`, 
                zIndex: index + 1
              }}
            >
              {/* Highlight Badge */}
              {protocol.badge && (
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
                    <div className="px-3 py-1 bg-gold-500 text-navy-950 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg flex items-center gap-1">
                        <Zap size={10} fill="currentColor" /> {protocol.badge}
                    </div>
                </div>
              )}

              {/* Darker Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/80 to-navy-950/40 pointer-events-none z-0"></div>
              
              <div className="grid lg:grid-cols-2 gap-6 md:gap-20 items-center relative z-10">
                {/* Content Side */}
                <div className="order-2 lg:order-1">
                  
                  {/* Title Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl md:text-7xl font-serif text-white/5 font-bold absolute -top-2 md:-top-10 -left-2 md:-left-6 select-none">{protocol.id}</span>
                    <div className="relative z-10 p-2 md:p-4 bg-navy-950 border border-gold-500/20 rounded-xl text-gold-500 shadow-xl">
                      {React.cloneElement(protocol.icon as React.ReactElement<any>, { className: "w-6 h-6 md:w-8 md:h-8" })} 
                    </div>
                    <h3 className="text-2xl md:text-4xl font-serif text-white relative z-10">{protocol.title}</h3>
                  </div>

                  {/* Rating Block */}
                  <div className="flex items-center gap-3 mb-6 pl-14 md:pl-20">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="text-gold-500 fill-gold-500" />
                      ))}
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">{protocol.rating}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest border-l border-white/10 pl-2">
                          {protocol.reviews}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 text-sm md:text-lg leading-relaxed mb-6 md:mb-10 font-light border-l-2 border-gold-500/30 pl-4 bg-gradient-to-r from-white/5 to-transparent py-2 md:py-4 rounded-r-lg">
                    {protocol.description}
                  </p>
                  
                  <ul className="grid grid-cols-1 gap-2 md:gap-4">
                    {protocol.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-200">
                        <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 shrink-0">
                          <Check size={10} className="text-gold-500" />
                        </div>
                        <span className="text-xs md:text-base tracking-wide font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Side */}
                <div className="order-1 lg:order-2 relative h-[180px] md:h-[450px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                   <div className="absolute inset-0 bg-navy-950/20 z-10"></div>
                   <img 
                    src={protocol.image} 
                    alt={protocol.title} 
                    className="w-full h-full object-cover" 
                   />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
