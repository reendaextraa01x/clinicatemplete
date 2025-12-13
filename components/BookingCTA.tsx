import React from 'react';
import { Calendar, MessageCircle, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BookingCTA: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-navy-950 isolate border-t border-white/5">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-navy-950 z-0">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-600/10 via-navy-950/80 to-navy-950 pointer-events-none"></div>
      </div>
      
      {/* Floating Elements for depth */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gold-500/10 rounded-full blur-[60px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] animate-pulse-slow delay-700 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="relative bg-gradient-to-b from-navy-900/80 to-navy-950 border border-gold-500/30 rounded-[2.5rem] p-8 md:p-20 text-center overflow-hidden shadow-[0_0_60px_rgba(219,182,43,0.1)] group">
          
          {/* Shine effect on card */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out pointer-events-none"></div>

          {/* Scarcity Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-8 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
            Agenda de Setembro: Últimas 3 vagas
          </div>

          <h2 className="text-4xl md:text-7xl font-serif text-white mb-6 leading-[1.05]">
            Pronto para a sua <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-white to-gold-200 animate-shine bg-[length:200%_auto] italic">Nova Identidade?</span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            A decisão de hoje define a imagem que você verá no espelho amanhã. 
            Agende agora e receba um <span className="text-gold-400 font-medium">planejamento 3D gratuito</span> na primeira consulta.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-14">
            <a 
              href="https://wa.me/5511999999999?text=Ol%C3%A1,%20quero%20garantir%20minha%20condi%C3%A7%C3%A3o%20especial."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full md:w-auto px-10 py-6 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-sm tracking-[0.2em] uppercase rounded-xl hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(219,182,43,0.6)] transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <MessageCircle size={20} className="stroke-[2.5]" />
              <span className="relative z-10">Agendar Consultoria VIP</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button className="group w-full md:w-auto px-10 py-6 bg-navy-800/50 border border-white/10 text-white font-bold text-sm tracking-[0.2em] uppercase rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3">
              <Calendar size={20} className="text-slate-400 group-hover:text-white transition-colors" />
              <span>Ver Disponibilidade</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 pt-8 border-t border-white/5">
             <div className="flex items-center gap-2 text-slate-400 text-xs md:text-sm">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>Retorno em &lt; 15 min</span>
             </div>
             <div className="flex items-center gap-2 text-slate-400 text-xs md:text-sm">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>Sigilo Absoluto (NDA)</span>
             </div>
             <div className="flex items-center gap-2 text-slate-400 text-xs md:text-sm">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>Concierge Dedicado</span>
             </div>
          </div>
          
          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 bg-navy-950/50 inline-flex px-4 py-2 rounded-full border border-white/5">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full bg-navy-800 border border-navy-900 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-full h-full object-cover opacity-80" />
                    </div>
                 ))}
              </div>
              <span className="ml-2">127 pessoas agendaram esta semana</span>
          </div>

        </div>
      </div>
    </section>
  );
};