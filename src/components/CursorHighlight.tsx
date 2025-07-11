"use client";

import React, { useState } from "react";

export const CursorHighlight = () => {
  const [position, setPosition] = useState({ x: -9999, y: -9999 }); // Start hidden

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
      onMouseMove={handleMouseMove}
    >
      <div
        className="w-[300px] h-[300px] rounded-full bg-gradient-to-br from-orange-400 to-teal-400 opacity-20 blur-3xl transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${position.x - 150}px, ${position.y - 150}px)`,
        }}
      />
    </div>
  );
};
