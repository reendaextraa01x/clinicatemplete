import React, { useState, useRef, useEffect } from 'react';
import { Upload, Scan, Loader2, AlertCircle, CheckCircle2, Shield, BrainCircuit, Activity, RefreshCw, ChevronRight, Lock } from 'lucide-react';
import { analyzeHairImage } from '../services/geminiService';

export const AIHairAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gamification Steps
  const steps = [
    "Digitalizando Imagem...",
    "Mapeando Unidades Foliculares...",
    "Calculando Densidade por cm²...",
    "Consultando Banco de Dados...",
    "Gerando Relatório..."
  ];

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      setAnalysisStep(0);
      interval = setInterval(() => {
        setAnalysisStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 800); // Change text every 800ms to simulate fast processing
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null); 
        setError(null);
        // Auto scroll to preview
        setTimeout(() => {
           document.getElementById('hud-interface')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeHairImage(selectedImage);
      // Artificial delay to finish the animations if API is too fast
      await new Promise(r => setTimeout(r, 2000));
      setResult(analysis);
    } catch (error: any) {
      console.error(error);
      const msg = error?.message?.includes("Alta demanda") 
        ? error.message 
        : "Não foi possível analisar. Tente uma foto mais clara.";
      setError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="tecnologias" className="py-20 md:py-32 bg-navy-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-b from-navy-800/20 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Text Content */}
          <div className="lg:col-span-5 pt-4 md:pt-8 text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-6 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
              <BrainCircuit size={14} className="text-gold-500" />
              <span className="text-gold-500 uppercase tracking-[0.2em] text-[10px] font-bold">Aura Vision AI™ 2.0</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
              Descubra seu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-white">Potencial Capilar.</span>
            </h2>
            
            <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed mb-8 md:border-l md:border-gold-500/30 md:pl-6">
              Faça o upload de uma foto da sua área calva. Nossa IA analisará 12 pontos de densidade e gerará um pré-diagnóstico em segundos.
            </p>
            
            {/* Trust Badges - Mobile Optimized */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
               <div className="flex items-center gap-2 px-3 py-2 bg-navy-900 rounded-lg border border-white/5">
                 <Shield size={14} className="text-green-500" />
                 <span className="text-xs text-slate-300 font-medium">100% Seguro</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-2 bg-navy-900 rounded-lg border border-white/5">
                 <Lock size={14} className="text-gold-500" />
                 <span className="text-xs text-slate-300 font-medium">Anônimo</span>
               </div>
            </div>
          </div>

          {/* Interactive HUD Interface */}
          <div className="lg:col-span-7 w-full" id="hud-interface">
            <div className="relative rounded-3xl bg-navy-900 border border-white/10 p-1 md:p-2 shadow-2xl overflow-hidden ring-1 ring-white/5">
               
               <div className="relative z-10 bg-navy-950 rounded-2xl border border-white/5 p-4 md:p-8 min-h-[450px] flex flex-col">
                  {/* HUD Header */}
                  <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-gold-500 animate-pulse">
                      <Activity size={12} />
                      SYSTEM_ONLINE
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono hidden md:block">
                      SESSION_ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
                    </div>
                  </div>

                  {/* Main Display Area */}
                  <div className="flex-1 flex flex-col items-center justify-center relative">
                    {!selectedImage ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-64 md:h-80 border-2 border-dashed border-slate-700 hover:border-gold-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-navy-900/50 hover:bg-navy-900 transition-all group relative overflow-hidden active:scale-[0.98] duration-200"
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-navy-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5 group-hover:border-gold-500/50">
                          <Upload size={28} className="text-gold-500" />
                        </div>
                        <p className="text-white font-bold tracking-wide text-lg">Toque para Analisar</p>
                        <p className="text-slate-500 text-xs mt-2 font-mono bg-black/30 px-3 py-1 rounded-full">FOTO DO TOPO DA CABEÇA</p>
                      </div>
                    ) : (
                      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-black group border border-white/10 shadow-2xl">
                        <img src={selectedImage} alt="Analysis Target" className="w-full h-full object-cover opacity-80" />
                        
                        {/* Scanning UI Layer */}
                        {isAnalyzing && (
                          <>
                            <div className="absolute inset-0 bg-gold-900/20 z-10"></div>
                            <div className="absolute top-0 left-0 w-full h-2 bg-gold-400 shadow-[0_0_40px_#D4AF37] animate-[scan_1.5s_linear_infinite] z-20 opacity-80"></div>
                            
                            {/* Scanning Grid */}
                            <div className="absolute inset-0 z-10" style={{ backgroundImage: 'linear-gradient(rgba(219,182,43,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(219,182,43,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                            {/* Status Text - Dopamine Feed */}
                            <div className="absolute bottom-4 left-4 right-4 bg-navy-950/90 backdrop-blur border border-gold-500/30 p-3 rounded-lg z-30 shadow-lg">
                               <div className="flex items-center gap-3">
                                  <Loader2 className="animate-spin text-gold-500" size={18} />
                                  <span className="text-xs md:text-sm font-mono text-gold-100 font-bold uppercase">{steps[analysisStep]}</span>
                               </div>
                               <div className="w-full h-1 bg-navy-800 mt-2 rounded-full overflow-hidden">
                                  <div className="h-full bg-gold-500 transition-all duration-300" style={{ width: `${(analysisStep + 1) * 20}%` }}></div>
                               </div>
                            </div>
                          </>
                        )}

                        {!isAnalyzing && !result && (
                            <button 
                              onClick={() => { setSelectedImage(null); setResult(null); setError(null); }}
                              className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-red-500/80 transition-colors z-30 backdrop-blur-md"
                            >
                              <RefreshCw size={16} />
                            </button>
                        )}
                        
                        {/* Target Reticle */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold-500/80 rounded-tl-lg"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold-500/80 rounded-tr-lg"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold-500/80 rounded-bl-lg"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold-500/80 rounded-br-lg"></div>
                      </div>
                    )}
                  </div>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />

                  {/* Actions & Results */}
                  {selectedImage && !result && !error && (
                    <button 
                      onClick={startAnalysis}
                      disabled={isAnalyzing}
                      className="w-full mt-4 md:mt-6 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 py-4 md:py-5 rounded-xl font-bold tracking-[0.1em] hover:shadow-[0_0_30px_rgba(219,182,43,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 uppercase text-sm md:text-base active:scale-[0.98]"
                    >
                      {isAnalyzing ? 'Processando...' : <>INICIAR DIAGNÓSTICO <ChevronRight size={18} /></>}
                    </button>
                  )}

                  {/* Error Display */}
                  {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-[fadeIn_0.3s_ease-out]">
                       <div className="flex items-center gap-2 text-red-400 mb-2">
                         <AlertCircle size={18} />
                         <span className="font-bold text-sm uppercase tracking-wider">Erro na Leitura</span>
                       </div>
                       <p className="text-slate-300 text-sm mb-4">{error}</p>
                       <button 
                         onClick={startAnalysis}
                         className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs uppercase tracking-widest transition-colors rounded-lg flex items-center justify-center gap-2 font-bold border border-red-500/20"
                       >
                         <RefreshCw size={14} /> Tentar Novamente
                       </button>
                    </div>
                  )}

                  {/* Result Card - The Reward */}
                  {result && (
                    <div className="mt-6 animate-[scaleIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2 text-green-400">
                           <CheckCircle2 size={18} />
                           <span className="text-xs font-bold uppercase tracking-wider">Análise Concluída</span>
                         </div>
                         <span className="text-[10px] text-slate-500 font-mono">{new Date().toLocaleDateString()}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-navy-900 p-3 md:p-4 rounded-xl border border-gold-500/30 shadow-[0_0_15px_rgba(219,182,43,0.05)]">
                          <p className="text-[9px] md:text-[10px] text-gold-500 font-mono uppercase mb-1">Escala Norwood</p>
                          <p className="text-lg md:text-2xl text-white font-serif font-medium">{result.norwoodScale || "N/A"}</p>
                        </div>
                        <div className="bg-navy-900 p-3 md:p-4 rounded-xl border border-gold-500/30 shadow-[0_0_15px_rgba(219,182,43,0.05)]">
                          <p className="text-[9px] md:text-[10px] text-gold-500 font-mono uppercase mb-1">Grafts Estimados</p>
                          <p className="text-lg md:text-2xl text-white font-serif font-medium">{result.estimatedGrafts || "Consultar"}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-navy-800 to-navy-900 p-4 rounded-xl border-l-4 border-gold-500 mb-4 shadow-lg">
                        <p className="text-sm text-slate-200 italic leading-relaxed">"{result.reasoning || result.hairDensity}"</p>
                      </div>

                      <div className="bg-gold-500/10 p-4 rounded-xl flex items-center gap-3 mb-4 border border-gold-500/10">
                        <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-navy-950 shrink-0 font-bold">
                          <Scan size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gold-500 uppercase font-bold tracking-wider">Recomendação IA</p>
                          <p className="text-white text-sm md:text-base font-bold">{result.recommendation}</p>
                        </div>
                      </div>

                      <button className="w-full bg-gold-500 text-navy-950 py-4 rounded-lg text-xs uppercase tracking-widest hover:bg-white hover:scale-[1.02] transition-all font-bold shadow-xl animate-pulse-slow">
                        Solicitar Orçamento Oficial
                      </button>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
