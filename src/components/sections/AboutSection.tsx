import React from 'react';
import { User } from 'lucide-react';

export const AboutSection = () => (
  <div className="w-full h-full overflow-y-auto overflow-x-hidden flex items-start md:items-center justify-center p-4 md:p-10 pt-20 md:pt-10">
    <div className="relative w-full max-w-5xl flex flex-col md:flex-row gap-8 mb-20 md:mb-0">     
      {/* Image Box */}
      <div className="w-full md:w-1/3 animate-mask-wipe flex justify-center" style={{ animationDelay: '0.1s', opacity: 0 }}>
        <div className="w-64 h-64 md:w-full md:h-80 bg-black border-4 border-[#39ff14] p-2 transform -rotate-2 shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
          <div className="w-full h-full bg-[#0a2e1f] flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-[#39ff14] opacity-0 group-hover:opacity-20 transition-opacity duration-100 z-10 mix-blend-overlay"></div>
             <User className="w-24 h-24 md:w-32 md:h-32 text-[#39ff14] opacity-80 group-hover:scale-110 transition-transform duration-300" />
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
              A digital architect forging chaos into logic. Specialized in <span className="bg-[#39ff14] text-black px-1 font-bold">React Ecosystems</span> and high-performance UI.
            </p>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-8 transform -rotate-1">
           {['CODE', 'DESIGN', 'SPEED'].map((stat, i) => (
             <div
               key={stat}
               className="bg-black text-[#39ff14] border border-[#39ff14] p-2 text-center font-bold hover-glitch cursor-default text-xs md:text-base"
               style={{ animation: `kinetic-slam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`, animationDelay: `${0.7 + (i * 0.1)}s`, opacity: 0 }}
             >
               {stat} <span className="block text-white text-[10px] md:text-xs">LV. MAX</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);