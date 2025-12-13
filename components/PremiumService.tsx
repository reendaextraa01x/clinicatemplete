import React from 'react';
import { Crown, Plane, Clock, MessageCircle, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export const PremiumService: React.FC = () => {
  const whatsappLink = "https://wa.me/5511999999999?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20a%20experi%C3%AAncia%20Aura%20Black.";

  return (
    <section className="relative py-20 md:py-32 bg-navy-950 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-navy-950 to-navy-950 z-0"></div>
      
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative bg-gradient-to-b from-navy-900 to-black border border-gold-500/20 rounded-3xl p-6 md:p-16 overflow-hidden shadow-2xl">
          
          {/* Scarcity Banner */}
          <div className="absolute top-0 right-0 bg-gold-500 text-navy-950 text-[9px] md:text-[10px] font-bold px-4 py-2 uppercase tracking-widest rounded-bl-xl z-20">
             Vagas Limitadas: Setembro/24
          </div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
            
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <Crown size={24} className="text-gold-500 fill-gold-500/20 animate-pulse" />
                <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-bold">Aura Black Membership</span>
              </div>
              
              <h2 className="text-3xl md:text-6xl font-serif text-white mb-6 leading-tight">
                Experiência <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Ultra-Premium.</span>
              </h2>
              
              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed mb-8 md:pr-10">
                A jornada definitiva para quem exige o máximo. Privacidade absoluta, logística impecável e resultados artísticos.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Plane, text: "Transporte Aéreo/Terrestre Privativo" },
                  { icon: Lock, text: "Sigilo Absoluto (NDA Assinado)" },
                  { icon: Clock, text: "Atendimento 'Off-Hours'" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-200">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold-500 border border-white/10 shrink-0">
                      <item.icon size={14} />
                    </div>
                    <span className="text-xs md:text-sm tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>

              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 px-6 py-4 md:px-8 md:py-5 bg-gold-500 text-navy-950 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 w-full md:w-auto justify-center md:justify-start shadow-[0_0_30px_rgba(219,182,43,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <MessageCircle size={18} />
                  Aplicar para Membership
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-[0.19,1,0.22,1]"></div>
              </a>
              <p className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Concierge Online
              </p>
            </div>

            {/* Visual Side - Card Look */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-white/10 group shadow-2xl transform transition-transform hover:scale-[1.02] duration-700">
                <img 
                  src="https://i.imgur.com/6gna5Vl.jpeg" 
                  alt="Experiência VIP" 
                  className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700"
                />
                
                {/* Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-navy-950/90 backdrop-blur-md p-4 md:p-6 border border-white/10 rounded-xl">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gold-500 text-[9px] md:text-xs uppercase tracking-widest mb-1">Status: Convidado</p>
                      <p className="text-white font-serif text-lg md:text-xl">Aura Black Card</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/10">
                      <ArrowRight size={14} className="-rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};