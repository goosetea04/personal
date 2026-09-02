"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const BackgroundSparkles = () => {
  // 1. Initialize with empty array so server renders nothing (or consistent empty state)
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  interface Sparkle {
    id: number;
    left: number;
    top: number;
    delay: number;
    scale: number;
    duration: number;
  }

  // 2. Generate random values ONLY after component mounts on client
  useEffect(() => {
    // This animation runs indefinitely for as long as the app is mounted,
    // so skip it entirely for anyone who's asked the OS for reduced motion
    // (also the usual signal on battery-saver / low-power setups).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const generatedSparkles = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      scale: 0.5 + Math.random(),
      duration: 3 + Math.random() * 4
    }));

    setSparkles(generatedSparkles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute text-[#39ff14]/40"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animation: `float-twinkle ${s.duration}s infinite ease-in-out`,
            animationDelay: `${s.delay}s`
          }}
        >
          {/* Using the Lucide Sparkle icon, but varying rotation */}
          <Sparkles 
            size={s.scale * 24} 
            style={{ transform: `rotate(${s.id * 45}deg)` }}
          />
        </div>
      ))}
    </div>
  );
};