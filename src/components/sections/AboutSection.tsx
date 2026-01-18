import React from 'react';
import { Code2, Database, Network } from 'lucide-react';

export const AboutSection = () => (
  <div className="w-full h-full overflow-y-auto overflow-x-hidden flex items-start justify-center p-4 md:p-10 pt-20 md:pt-10">
    <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-start gap-8 mb-20 md:mb-0">     
      
      {/* Image Box - Sticky in Center */}
      <div 
        className="w-full md:w-1/3 animate-mask-wipe flex justify-center md:sticky md:top-1/2 md:-translate-y-1/2 z-20" 
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <div className="w-64 h-64 md:w-full md:h-80 bg-black border-4 border-[#39ff14] p-2 transform -rotate-2 shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
          <div className="w-full h-full bg-[#0a2e1f] flex items-center justify-center overflow-hidden relative group">
             {/* Green Overlay Layer */}
             <div className="absolute inset-0 bg-[#39ff14] opacity-20 group-hover:opacity-0 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
             
             {/* Profile Image */}
             <img 
               src="/image.png"
               alt="Gusti"
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
             />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full md:w-2/3 flex flex-col justify-center">
        <h2 className="text-5xl md:text-8xl font-black text-white italic transform -skew-x-12 mb-6 drop-shadow-[4px_4px_0_#000] animate-slam text-center md:text-left" style={{ animationDelay: '0.3s', opacity: 0 }}>
          WHO IS <span className="text-[#39ff14] block md:inline">GUSTI?</span>
        </h2>

        <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 border-l-4 md:border-l-8 border-[#39ff14] transform skew-x-6 origin-left animate-mask-wipe" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <div className="transform -skew-x-6 text-base md:text-xl font-medium text-[#e0ffe8] space-y-4">
            <p>
              I am a Software Engineer and Data Scientist specializing in the intersection of high-performance systems and predictive modeling. Currently completing a dual-degree at the Australian National University and Universitas Indonesia, my work focuses on bridging technical complexity with strategic decision-making.
            </p>
            <p>
              From architecting microservices-based backends in Python to deploying ML-driven operator scheduling systems, I build scalable infrastructure that transforms raw data into operational excellence.
            </p>
          </div>
        </div>

        {/* Professional Specializations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-12 transform -rotate-1">
          {[
            { label: 'DATA SCIENCE', icon: <Database size={24} />, tools: 'R, Power BI, PyTorch, scikit-learn' },
            { label: 'FULL-STACK', icon: <Code2 size={24} />, tools: 'FastAPI, Next.js, TS' },
            { label: 'SYSTEMS', icon: <Network size={24} />, tools: 'C++, Rust, Go' }
          ].map((spec, i) => (
            <div
              key={spec.label}
              className="bg-black text-[#39ff14] border-2 border-[#39ff14] p-6 md:p-8 text-center font-bold hover:bg-[#39ff14] hover:text-black transition-all duration-200 cursor-default flex flex-col items-center justify-center gap-3 shadow-[5px_5px_0px_0px_rgba(57,255,20,0.3)]"
              style={{ 
                animation: 'kinetic-slam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', 
                animationDelay: `${0.7 + (i * 0.1)}s`, 
                opacity: 0 
              }}
            >
              <div className="flex items-center gap-3">
                {spec.icon}
                <span className="text-lg md:text-xl tracking-tighter">{spec.label}</span>
              </div>
              <span className="block text-white text-xs md:text-sm uppercase font-mono font-medium opacity-80">
                {spec.tools}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);