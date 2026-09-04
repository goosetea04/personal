"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SKILLS = [
  { label: 'R', category: 'DATA SCIENCE', description: 'Statistical modeling and exploratory analysis when the question matters more than the framework.' },
  { label: 'POWER BI', category: 'DATA SCIENCE', description: 'Turning pipelines and warehouses into dashboards stakeholders can read without a walkthrough.' },
  { label: 'PYTORCH', category: 'DATA SCIENCE', description: 'Building and training models when off-the-shelf isn\'t precise enough.' },
  { label: 'SCIKIT-LEARN', category: 'DATA SCIENCE', description: 'Fast, reliable classical ML for problems that don\'t need a neural net.' },
  { label: 'FASTAPI', category: 'FULL-STACK', description: 'Backend APIs that are fast to build and even faster to run.' },
  { label: 'NEXT.JS', category: 'FULL-STACK', description: 'Full-stack React apps, from routing to rendering to deployment.' },
  { label: 'TYPESCRIPT', category: 'FULL-STACK', description: 'Catching the bugs before the runtime does.' },
  { label: 'C++', category: 'SYSTEMS', description: 'Performance-critical code where every cycle counts.' },
  { label: 'RUST', category: 'SYSTEMS', description: 'Memory safety without giving up systems-level control.' },
  { label: 'GO', category: 'SYSTEMS', description: 'Simple, concurrent services that scale without ceremony.' },
];

const CATEGORIES = Array.from(new Set(SKILLS.map((s) => s.category)));

const SkillSelect = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [skillIndex, setSkillIndex] = useState(0);

  const categorySkills = category ? SKILLS.filter((s) => s.category === category) : [];
  const skill = categorySkills[skillIndex];

  const openCategory = (cat: string) => {
    setCategory(cat);
    setSkillIndex(0);
  };

  return (
    <div className="mt-12">
      {/* Header / breadcrumb */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[#39ff14] font-mono text-xs md:text-sm tracking-[0.3em] font-bold flex items-center gap-2">
          ◆ SKILL SELECT
          {category && (
            <>
              <span className="opacity-50">▸</span>
              <span>{category}</span>
            </>
          )}
        </span>
        <div className="flex-1 h-px bg-[#39ff14]/40" />
        {category && (
          <button
            onClick={() => setCategory(null)}
            className="font-mono text-[10px] md:text-xs font-bold tracking-widest text-black bg-[#39ff14] px-3 py-1 -skew-x-6 hover:bg-white transition-colors"
          >
            <span className="inline-block skew-x-6">◂ BACK</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!category ? (
          /* Layer 1: categories */
          <motion.div
            key="categories"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex flex-col gap-2"
          >
            {CATEGORIES.map((cat, i) => {
              const count = SKILLS.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => openCategory(cat)}
                  className="flex items-center justify-between gap-3 pl-6 pr-4 py-4 border-2 -skew-x-6 text-left bg-black border-[#39ff14]/40 text-[#e0ffe8] hover:border-[#39ff14] hover:bg-[#39ff14] hover:text-black transition-colors duration-150"
                >
                  <div className="skew-x-6 flex items-center gap-3">
                    <span className="font-mono text-xs font-bold opacity-60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-black text-base md:text-lg tracking-tighter">{cat}</span>
                  </div>
                  <div className="skew-x-6 flex items-center gap-2 font-mono text-[10px] md:text-xs font-bold opacity-70">
                    <span>{count} SKILLS</span>
                    <span>▸</span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        ) : (
          /* Layer 2: skills within category */
          <motion.div
            key="skills"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 md:gap-6"
          >
            {/* List */}
            <div className="flex flex-col gap-2">
              {categorySkills.map((s, i) => {
                const isActive = i === skillIndex;
                return (
                  <button
                    key={s.label}
                    onClick={() => setSkillIndex(i)}
                    className={`relative flex items-center gap-3 pl-6 pr-4 py-3 border-2 -skew-x-6 text-left transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#39ff14] border-[#39ff14] text-black'
                        : 'bg-black border-[#39ff14]/40 text-[#e0ffe8] hover:border-[#39ff14]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="skill-cursor"
                        className="absolute -left-1 w-2 h-2 rotate-45 bg-[#39ff14] shadow-[0_0_6px_#39ff14]"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <div className="skew-x-6 flex items-center gap-3">
                      <span className="font-mono text-xs font-bold opacity-60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-black text-base md:text-lg tracking-tighter">{s.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div className="relative bg-[#0a2e1f]/80 border-2 border-[#39ff14] p-6 md:p-8 overflow-hidden min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <h3 className="font-black text-2xl md:text-3xl tracking-tighter text-[#39ff14] mb-2">
                    {skill.label}
                  </h3>

                  <span className="inline-block border border-[#39ff14]/60 text-[#39ff14] font-mono text-[10px] md:text-xs uppercase px-2 py-1 mb-4">
                    {skill.category}
                  </span>

                  <p className="text-[#e0ffe8] text-sm md:text-base font-medium">
                    {skill.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AboutSection = () => (
  <div className="relative w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start p-4 md:p-10 pt-20 md:pt-10">

    <h2 className="w-full max-w-5xl text-5xl md:text-8xl font-black text-white italic transform -skew-x-12 mb-6 drop-shadow-[4px_4px_0_#000] animate-slam text-center" style={{ animationDelay: '0.3s', opacity: 0 }}>
          WHO IS <span className="text-[#39ff14]">GUSTI?</span>
    </h2>

    
    <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-start gap-8 mb-20 md:mb-0">     
      
      {/* Image Box - Sticky in Center */}
      <div 
        className="w-full md:w-1/3 animate-mask-wipe flex justify-center md:sticky md:top-20 z-20"
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <div className="w-64 h-64 md:w-full mt-12 md:h-80 bg-black border-4 border-[#39ff14] p-2 transform -rotate-2 shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
          <div className="w-full h-full bg-[#0a2e1f] flex items-center justify-center overflow-hidden relative group">
             {/* Green Overlay Layer */}
             <div className="absolute inset-0 bg-[#39ff14] opacity-20 group-hover:opacity-0 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
             
             {/* Profile Image */}
             <Image
               src="/me.jpg"
               alt="Portrait of Gusti Rais"
               fill
               priority
               sizes="(max-width: 768px) 256px, 33vw"
               className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
             />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full md:w-2/3 flex flex-col justify-center">
        
        <div className="bg-[#0a2e1f]/80 p-4 md:p-6 border-l-4 md:border-l-8 border-[#39ff14] transform skew-x-6 origin-left animate-mask-wipe" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <div className="transform -skew-x-6 text-base md:text-xl font-medium text-[#e0ffe8] space-y-4">
            <p>
              I am a software and data professional passionate about building and analysing systems that drive operational efficiency and innovation. With a strong foundation in both software engineering and data science, I thrive at the intersection of technology and problem-solving of a domain.
            </p>
            <p>
              I build scalable infrastructure that transforms raw data into operational excellence.
            </p>
          </div>
        </div>

        {/* Skill Select */}
        <div
          style={{
            animation: 'kinetic-slam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            animationDelay: '0.7s',
            opacity: 0,
          }}
        >
          <SkillSelect />
        </div>
      </div>
    </div>
  </div>
);