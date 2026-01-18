"use client"
import React, { useState } from 'react';
import { styles } from '@/constants/styles';
import { BackgroundSparkles } from '@/components/BackgroundSparkles';
import { BackButton } from '@/components/BackButton';

// Import Sections
import { HomeSection } from '@/components/sections/HomeSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ResumeSection } from '@/components/sections/ResumeSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function GustiRaisPersonaPortfolio() {
  const [activeSection, setActiveSection] = useState<'HOME' | 'ABOUT' | 'RESUME' | 'PROJECTS' | 'CONTACT'>('HOME');

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans selection:bg-[#39ff14] selection:text-black bg-[#0a2e1f] text-[#e0ffe8]">
      {/* 1. Styles */}
      <style>{styles}</style>
      
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `radial-gradient(circle, #03120b 1px, transparent 1px)`, backgroundSize: '8px 8px' }}
      />
      
      <BackgroundSparkles />

      {/* Animated Spike Background */}
      <div className={`hidden md:block absolute top-[-10%] right-[-10%] w-3/4 h-[120%] bg-[#03120b] border-l-4 border-[#39ff14] transform transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) z-0
        ${activeSection === 'HOME' ? '-skew-x-12 translate-x-32' : 'skew-x-0 translate-x-full opacity-0'}`}
      />

      {/* 3. CONTENT AREA (Z-Index 10) */}
      <div className="relative z-10 w-full h-full">
        
        {/* HOME SECTION */}
        {activeSection === 'HOME' && (
            <HomeSection onNavigate={(section) => setActiveSection(section as any)} />
        )}

        {/* OTHER SECTIONS */}
        {activeSection !== 'HOME' && (
          <div className="w-full h-full relative">
              {activeSection === 'ABOUT' && <AboutSection />}
              {activeSection === 'RESUME' && <ResumeSection />}
              {activeSection === 'PROJECTS' && <ProjectsSection />}
              {activeSection === 'CONTACT' && <ContactSection />}
              
              <BackButton onClick={() => setActiveSection('HOME')} />
          </div>
        )}
      </div>
    </div>
  );
}