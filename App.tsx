
import React, { useState } from 'react';
import ThreeScene from './components/ThreeScene';
import Header from './components/Header';
import { generateSiteTheme } from './services/geminiService';
import { SiteTheme } from './types';
import { Sparkles, ArrowRight, Zap, Globe, Shield, RefreshCcw, Cpu, Github, Layout } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<SiteTheme>({
    headline: "Architecting Digital Infinity",
    subheadline: "Transforming abstract vision into immersive volumetric realities through the power of Gemini AI.",
    primaryColor: "#00f2ff",
    secondaryColor: "#7000ff",
    vibe: "Quantum"
  });
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransform = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const newTheme = await generateSiteTheme(prompt);
      setTheme(newTheme);
      setPrompt("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-white/30 overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background 3D Engine */}
        <ThreeScene primaryColor={theme.primaryColor} secondaryColor={theme.secondaryColor} />
        
        {/* Content Overlay */}
        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-10 mt-10 pointer-events-none">
          <div 
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-3xl animate-fade-in shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            style={{ color: theme.primaryColor, borderColor: theme.primaryColor + '44' }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.primaryColor }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">{theme.vibe} DIMENSION ACTIVE</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] transition-all duration-700 animate-slide-up">
            {theme.headline.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4 last:mr-0">
                {i % 2 === 1 ? (
                  <span 
                    style={{ 
                      color: 'transparent',
                      WebkitTextStroke: `1px ${theme.primaryColor}`,
                      textShadow: `0 0 40px ${theme.primaryColor}44`
                    }}
                  >
                    {word}
                  </span>
                ) : word}
              </span>
            ))}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-delayed">
            {theme.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 pointer-events-auto">
            <button 
              className="group relative px-10 py-5 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
            >
              <div className="relative z-10 flex items-center gap-3">
                ENTER VOID <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
            
            <button className="px-10 py-5 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all hover:border-white/30">
              EXPLORE STACK
            </button>
          </div>
        </div>

        {/* AI Transformation Input */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-4 animate-slide-up-delayed">
          <form 
            onSubmit={handleTransform}
            className="group flex items-center p-3 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/10 hover:border-white/20 transition-all shadow-[0_30px_100px_rgba(0,0,0,1)]"
          >
            <div className="pl-4">
              <Zap className="w-5 h-5 text-gray-500" style={{ color: loading ? theme.primaryColor : undefined }} />
            </div>
            <input 
              type="text" 
              placeholder="Reconfigure landscape (e.g. 'Cyberpunk Rain', 'Golden Nebula')..." 
              className="flex-1 bg-transparent px-4 py-3 text-base outline-none placeholder:text-gray-600"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading || !prompt}
              className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : 'GENERATE'}
            </button>
          </form>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-40 px-6 max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Core Infrastructure</h2>
          <div className="h-1 w-20 mx-auto rounded-full" style={{ backgroundColor: theme.primaryColor }} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Neural Rendering", desc: "Native WebGL 2.0 pipeline optimized for real-time generative geometry and complex shaders.", color: theme.primaryColor },
            { icon: Globe, title: "Infinite Context", desc: "Powered by Gemini 3.0, mapping human linguistic nuance to deterministic 3D state vectors.", color: theme.secondaryColor },
            { icon: Shield, title: "Volumetric Safety", desc: "Multi-layered boundary protocols ensuring high-fidelity visual consistency across all generated themes.", color: theme.primaryColor }
          ].map((f, i) => (
            <div key={i} className="group relative space-y-6 p-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${f.color}, transparent)` }}
              />
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8 bg-black/40 border border-white/10 group-hover:scale-110 transition-transform">
                <f.icon className="w-8 h-8" style={{ color: f.color }} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">{f.title}</h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Volumetric Showcase Section */}
      <section className="relative py-40 overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              Beyond the <br/>
              <span style={{ color: theme.primaryColor }}>Flat Surface.</span>
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Most digital experiences are constrained by 2D grids. We break the fourth wall, utilizing ray-marching and instanced mesh technology to deliver depth that responds to your intent.
            </p>
            <div className="flex gap-4">
              <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-mono" style={{ color: theme.primaryColor }}>
                $ npm install @lumina/void
              </div>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 overflow-hidden group">
             {/* This acts as a visual placeholder for another potential 3D element or a static preview */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full blur-[100px] animate-pulse" style={{ backgroundColor: theme.primaryColor + '44' }} />
                <div className="relative z-10 text-center">
                   <div className="text-8xl font-black opacity-20 group-hover:opacity-40 transition-opacity">VOID</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-48 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30 blur-[150px] pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${theme.primaryColor}, ${theme.secondaryColor}, transparent 70%)` 
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-12">Claim Your Seat in the Infinite.</h2>
          <button 
            className="px-16 py-7 rounded-full font-black text-xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-4 border-white"
            style={{ backgroundColor: theme.primaryColor, color: 'black' }}
          >
            GET EARLY ACCESS
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-white/10 to-transparent">
               <Cpu className="w-8 h-8" style={{ color: theme.primaryColor }} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">Lumina.Void</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Lab</a>
            <a href="#" className="hover:text-white transition-colors">Manifesto</a>
            <a href="#" className="hover:text-white transition-colors">Pulse</a>
            <a href="#" className="hover:text-white transition-colors">Terminal</a>
          </div>

          <div className="flex gap-6">
            <div className="p-4 border border-white/10 rounded-2xl hover:bg-white hover:text-black cursor-pointer transition-all">
              <Github className="w-6 h-6" />
            </div>
            <div className="p-4 border border-white/10 rounded-2xl hover:bg-white hover:text-black cursor-pointer transition-all">
              <Layout className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="text-center mt-20 opacity-20 text-[10px] uppercase tracking-[0.5em] font-bold">
          Synthesized by Lumina Generative Technologies • V.3.0.0-PROXIMA
        </div>
      </footer>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(100px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-delayed {
          animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slide-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up-delayed {
          animation: slide-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default App;
