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

      <div className="flex min-h-screen px-6 sm:px-12 flex-col lg:flex-row">
        {/* Left Side - Hero style title */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center lg:pl-12 py-12 lg:py-0">
          <div className="space-y-2 text-center lg:text-left">
            <p className="text-[#095544] text-lg sm:text-xl lg:text-2xl xl:text-4xl font-bold font-nimbus">
              My
            </p>
            <h1
              className="text-[#06302b] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold uppercase tracking-wide"
              style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
            >
              Tech
            </h1>
            <h1
              className="text-[#06302b] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold uppercase tracking-wide pb-4"
              style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
            >
              Stack
            </h1>
            <p className="text-[#095544] text-base sm:text-lg lg:text-xl xl:text-3xl font-medium font-nimbus leading-relaxed max-w-lg mx-auto lg:mx-0">
              Combat-tested technologies I wield to craft extraordinary digital experiences.
            </p>
          </div>
        </div>

        {/* Right Side - Tech cards */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center items-center lg:items-end lg:pr-12 py-12 lg:py-0">
          <div className="flex flex-col gap-3 px-4 w-full max-w-md lg:max-w-none">
            {techStacks.map((tech) => (
              <button
                key={tech.name}
                onClick={() => setSelectedTech(tech)}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`group relative flex items-center backdrop-blur-sm bg-gradient-to-r from-black/80 to-black/60 border-l-4 ${tech.borderColor} rounded-r-lg p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:from-black/90 hover:to-black/70 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#06302b]/50 transform hover:translate-x-2`}
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
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mr-3 sm:mr-4 transition-transform duration-300 group-hover:scale-110">
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
                    <div className="text-white text-sm sm:text-base lg:text-lg font-bold tracking-wide uppercase truncate"
                        style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                      {tech.name}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">
                      {tech.name || 'Technology'}
                    </div>
                  </div>
                </div>

                {/* Stats section */}
                <div className="hidden sm:flex items-center gap-3 lg:gap-6 text-white">
                  {/* Level/Experience */}
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-lg lg:text-2xl font-bold">{tech.level}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-base lg:text-xl">20</span>
                  </div>

                  {/* Rank badge */}
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-br from-[#17876d] to-[#095544] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">★</span>
                      </div>
                      <span className="text-xs lg:text-sm text-gray-300">RANK</span>
                    </div>
                    <div className="bg-gradient-to-r from-[#2fa98c] to-[#aacbc4] text-black px-2 py-1 lg:px-3 lg:py-1 rounded font-bold text-sm lg:text-lg">
                      {tech.proficiency}
                    </div>
                  </div>
                </div>

                {/* Mobile stats - visible only on small screens */}
                <div className="sm:hidden flex flex-col items-end text-white">
                  <div className="text-sm font-bold">{tech.level}/20</div>
                  <div className="bg-gradient-to-r from-[#2fa98c] to-[#aacbc4] text-black px-2 py-0.5 rounded font-bold text-xs">
                    {tech.proficiency}
                  </div>
                </div>

                {/* Progress bars */}
                <div className="absolute bottom-1 left-12 sm:left-16 right-4 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex-1 h-0.5 sm:h-1 bg-gray-700 rounded-full overflow-hidden">
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
            className="relative bg-white/95 backdrop-blur-xl max-h-[90vh] sm:max-h-4/5 overflow-y-auto rounded-lg p-4 sm:p-6 lg:p-8 w-full max-w-xs sm:max-w-lg lg:max-w-2xl border-2 border-[#06302b]/30 shadow-2xl"
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
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-[#06302b] hover:text-[#095544] text-xl sm:text-2xl font-bold transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Header */}
            <div className="text-center mb-4 sm:mb-6 lg:mb-8 border-b-2 border-[#06302b]/20 pb-4 sm:pb-6">
              <div className="relative inline-block">
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#06302b] rotate-45"></div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-4">
                  <Image
                    src={selectedTech.logo}
                    alt={selectedTech.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#06302b] mb-1 sm:mb-2 tracking-wide uppercase"
                  style={{ 
                    fontFamily: "var(--font-nimbus-sans), sans-serif"
                  }}>
                {selectedTech.name}
              </h3>
              <p className="text-[#095544] text-sm sm:text-base lg:text-lg font-bold tracking-wide uppercase">
                Arsenal Breakdown
              </p>
            </div>

            {/* Libraries */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {selectedTech.libraries.map((lib, index) => (
                <div
                  key={lib.name}
                  className="flex items-center gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 bg-[#06302b]/5 border border-[#06302b]/10 rounded-lg hover:bg-[#06302b]/10 transition-all duration-200"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'slideInLeft 0.6s ease-out forwards'
                  }}
                >
                  {lib.logo && (
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex-shrink-0">
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
                    <h4 className="text-sm sm:text-base lg:text-lg font-black text-[#06302b] uppercase tracking-wide"
                        style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                      {lib.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#095544]">{lib.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#06302b] rounded-full"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stats */}
            <div className="mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 border-t-2 border-[#06302b]/20 flex justify-between items-center">
              <div className="text-center">
                <p className="text-xs text-[#095544] uppercase tracking-wide">Mastery</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-black text-[#06302b]"
                   style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  S-RANK
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#095544] uppercase tracking-wide">Experience</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-black text-[#06302b]"
                   style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}>
                  MAX
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#095544] uppercase tracking-wide">Status</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-black text-[#2cc295]"
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