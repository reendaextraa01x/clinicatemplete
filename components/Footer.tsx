import React from 'react';
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-navy-950 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center mb-6">
              <span className="font-serif text-3xl tracking-widest font-semibold text-white">
                AURA
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Elevando o padrão mundial em restauração capilar através da fusão entre arte, tecnologia e medicina de precisão.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-gold-500 hover:text-navy-950 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Menu</h4>
            <ul className="space-y-3">
              {['Sobre Nós', 'Técnica FUE', 'Técnica DHI', 'Galeria', 'Contato'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-gold-400 text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Tratamentos</h4>
            <ul className="space-y-3">
              {['Transplante Capilar', 'Transplante de Barba', 'Transplante de Sobrancelha', 'Mesoterapia', 'Laserterapia'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-gold-400 text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Contato VIP</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={18} className="text-gold-500 shrink-0 mt-1" />
                <span>Av. Faria Lima, 4000 - Andar 32<br/>São Paulo, SP - Brasil</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={18} className="text-gold-500 shrink-0" />
                <span>+55 11 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={18} className="text-gold-500 shrink-0" />
                <span>concierge@auracapilar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">© 2024 Aura Capilar. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400">Privacidade</a>
            <a href="#" className="hover:text-slate-400">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};