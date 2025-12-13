import React from 'react';
import { Award, Users, GraduationCap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="a-clinica" className="py-32 bg-navy-900 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(219, 182, 43, 0.05) 0%, transparent 50%)' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Image Composition - Foto do Dr. Alexandre Valois */}
          <div className="relative order-2 lg:order-1 flex flex-col gap-6">
             
             {/* Título Acima da Foto */}
             <div className="text-left pl-2">
                <h3 className="font-serif text-3xl text-white">Dr. Alexandre Valois</h3>
                <p className="text-gold-500 text-xs tracking-widest uppercase mt-1 font-bold">CRM/SP 123.456 • Membro ISHRS</p>
             </div>

             <div className="relative group">
                 <div className="absolute -inset-4 border border-gold-500/10 rounded-xl transform rotate-3 transition-transform duration-700 group-hover:rotate-0"></div>
                 <div className="absolute -inset-4 border border-white/5 rounded-xl transform -rotate-2 transition-transform duration-700 group-hover:rotate-0"></div>
                 
                 <div className="relative rounded-lg overflow-hidden shadow-2xl h-[500px] md:h-[600px]">
                    <img 
                      src="https://i.imgur.com/Lh67O0k.jpeg" 
                      alt="Dr. Alexandre Valois" 
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 ease-out transform group-hover:scale-105"
                      style={{ objectPosition: 'top center' }}
                    />
                    <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-500"></div>
                 </div>
             </div>

             {/* Breve Descrição Abaixo da Foto */}
             <p className="text-slate-400 text-sm leading-relaxed text-justify border-l-2 border-gold-500/30 pl-4 py-1">
                Com uma trajetória marcada pela excelência e inovação, Dr. Valois é referência internacional em tricologia médica. Sua abordagem une precisão cirúrgica e sensibilidade artística, garantindo resultados que restauram não apenas fios, mas a confiança de seus pacientes.
             </p>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2 lg:pt-10">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-[1px] bg-gold-500"></div>
               <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-bold">Direção Médica</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-[1.1]">
              A Visão do <br/>
              <span className="text-slate-500 italic">Especialista.</span>
            </h2>
            
            <p className="text-slate-300 text-lg font-light leading-relaxed mb-10">
              Com mais de 15 anos de dedicação exclusiva à restauração capilar, o Dr. Alexandre Valois combina a precisão da microcirurgia com um olhar artístico refinado. Fundador da Aura Capilar, ele lidera uma equipe de elite comprometida em devolver não apenas cabelos, mas a identidade de cada paciente.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: Award, title: "Reconhecimento Internacional", desc: "Membro Titular da ISHRS e premiado por inovações em FUE." },
                { icon: GraduationCap, title: "Formação de Elite", desc: "Especialização na Europa e EUA, trazendo protocolos exclusivos." },
                { icon: Users, title: "Atendimento Humanizado", desc: "Acompanhamento pessoal do Dr. Alexandre em todas as etapas." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group cursor-default">
                  <div className="w-14 h-14 rounded-full bg-navy-950 border border-white/10 flex items-center justify-center text-gold-500 shrink-0 group-hover:border-gold-500/50 group-hover:scale-110 transition-all duration-300">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-medium mb-2 group-hover:text-gold-400 transition-colors">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};