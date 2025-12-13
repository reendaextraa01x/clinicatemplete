import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background logic
      setIsScrolled(currentScrollY > 50);

      // Hide/Show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-navy-950/80 backdrop-blur-xl border-b border-white/5 py-4' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="w-px h-8 bg-gold-500 mr-4 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
            <div>
              <span className={`font-serif text-3xl tracking-widest font-bold ${isScrolled ? 'text-white' : 'text-white'} group-hover:text-gold-400 transition-colors`}>
                AURA
              </span>
              <span className="block text-[0.6rem] uppercase tracking-[0.4em] text-gold-500 font-medium">
                Clinic
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center">
            {['A Clínica', 'Tecnologias', 'Resultados', 'Protocolos'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative text-xs uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-colors duration-300 group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-px bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
              </a>
            ))}
            <button 
              onClick={scrollToContact}
              className="relative overflow-hidden px-8 py-3 border border-white/20 hover:border-gold-500 transition-colors group rounded-sm"
            >
              <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-navy-950 transition-colors duration-300">Agendar</span>
              <div className="absolute inset-0 bg-gold-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gold-500 transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Full Screen Mobile Menu Overlay */}
    <div className={`fixed inset-0 bg-navy-950 z-40 transition-all duration-700 ease-[0.22, 1, 0.36, 1] ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
      <div className="h-full flex flex-col items-center justify-center space-y-8">
          {['A Clínica', 'Tecnologias', 'Resultados', 'Protocolos'].map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-serif text-white hover:text-gold-500 transition-colors"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={scrollToContact}
            className="mt-8 px-12 py-4 bg-gold-500 text-navy-950 font-bold uppercase tracking-widest text-sm"
          >
            Agendar Consulta
          </button>
      </div>
    </div>
    </>
  );
};