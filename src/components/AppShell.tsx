"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LazyMotion, domAnimation } from 'framer-motion';
import { BackgroundSparkles } from '@/components/BackgroundSparkles';
import { PersonaDateIntro } from '@/components/PersonaDateIntro';
import { PersonaDateHUD } from '@/components/PersonaDateHUD';

// Also read by the inline script in app/layout.tsx
const INTRO_SEEN_KEY = 'intro-seen';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  // The intro only plays when the visit starts on the home page — deep links
  // (e.g. a blog post from search) go straight to content. Evaluated once, so
  // navigating to "/" later doesn't replay it.
  const [introComplete, setIntroComplete] = useState(() => pathname !== '/');
  // Marked seen only once it has actually played — marking on mount would let
  // Strict Mode's double effect run read its own write and skip the intro.
  const completeIntro = useCallback(() => {
    try { sessionStorage.setItem(INTRO_SEEN_KEY, '1'); } catch {}
    setIntroComplete(true);
  }, []);

  // Once per session, and never for reduced-motion users. CSS already hides
  // the overlay in both cases before hydration; this just unmounts it.
  useEffect(() => {
    if (introComplete) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroComplete(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="relative w-full h-screen overflow-hidden font-sans selection:bg-[#39ff14] selection:text-black bg-[#0a2e1f] text-[#e0ffe8]">
        {/* Persona date intro overlay — sits above content (z-100) and covers it during the sweep */}
        {!introComplete && <PersonaDateIntro onComplete={completeIntro} />}

        {/* Persistent date HUD — top right corner */}
        {introComplete && <PersonaDateHUD />}

        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, #03120b 1px, transparent 1px)`, backgroundSize: '8px 8px' }}
        />

        <BackgroundSparkles />

        {/* Animated Spike Background — home only */}
        <div className={`hidden md:block absolute top-[-10%] right-[-10%] w-3/4 h-[120%] bg-[#03120b] border-l-4 border-[#39ff14] transform transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] z-0
          ${isHome ? '-skew-x-12 translate-x-32' : 'skew-x-0 translate-x-full opacity-0'}`}
        />

        {/* CONTENT AREA (Z-Index 10) — always rendered so SSR HTML/crawlers see real content;
            the intro overlay (z-100) visually covers it until the sweep reveals it. */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </LazyMotion>
  );
}
