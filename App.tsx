import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { About } from './components/About';
import { AIHairAnalyzer } from './components/AIHairAnalyzer';
import { ResultsGallery } from './components/ResultsGallery';
import { ChatWidget } from './components/ChatWidget';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Marquee } from './components/Marquee';
import { PremiumService } from './components/PremiumService';
import { ImpactMetrics } from './components/ImpactMetrics';
import { BookingCTA } from './components/BookingCTA';

function App() {
  return (
    <>
      <div className="min-h-screen bg-navy-950 text-slate-200 selection:bg-gold-500 selection:text-navy-950 font-sans cursor-none">
        <CustomCursor />
        <Navbar />
        
        <main>
          <Hero />
          
          <Marquee text="Excelência • Precision • Arte • Luxo" />

          <ImpactMetrics />

          {/* Navigation Order: A Clínica -> Tecnologias -> Resultados -> Protocolos */}
          
          <About /> {/* id="a-clinica" */}
          
          <Marquee text="Tecnologia • Inovação • Futuro • AI Vision" reverse />

          <AIHairAnalyzer /> {/* id="tecnologias" */}
          
          <ResultsGallery /> {/* id="resultados" */}
          
          <Features /> {/* id="protocolos" */}
          
          <PremiumService />

          <BookingCTA />
          
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  );
}

export default App;