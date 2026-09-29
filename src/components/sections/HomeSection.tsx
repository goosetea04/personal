"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { MENU_ITEMS } from '@/constants/menuItems';
import { Sparkles } from 'lucide-react';

export const HomeSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center overflow-hidden">

            {/* ── MOBILE ONLY: diagonal slash behind the menu (static, no animation cost) ── */}
            <div
              className="md:hidden absolute left-[-10%] right-[-10%] top-[38%] h-[46%] bg-[#03120b] border-y-4 border-[#39ff14] -skew-y-6 pointer-events-none"
              aria-hidden="true"
            />

            {/* ── MOBILE ONLY: hero name ── */}
            <div className="md:hidden relative z-10 w-full flex flex-col items-center pt-24 px-4">
                {/* Only one of this and the desktop h1 is ever displayed */}
                <h1
                  className="glitch-text text-[3.4rem] leading-none font-black italic text-white tracking-tighter animate-slam [text-shadow:4px_4px_0_#03120b]"
                  data-text="GUSTI RAIS"
                  style={{ opacity: 0 }}
                >
                  GUSTI RAIS
                </h1>
            </div>

            {/* LEFT: Menu Items */}
            <div className="relative w-full md:w-1/2 flex-1 md:flex-none md:h-full flex flex-col justify-center items-center md:items-start md:pl-24 space-y-4 md:space-y-2">
                {/* Background Glow */}
                <div
                  className="absolute md:left-[-150px] top-1/2 transform -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.35) 0%, rgba(57,255,20,0.12) 40%, rgba(57,255,20,0) 70%)' }}
                />

                <div className="flex flex-col space-y-3 md:space-y-2 transform -rotate-3 md:-rotate-6 origin-center">
                  {MENU_ITEMS.map((item, idx) => {
                    const isHovered = hoveredIndex === idx;
                    return (
                    <Link
                      key={item.id}
                      href={`/${item.id.toLowerCase()}`}
                      // Mouse only, so a tap on a phone doesn't leave a "stuck" hover state
                      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHoveredIndex(idx); }}
                      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHoveredIndex(null); }}
                      style={{
                          animation: 'slide-up-stagger 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                          animationDelay: `${0.15 + idx * 0.08}s`,
                          opacity: 0
                      }}
                      className={`relative group flex items-center transition-transform duration-300 ease-out ${item.offset} ${isHovered ? 'translate-x-3 md:translate-x-8 scale-105 z-20' : 'z-10 active:scale-95 active:translate-x-2'}`}
                    >
                      {/* Black Bar — turns green on hover (desktop) or while pressed (touch) */}
                      <div className={`px-6 py-2 md:px-8 md:py-2 transform -skew-x-12 border-2 md:border-4 transition-colors duration-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] group-hover:shadow-[6px_6px_0px_0px_rgba(3,18,11,1)] md:group-hover:shadow-[8px_8px_0px_0px_rgba(3,18,11,1)] group-active:bg-[#39ff14] group-active:text-[#03120b] group-active:border-[#03120b]
                        ${isHovered ? 'bg-[#39ff14] text-[#03120b] border-[#03120b]' : 'bg-[#03120b] text-[#e0ffe8] border-[#39ff14]/35 md:border-transparent'}`}
                      >
                        <div className="flex items-center gap-3 md:gap-4 transform skew-x-12">
                            {/* Persona-style menu index, mobile only */}
                            <span className="md:hidden font-mono font-bold text-xs text-[#39ff14] group-active:text-[#03120b]">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="font-black text-2xl md:text-5xl tracking-tighter italic block">{item.label}</span>
                        </div>
                      </div>

                      {/* Hover Star */}
                      <div className={`hidden md:block ml-4 transition-[transform,opacity] duration-300 ${isHovered ? 'opacity-100 rotate-180 scale-125' : 'opacity-0 scale-0'}`}>
                        <Sparkles className="w-10 h-10 text-[#39ff14] fill-[#39ff14]" />
                      </div>
                    </Link>
                    );
                  })}
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
