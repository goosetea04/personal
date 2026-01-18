"use client"
import React, { useState } from 'react';
import { MENU_ITEMS } from '@/constants/menuItems';
import { Sparkles } from 'lucide-react';

interface HomeSectionProps {
    onNavigate: (section: string) => void;
}

export const HomeSection = ({ onNavigate }: HomeSectionProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center">

            {/* MOBILE ONLY TITLE */}
             <div className="md:hidden absolute top-25 left-0 w-full text-center pointer-events-none opacity-50">
                 <h1 className="text-6xl font-black italic text-white opacity-20">GUSTI RAIS</h1>
             </div>
            
            {/* LEFT: Menu Items */}
            <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start md:pl-24 space-y-4 md:space-y-2">
                {/* Background Glow */}
                <div className="absolute md:left-[-150px] top-1/2 transform -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#39ff14] rounded-full blur-[80px] md:blur-[100px] pointer-events-none opacity-20" />

                <div className="flex flex-col space-y-3 md:space-y-2 transform -rotate-3 md:-rotate-6 origin-center">
                  {MENU_ITEMS.map((item, idx) => (
                    <button
                      key={item.id}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onNavigate(item.id)}
                      style={{
                          animation: 'slide-up-stagger 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                          animationDelay: `${idx * 0.1}s`,
                          opacity: 0
                      }}
                      className={`relative group flex items-center transition-all duration-300 ease-out ${item.offset} ${hoveredIndex === idx ? 'translate-x-4 md:translate-x-12 scale-105 md:scale-110 z-20' : 'z-10'}`}
                    >
                      {/* Black Bar */}
                      <div className={`px-6 py-2 md:px-8 md:py-2 transform -skew-x-12 border-2 md:border-4 transition-all duration-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] group-hover:shadow-[6px_6px_0px_0px_rgba(3,18,11,1)] md:group-hover:shadow-[8px_8px_0px_0px_rgba(3,18,11,1)]`}
                        style={{
                            backgroundColor: hoveredIndex === idx ? '#39ff14' : '#03120b',
                            color: hoveredIndex === idx ? '#03120b' : '#e0ffe8',
                            borderColor: hoveredIndex === idx ? '#03120b' : 'transparent'
                        }}
                      >
                        <div className="flex items-center gap-4 transform skew-x-12">
                            <span className="font-black text-2xl md:text-5xl tracking-tighter italic block">{item.label}</span>
                        </div>
                      </div>
                      
                      {/* Hover Star */}
                      <div className={`hidden md:block ml-4 transition-all duration-300 ${hoveredIndex === idx ? 'opacity-100 rotate-180 scale-125' : 'opacity-0 scale-0'}`}>
                        <Sparkles className="w-10 h-10 text-[#39ff14] fill-[#39ff14]" />
                      </div>
                    </button>
                  ))}
                </div>
            </div>

            {/* RIGHT: Static Character Portrait (Desktop Only) */}
            <div className="hidden md:flex relative w-1/2 h-full flex-col justify-center items-center pointer-events-none animate-mask-wipe">
                <div className="relative w-[450px] h-[700px] bg-[#03120b] border-[#39ff14] border-r-8 transform -skew-x-6 shadow-2xl overflow-hidden flex items-end justify-center">
                    <span className="text-white opacity-10 font-black text-8xl absolute top-20 -rotate-90 z-0">dEV</span>
                </div>
                <div className="absolute bottom-32 right-20 transform -rotate-6 z-30">
                    <h1 
                      className="glitch-text text-9xl font-black tracking-tighter drop-shadow-[6px_6px_0_rgba(0,0,0,1)] italic text-white" 
                      data-text="GUSTI RAIS"
                      style={{ WebkitTextStroke: `3px #03120b` }}
                    >
                      GUSTI RAIS
                    </h1>
                </div>
            </div>
        </div>
    );
}