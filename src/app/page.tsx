"use client"
import { styles } from '@/constants/styles';
import { BackgroundSparkles } from '@/components/BackgroundSparkles';
import React, { useState} from 'react';
import { MENU_ITEMS } from '@/constants/menuItems';
import { BackButton } from '@/components/BackButton';
import { jobs } from '@/constants/jobs';
import { projects } from '@/constants/projects';
import {
  Sparkles, Code,  User, Github, Linkedin, ExternalLink, CheckCircle, Send, AlertCircle, Palette
} from 'lucide-react';

const AboutSection = () => (
  <div className="w-full h-full overflow-y-auto overflow-x-hidden flex items-start md:items-center justify-center p-4 md:p-10 pt-20 md:pt-10">
    <div className="relative w-full max-w-5xl flex flex-col md:flex-row gap-8 mb-20 md:mb-0">     
      {/* Image Box */}
      <div className="w-full md:w-1/3 animate-mask-wipe flex justify-center" style={{ animationDelay: '0.1s', opacity: 0 }}>
        <div className="w-64 h-64 md:w-full md:h-80 bg-black border-4 border-[#39ff14] p-2 transform -rotate-2 shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
          <div className="w-full h-full bg-[#0a2e1f] flex items-center justify-center overflow-hidden relative group">
             <div className="absolute inset-0 bg-[#39ff14] opacity-0 group-hover:opacity-20 transition-opacity duration-100 z-10 mix-blend-overlay"></div>
             <User className="w-24 h-24 md:w-32 md:h-32 text-[#39ff14] opacity-80 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>
      {/* Text Content */}
      <div className="w-full md:w-2/3 flex flex-col justify-center">
        <h2 className="text-5xl md:text-8xl font-black text-white italic transform -skew-x-12 mb-6 drop-shadow-[4px_4px_0_#000] animate-slam text-center md:text-left" style={{ animationDelay: '0.3s', opacity: 0 }}>
          WHO IS <span className="text-[#39ff14] block md:inline">GUSTI?</span>
        </h2>
        <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 border-l-4 md:border-l-8 border-[#39ff14] transform skew-x-6 origin-left animate-mask-wipe" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <div className="transform -skew-x-6 text-base md:text-xl font-medium text-[#e0ffe8] space-y-4">
            <p>
              A digital architect forging chaos into logic. Specialized in <span className="bg-[#39ff14] text-black px-1 font-bold">React Ecosystems</span> and high-performance UI.
            </p>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-8 transform -rotate-1">
           {['CODE', 'DESIGN', 'SPEED'].map((stat, i) => (
             <div
               key={stat}
               className="bg-black text-[#39ff14] border border-[#39ff14] p-2 text-center font-bold hover-glitch cursor-default text-xs md:text-base"
               style={{ animation: `kinetic-slam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`, animationDelay: `${0.7 + (i * 0.1)}s`, opacity: 0 }}
             >
               {stat} <span className="block text-white text-[10px] md:text-xs">LV. MAX</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

// RESUME SECTION
const ResumeSection = () => {
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center p-4 pt-20 pb-20">
       <h2 className="text-5xl md:text-7xl font-black text-white mb-10 transform -rotate-3 border-b-4 border-[#39ff14] animate-mask-wipe">CHRONICLE</h2>
       <div className="relative w-full max-w-xl pl-6 md:pl-10 border-l-4 border-white/20">
         {jobs.map((job, idx) => (
           <div
             key={idx}
             className="relative mb-12 group"
             style={{ animation: `slide-up-stagger 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`, animationDelay: `${0.2 + (idx * 0.15)}s`, opacity: 0 }}
            >
             {/* Timeline Node */}
             <div className="absolute -left-[37px] md:-left-[49px] top-0 w-5 h-5 md:w-6 md:h-6 bg-[#39ff14] border-4 border-black rotate-45 group-hover:scale-150 group-hover:rotate-90 transition-all duration-300"></div>
             {/* Content Card */}
             <div className="bg-black p-4 md:p-6 ml-2 md:ml-6 border-2 border-white/30 transform -skew-x-6 md:-skew-x-12 hover:bg-[#39ff14] hover:border-black transition-all duration-200 cursor-pointer shadow-[4px_4px_0_rgba(57,255,20,0.1)] md:shadow-[8px_8px_0_rgba(57,255,20,0.1)]">
                <div className="transform skew-x-6 md:skew-x-12 group-hover:text-black">
                   <span className="bg-[#39ff14] group-hover:bg-black group-hover:text-white text-black font-black px-2 text-xs md:text-sm transition-colors">{job.year}</span>
                   <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-black mt-1">{job.title}</h3>
                   <p className="text-lg md:text-xl text-gray-400 font-bold group-hover:text-black/70">{job.company}</p>
                </div>
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center p-4 pt-20 pb-20 bg-[#050505]">
      {/* Section Header */}
      <h2 className="text-5xl md:text-6xl font-black text-white mb-16 bg-black px-8 py-2 transform -skew-x-12 border-2 border-[#39ff14] animate-slam shadow-[4px_4px_0_#39ff14]">
        <span className="transform skew-x-12 block tracking-tighter">MISSIONS</span>
      </h2>
      {/* Grid Container */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-10 perspective-1000 w-full max-w-7xl">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="group relative w-full md:w-[22rem] flex flex-col bg-[#03120b] border-2 border-white/20 hover:border-[#39ff14] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
            style={{
              animation: `card-deal 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
              animationDelay: `${0.2 + (i * 0.15)}s`,
              opacity: 0
            }}
          >
            {/* 1. Image Area */}
            <div className="relative h-48 w-full overflow-hidden border-b-2 border-[#39ff14]/50 group-hover:border-[#39ff14]">
              {/* The Image */}
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" 
              />
              {/* Overlay Flash */}
              <div className="absolute inset-0 bg-[#39ff14] mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              {/* Tag Badge */}
              <div className="absolute top-0 right-0 bg-[#39ff14] text-black font-black text-xs px-3 py-1 transform translate-x-2 -translate-y-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-300 border border-black shadow-lg">
                {p.tag}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow relative">
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#39ff14] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {/* Title & Icon */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-black text-white italic tracking-tight group-hover:text-[#39ff14] transition-colors">
                  {p.title}
                </h3>
                {p.tag === 'SOFTWARE' ? (
                  <Code className="text-white/30 w-6 h-6 group-hover:text-[#39ff14] transition-colors" />
                ) : (
                  <Palette className="text-white/30 w-6 h-6 group-hover:text-[#39ff14] transition-colors" />
                )}
              </div>
              {/* Description */}
              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                {p.description}
              </p>
              {/* 3. Links / Action Buttons */}
              <div className="mt-auto flex gap-3">
                <a 
                  href={p.links.repo}
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-white/30 text-white font-bold text-xs py-2 px-4 hover:bg-white hover:text-black hover:border-white transition-all uppercase"
                >
                  <Github size={14} /> Repo
                </a>
                <a 
                  href={p.links.demo}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#39ff14]/10 border border-[#39ff14] text-[#39ff14] font-bold text-xs py-2 px-4 hover:bg-[#39ff14] hover:text-black hover:shadow-[0_0_15px_#39ff14] transition-all uppercase"
                >
                  <ExternalLink size={14} /> Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes card-deal {
          0% { transform: translateY(100px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes slam {
          0% { transform: scale(3); opacity: 0; }
          100% { transform: scale(1) skewX(-12deg); opacity: 1; }
        }
        .animate-slam { animation: slam 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

const ContactSection = () => {
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [formState, setFormState] = useState({ email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('SENDING');

        try {
            const response = await fetch("https://formsubmit.co/ajax/u7962778@anu.edu.au", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: formState.email,
                    message: formState.message,
                    _subject: "New Calling Card from Portfolio"
                })
            });

            if (response.ok) {
                setStatus('SUCCESS');
                setFormState({ email: '', message: '' });
            } else {
                setStatus('ERROR');
            }
        } catch  {
            setStatus('ERROR');
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto flex items-center justify-center p-4 pt-20">
            <div className="relative w-full max-w-lg md:max-w-2xl bg-white transform rotate-2 p-1 border-4 border-black shadow-[10px_10px_0_#39ff14] md:shadow-[15px_15px_0_#39ff14] animate-spin-stick origin-center my-auto">
                
                {/* The "Stick" Pin visual */}
                <div className="absolute -top-6 left-1/2 w-4 h-12 bg-[#39ff14] border-2 border-black z-20"></div>

                <div className="bg-black p-6 md:p-12 relative overflow-hidden group min-h-[500px] flex flex-col justify-center">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #39ff14 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    {status === 'SUCCESS' ? (
                        <div className="text-center animate-slam">
                            <div className="flex justify-center mb-6">
                                <div className="bg-[#39ff14] p-4 rounded-full border-4 border-white">
                                    <CheckCircle className="w-16 h-16 text-black" />
                                </div>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-2 transform -skew-x-12">CARD SENT!</h2>
                            <p className="text-[#39ff14] font-bold text-xl uppercase tracking-widest">HEART STOLEN SUCCESSFULLY</p>
                            <button 
                                onClick={() => setStatus('IDLE')}
                                className="mt-8 text-white underline hover:text-[#39ff14] font-bold"
                            >
                                SEND ANOTHER?
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-4xl md:text-7xl font-black text-[#39ff14] text-center mb-2 transform -skew-x-12 hover-glitch">TAKE YOUR HEART</h2>
                            <p className="text-white text-center font-bold text-sm md:text-xl mb-6 md:mb-8 uppercase tracking-widest">Send a calling card</p>
                            
                            <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                                <input 
                                    type="email" 
                                    required
                                    placeholder="YOUR EMAIL" 
                                    value={formState.email}
                                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    className="w-full bg-transparent border-b-2 border-white/50 text-white p-2 font-mono focus:border-[#39ff14] focus:outline-none transition-all focus:pl-4 text-sm md:text-base disabled:opacity-50" 
                                    disabled={status === 'SENDING'}
                                />
                                <textarea 
                                    rows={3} 
                                    required
                                    placeholder="YOUR MESSAGE" 
                                    value={formState.message}
                                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                                    className="w-full bg-transparent border-b-2 border-white/50 text-white p-2 font-mono focus:border-[#39ff14] focus:outline-none transition-all focus:pl-4 text-sm md:text-base disabled:opacity-50"
                                    disabled={status === 'SENDING'}
                                ></textarea>
                                
                                <button 
                                    disabled={status === 'SENDING'}
                                    className="w-full bg-[#39ff14] hover:bg-[#ff1f28] disabled:bg-gray-600 text-black font-black text-lg md:text-2xl py-2 md:py-3 mt-4 transform -skew-x-6 border-2 border-black shadow-[4px_4px_0_white] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {status === 'SENDING' ? (
                                        <>SENDING...</>
                                    ) : (
                                        <>SEND IT <Send className="w-5 h-5" /></>
                                    )}
                                </button>

                                {status === 'ERROR' && (
                                    <div className="bg-red-500/20 border border-red-500 p-2 text-red-500 text-center font-bold text-sm flex items-center justify-center gap-2 animate-pulse">
                                        <AlertCircle className="w-4 h-4" /> TRANSMISSION FAILED. TRY AGAIN.
                                    </div>
                                )}
                            </form>

                            <div className="flex justify-center gap-6 mt-6 md:mt-8">
                                <Github className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-[#39ff14] hover:scale-125 transition-all cursor-pointer" />
                                <Linkedin className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-[#39ff14] hover:scale-125 transition-all cursor-pointer" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- MAIN CONTROLLER ---

export default function GustiRaisPersonaPortfolio() {
  const [activeSection, setActiveSection] = useState<'HOME' | 'ABOUT' | 'RESUME' | 'PROJECTS' | 'CONTACT'>('HOME');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  type Section = "HOME" | "ABOUT" | "RESUME" | "PROJECTS" | "CONTACT";
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

      {/* 3. CONTENT AREA (Z-Index 10) - THIS IS CRITICAL */}
      {/* We need 'relative z-10' here to make sure buttons sit ON TOP of the sparkles */}
      <div className="relative z-10 w-full h-full">
        
        {/* HOME MENU */}
        {activeSection === 'HOME' && (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-center">

            {/* MOBILE ONLY TITLE */}
             <div className="md:hidden absolute top-25 left-0 w-full text-center pointer-events-none opacity-50">
                 <h1 className="text-6xl font-black italic text-white opacity-20">GUSTI RAIS</h1>
             </div>
            
            {/* LEFT: Menu Items */}
            <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start md:pl-24 space-y-4 md:space-y-2">
                {/* Background Glow */}
                <div className="absolute md:left-[-150px] top-1/2 transform -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#39ff14] rounded-full blur-[80px] md:blur-[100px] pointer-events-none opacity-20" />

                <div className="flex flex-col space-y-3 md:space-y-2 transform -rotate-3 md:-rotate-6 origin-center">
                  {MENU_ITEMS.map((item, idx) => (
                    <button
                      key={item.id}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => setActiveSection(item.id as Section)}
                      style={{
                          animation: 'slide-up-stagger 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                          animationDelay: `${idx * 0.1}s`,
                          opacity: 0
                      }}
                      className={`relative group flex items-center transition-all duration-300 ease-out ${item.offset} ${hoveredIndex === idx ? 'translate-x-4 md:translate-x-12 scale-105 md:scale-110 z-20' : 'z-10'}`}
                    >
                      {/* Black Bar */}
                      <div className={`px-6 py-2 md:px-8 md:py-2 transform -skew-x-12 border-2 md:border-4 transition-all duration-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] group-hover:shadow-[6px_6px_0px_0px_rgba(3,18,11,1)] md:group-hover:shadow-[8px_8px_0px_0px_rgba(3,18,11,1)]`}
                        style={{
                            backgroundColor: hoveredIndex === idx ? '#39ff14' : '#03120b',
                            color: hoveredIndex === idx ? '#03120b' : '#e0ffe8',
                            borderColor: hoveredIndex === idx ? '#03120b' : 'transparent'
                        }}
                      >
                        <div className="flex items-center gap-4 transform skew-x-12">
                            <span className="font-black text-2xl md:text-5xl tracking-tighter italic block">{item.label}</span>
                        </div>
                      </div>
                      
                      {/* Hover Star */}
                      <div className={`hidden md:block ml-4 transition-all duration-300 ${hoveredIndex === idx ? 'opacity-100 rotate-180 scale-125' : 'opacity-0 scale-0'}`}>
                        <Sparkles className="w-10 h-10 text-[#39ff14] fill-[#39ff14]" />
                      </div>
                    </button>
                  ))}
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
        )}

        {/* SECTION RENDERING */}
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