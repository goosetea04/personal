import React, { useState, useEffect } from 'react';
import { projects } from '@/constants/projects';
import { ExternalLink, Github, X, FolderCode, Zap } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
  image: string;
  links: {
    demo?: string;
    repo?: string;
  };
}

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    /* MATCHED: Changed padding and overflow to match ResumeSection */
    <div className="w-full h-full overflow-y-auto flex flex-col items-center p-4 pt-20 pb-20">
      
      {/* MATCHED: Header size (7xl), rotation (-rotate-3), and margin updated */}
      <h2 className="text-5xl md:text-7xl font-black text-white mb-16 transform -rotate-3 border-b-4 border-[#39ff14] animate-mask-wipe uppercase tracking-tighter">
        My Projects
      </h2>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
        {projects.map((p, i) => (
          <div
            key={p.id}
            onClick={() => setSelectedProject(p)}
            className="group relative cursor-pointer"
            style={{ 
              animation: `slide-up-stagger 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`, 
              animationDelay: `${0.2 + (i * 0.1)}s`, 
              opacity: 0 
            }}
          >
            {/* Background Skewed Card */}
            <div className="bg-zinc-900 border-2 border-white/20 transform -skew-x-2 transition-all duration-200 group-hover:border-[#39ff14] group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0_rgba(57,255,20,0.2)] overflow-hidden">
              
              {/* Image Container */}
              <div className="relative h-44 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[#39ff14]/10 mix-blend-color z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute top-0 right-0 bg-[#39ff14] text-black font-black px-4 py-1 text-[12px] uppercase tracking-tighter">
                  {p.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 mt-5">
                <h3 className="text-xl font-black text-white group-hover:text-[#39ff14] transition-colors flex items-center gap-2 italic">
                  <Zap size={18} className="fill-current" />
                  {p.title}
                </h3>
                <p className="text-gray-400 mt-2 text-sm line-clamp-2 font-bold leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-4 flex justify-end">
                  <span className="text-[10px] font-black text-[#39ff14] tracking-[0.2em] uppercase bg-[#39ff14]/10 px-2 py-1">
                    [ VIEW_STORY ]
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          
          <div className="relative bg-black border-2 border-[#39ff14] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row transform -skew-x-1 animate-in zoom-in-95 duration-300 shadow-[20px_20px_0_rgba(57,255,20,0.1)]">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-0 right-0 z-50 bg-[#39ff14] text-black p-2 hover:bg-white transition-colors"
            >
              <X size={24} strokeWidth={3} />
            </button>

            {/* Modal Left Side */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img src={selectedProject.image} alt="" className="w-full h-full object-cover contrast-125 grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <h2 className="absolute bottom-6 left-6 text-4xl font-black text-white italic uppercase leading-none tracking-tighter">
                {selectedProject.title}
              </h2>
            </div>

            {/* Modal Right Side */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-black text-white flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6 text-[#39ff14]">
                   <FolderCode size={24} />
                   <span className="font-black text-sm tracking-widest uppercase">Technical_Analysis</span>
                </div>
                <p className="text-lg leading-relaxed font-bold mb-8 text-gray-300">
                  {selectedProject.description}
                </p>
                <div className="flex flex-col gap-3">
                  {selectedProject.links.repo && (
                    <a href={selectedProject.links.repo} target="_blank" rel="noreferrer"
                      className="group flex items-center justify-between bg-white text-black font-black p-4 text-sm hover:bg-[#39ff14] transition-all transform -skew-x-3"
                    >
                      <span className="flex items-center gap-2"><Github size={20}/> SOURCE_CODE</span>
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {selectedProject.links.demo && (
                    <a href={selectedProject.links.demo} target="_blank" rel="noreferrer"
                      className="group flex items-center justify-between bg-[#39ff14] text-black font-black p-4 text-sm hover:bg-white transition-all transform -skew-x-3"
                    >
                      <span className="flex items-center gap-2"><Zap size={20} fill="black" /> LIVE_DEMO </span>
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up-stagger {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-mask-wipe {
          mask-image: linear-gradient(to right, black 0%, black 100%);
          mask-size: 100% 100%;
          animation: mask-wipe-anim 0.7s cubic-bezier(0.7, 0, 0.3, 1);
        }
        @keyframes mask-wipe-anim {
          0% { mask-size: 0% 100%; }
          100% { mask-size: 100% 100%; }
        }
      `}</style>
    </div>
  );
};