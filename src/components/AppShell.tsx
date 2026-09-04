"use client"
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { styles } from '@/constants/styles';
import { BackgroundSparkles } from '@/components/BackgroundSparkles';
import { PersonaDateIntro } from '@/components/PersonaDateIntro';
import { PersonaDateHUD } from '@/components/PersonaDateHUD';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans selection:bg-[#39ff14] selection:text-black bg-[#0a2e1f] text-[#e0ffe8]">
      {/* 1. Styles */}
      <style>{styles}</style>

      {/* Persona date intro overlay — sits above content (z-100) and covers it during the sweep */}
      {!introComplete && (
        <PersonaDateIntro
          onComplete={() => setIntroComplete(true)}
        />
      )}

      {/* Persistent date HUD — top right corner */}
      {introComplete && <PersonaDateHUD />}

      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, #03120b 1px, transparent 1px)`, backgroundSize: '8px 8px' }}
      />

      <BackgroundSparkles />

      {/* Animated Spike Background — home only */}
      <div className={`hidden md:block absolute top-[-10%] right-[-10%] w-3/4 h-[120%] bg-[#03120b] border-l-4 border-[#39ff14] transform transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) z-0
        ${isHome ? '-skew-x-12 translate-x-32' : 'skew-x-0 translate-x-full opacity-0'}`}
      />

      {/* 3. CONTENT AREA (Z-Index 10) — always rendered so SSR HTML/crawlers see real content;
          the intro overlay (z-100) visually covers it until the sweep reveals it. */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
