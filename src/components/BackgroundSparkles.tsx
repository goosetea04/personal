"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const BackgroundSparkles = () => {
  // 1. Initialize with empty array so server renders nothing (or consistent empty state)
  const [sparkles, setSparkles] = useState<any[]>([]);

  // 2. Generate random values ONLY after component mounts on client
  useEffect(() => {
    const generatedSparkles = Array.from({ length: 20 }).map((_, i) => ({
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