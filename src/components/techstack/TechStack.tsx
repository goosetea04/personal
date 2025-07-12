"use client";

import React, { useState } from "react";
import Image from "next/image";
import { techStacks } from "./TechStackList";
export default function TechStack() {
  const [selectedTech, setSelectedTech] = useState<null | typeof techStacks[0]>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section
      id="techstack"
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'transparent'
      }}
    >
      {/* Minimal geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-[#06302b]/20 rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-1 bg-[#06302b]/20 rotate-12"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 border border-[#06302b]/20 rotate-45"></div>
      </div>

      <div className="flex min-h-screen mx-12">
        {/* Left Side - Hero style title */}
        <div className="w-1/2 relative z-10 flex flex-col justify-center pl-12">
          <div className="space-y-2">
            <p className="text-[#095544] text-xl sm:text-2xl md:text-4xl font-bold font-nimbus">
              My
            </p>
            <h1
              className="text-[#06302b] text-6xl md:text-7xl lg:text-9xl font-bold uppercase tracking-wide"
              style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
            >
              Tech
            </h1>
            <h1
              className="text-[#06302b] text-6xl md:text-7xl lg:text-9xl font-bold uppercase tracking-wide pb-4"
              style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
            >
              Stack
            </h1>
            <p className="text-[#095544] text-xl sm:text-xl md:text-3xl font-medium font-nimbus leading-relaxed max-w-lg">
              Combat-tested technologies I wield to craft extraordinary digital experiences.
            </p>
          </div>
        </div>

        {/* Right Side - Tech cards */}
        <div className="w-1/2 relative z-10 flex flex-col justify-center items-end pr-12">
          <div className="flex flex-col gap-3 px-4 w-full">
            {techStacks.map((tech) => (
              <button
                key={tech.name}
                onClick={() => setSelectedTech(tech)}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`group relative flex items-center backdrop-blur-sm bg-gradient-to-r from-black/80 to-black/60 border-l-4 ${tech.borderColor} rounded-r-lg p-4 cursor-pointer transition-all duration-300 hover:from-black/90 hover:to-black/70 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#06302b]/50 transform hover:translate-x-2`}
                style={{
                  boxShadow: `
                    0 2px 10px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                {/* Left section with icon and name */}
                <div className="flex items-center flex-1 min-w-0">
                  {/* Character/Tech icon */}
                  <div className="relative w-12 h-12 mr-4 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      fill
                      className="object-contain rounded-full"
                      priority
                    />
                  </div>
                  
                  {/* Name and role */}
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-lg font-bold tracking-wide uppercase truncate"
                        style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                      {tech.name}
                    </div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">
                      {tech.name|| 'Technology'}
                    </div>
                  </div>
                </div>

                {/* Stats section */}
                <div className="flex items-center gap-6 text-white">
                  {/* Level/Experience */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{tech.level}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-xl">20</span>
                  </div>

                  {/* Rank badge */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#17876d] to-[#095544] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">★</span>
                      </div>
                      <span className="text-sm text-gray-300">RANK</span>
                    </div>
                    <div className="bg-gradient-to-r from-[#2fa98c] to-[#aacbc4] text-black px-3 py-1 rounded font-bold text-lg">
                      {tech.proficiency}
                    </div>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="absolute bottom-1 left-16 right-4 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-700 delay-${i * 100}`}
                        style={{
                          width: hoveredTech === tech.name ? '100%' : `${85 + i * 5}%`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#06302b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-lg"></div>

                {/* Side accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Minimal Atlus-style modal */}
      {selectedTech && (
        <div
          className="fixed inset-0 bg-[#06302b]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTech(null)}
        >
          <div
            className="relative bg-white/95 backdrop-blur-xl max-h-4/5 overflow-scroll rounded-lg p-8 max-w-2xl w-full border-2 border-[#06302b]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `
                inset 0 0 0 1px rgba(6, 48, 43, 0.1),
                0 0 40px rgba(6, 48, 43, 0.3)
              `
            }}
          >
            {/* Modal corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#06302b]/60"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#06302b]/60"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#06302b]/60"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#06302b]/60"></div>

            {/* Close button */}
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#06302b] hover:text-[#095544] text-2xl font-bold transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Header */}
            <div className="text-center mb-8 border-b-2 border-[#06302b]/20 pb-6">
              <div className="relative inline-block">
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#06302b] rotate-45"></div>
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src={selectedTech.logo}
                    alt={selectedTech.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <h3 className="text-4xl font-black text-[#06302b] mb-2 tracking-wide uppercase"
                  style={{ 
                    fontFamily: "var(--font-nimbus-sans), sans-serif"
                  }}>
                {selectedTech.name}
              </h3>
              <p className="text-[#095544] text-lg font-bold tracking-wide uppercase">
                Arsenal Breakdown
              </p>
            </div>

            {/* Libraries */}
            <div className="space-y-4">
              {selectedTech.libraries.map((lib, index) => (
                <div
                  key={lib.name}
                  className="flex items-center gap-4 p-4 bg-[#06302b]/5 border border-[#06302b]/10 rounded-lg hover:bg-[#06302b]/10 transition-all duration-200"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'slideInLeft 0.6s ease-out forwards'
                  }}
                >
                  {lib.logo && (
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={lib.logo}
                        alt={lib.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-[#06302b] uppercase tracking-wide"
                        style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                      {lib.name}
                    </h4>
                    <p className="text-sm text-[#095544]">{lib.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-[#06302b] rounded-full"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stats */}
            <div className="mt-8 pt-6 border-t-2 border-[#06302b]/20 flex justify-between items-center">
              <div className="text-center">
                <p className="text-xs text-[#095544] uppercase tracking-wide">Mastery</p>
                <p className="text-2xl font-black text-[#06302b]"
                   style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  S-RANK
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#095544] uppercase tracking-wide">Experience</p>
                <p className="text-2xl font-black text-[#06302b]"
                   style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  MAX
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#095544] uppercase tracking-wide">Status</p>
                <p className="text-2xl font-black text-[#2cc295]"
                   style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  ACTIVE
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}