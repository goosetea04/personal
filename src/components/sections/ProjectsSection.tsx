import React, { useState, useEffect } from 'react';
// Ensure your projects data has long descriptions for the modal!
import { projects } from '@/constants/projects';
import { Terminal, ExternalLink, MapPin, Database, Briefcase, X, FileText, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
  image: string;
  links: {
    repo: string;
    demo: string;
  };
}

// Define the specific radioactive green color for consistency
const PIP_GREEN = '#16e707';

export const ProjectsSection = () => {
  // State for managing the active modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  const openModal = (project: Project) => {
      setSelectedProject(project);
  };

  const closeModal = () => {
      setSelectedProject(null);
  };


  return (
    // Main Container - Setting the stage for the CRT effect
    // NOTE: Ensure you have imported the VT323 font in your index.html
    <div className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden p-2 md:p-8 font-['VT323'] uppercase selection:bg-[#16e707] selection:text-black">

      {/* CRT Screen Effects (Overlays) - Lower z-index so modal sits on top */}
      <div className="pointer-events-none fixed inset-0 z-30 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)0px,rgba(0,0,0,0.15)1px,transparent_1px,transparent_3px)]"></div>
      <div className="pointer-events-none fixed inset-0 z-20 mix-blend-screen opacity-30 animate-flicker"
           style={{ background: `radial-gradient(circle at center, ${PIP_GREEN}20 0%, #000000ee 100%)` }}></div>


      {/* Pip-Boy UI Frame */}
      <div className={`relative z-10 max-w-7xl mx-auto border-4 border-[#2a2a2a] bg-[#050505] shadow-[0_0_40px_rgba(22,231,7,0.2)] h-[85vh] md:h-[90vh] flex flex-col rounded-lg overflow-hidden transition-all ${selectedProject ? 'blur-sm scale-[0.98] opacity-50 pointer-events-none' : ''}`}>

        {/* 1. Header Tabs */}
        <div className="flex border-b-2 border-[#16e707] bg-[#0a0a0a] p-2">
          <div className="flex-1 flex justify-start items-end gap-2 md:gap-4 text-lg md:text-2xl tracking-wider pl-2 md:pl-4">
            <span className="opacity-50 text-[#16e707] hidden md:inline">STAT</span>
            <span className="opacity-50 text-[#16e707]">INV</span>
            <div className="bg-[#16e707] text-black px-4 py-1 font-bold skew-x-[-10deg] border-r-4 border-b-4 border-[#0a4a05]">
              <span className="skew-x-[10deg] block">DATA</span>
            </div>
            <span className="opacity-50 text-[#16e707] hidden md:inline">MAP</span>
            <span className="opacity-50 text-[#16e707]">RADIO</span>
          </div>
        </div>

        {/* Sub-Header */}
        <div className="bg-[#16e707]/10 border-b border-[#16e707] p-2 px-4 md:px-6 text-[#16e707] text-base md:text-lg flex items-center gap-2 truncate">
           <Database size={16} /> {'>'} QUESTS {'>'} CURRENT MISSIONS
        </div>


        {/* 2. Main Content Area - Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-pipboy">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {projects.map((p, i) => (
              <div
                key={p.id}
                // Added onClick handler to open modal
                onClick={() => openModal(p)}
                className="group relative flex flex-col border-2 border-[#16e707]/40 bg-[#0a0a0a] transition-all duration-200 hover:border-[#16e707] hover:bg-[#16e707]/10 hover:shadow-[0_0_15px_rgba(22,231,7,0.4)] cursor-pointer"
                style={{
                  animation: `card-load 0.4s steps(5, end) forwards`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0
                }}
              >
                {/* Card Corner Decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#16e707] opacity-60 group-hover:opacity-100"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#16e707] opacity-60 group-hover:opacity-100"></div>

                {/* Image Area - UPDATED FOR LIGHTER GREEN TINT */}
                <div className="relative h-44 w-full overflow-hidden border-b-2 border-[#16e707]/40 group-hover:border-[#16e707]">
                  {/*
                      TINT ADJUSTMENT:
                      Changed opacity from 'opacity-50' to 'opacity-30' to make the green tint lighter.
                  */}
                  <div className="absolute inset-0 bg-[#16e707] mix-blend-overlay opacity-30 z-10 pointer-events-none"></div>
                  <img
                    src={p.image}
                    alt={p.title}
                    // Increased brightness/contrast slightly to punch through the tint
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-110 group-hover:scale-105 transition-transform duration-500 scale-100"
                  />
                   <div className="absolute top-2 right-2 z-20 bg-black/80 border border-[#16e707] text-[#16e707] text-sm px-2 py-0.5">
                    [{p.tag.substring(0, 3)}]
                  </div>
                </div>


                {/* Content Area */}
                <div className="p-4 flex flex-col flex-grow relative text-[#16e707]">
                  {/* Title */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl md:text-2xl tracking-wider group-hover:underline decoration-2 underline-offset-4 truncate pr-2">
                      {p.title}
                    </h3>
                    {p.tag === 'SOFTWARE' ? <Terminal className="w-5 h-5 opacity-80 shrink-0" /> : <Briefcase className="w-5 h-5 opacity-80 shrink-0" />}
                  </div>

                  {/* Description (Short version due to line-clamp-3) */}
                  <p className="text-[#16e707]/80 text-base md:text-lg leading-tight mb-6 line-clamp-3 font-medium">
                    {p.description}
                  </p>

                  {/* "View More" Prompt */}
                  <div className="mt-auto flex justify-end text-sm animate-pulse opacity-80 pb-2">
                      <span>[CLICK TO VIEW DATA]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Footer */}
        <div className="border-t-2 border-[#16e707] bg-[#0a0a0a] p-2 flex justify-between text-[#16e707] text-sm md:text-lg opacity-80 hidden md:flex">
            <div className="flex gap-4">
                <span>[TAB] NAV</span>
                <span>[MOUSE] SELECT</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin size={16} /> COMMONWEALTH
            </div>
        </div>
      </div>

      {/* ================= MODAL (FULL DESCRIPTION) ================= */}
      {selectedProject && (
        // Modal Backdrop with high z-index to sit above CRT effects
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Darkened Overlay Background */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>

          {/* Modal Content Box - "Popup Terminal" style */}
          <div
              className="relative bg-[#0a0a0a] border-4 border-[#16e707] shadow-[0_0_50px_rgba(22,231,7,0.5)] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-sm animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b-2 border-[#16e707] p-4 bg-[#16e707]/10">
              <div className="flex items-center gap-3 text-xl md:text-3xl text-[#16e707]">
                 <FileText /> FILE_ENTRY: {selectedProject.title}
              </div>
              <button onClick={closeModal} className="text-[#16e707] hover:bg-[#16e707] hover:text-black border-2 border-[#16e707] p-1 transition-colors">
                  <X size={24} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto scrollbar-pipboy flex flex-col gap-6">
               {/* Full Image - UPDATED FOR LIGHTER GREEN TINT */}
               <div className="relative w-full h-64 md:h-80 shrink-0 border-2 border-[#16e707]">
                  {/* TINT ADJUSTMENT: Changed opacity from 50 to 30 here as well for consistency */}
                  <div className="absolute inset-0 bg-[#16e707] mix-blend-overlay opacity-30 z-10 pointer-events-none"></div>
                  <img src={selectedProject.image} alt="" className="w-full h-full object-cover grayscale contrast-125 brightness-110" />
                   {/* Fake terminal readout overlay */}
                   <div className="absolute bottom-2 left-2 z-20 text-[#16e707] text-sm bg-black/70 px-2">
                       IMG_DATA: {selectedProject.tag} // SIZE: 450KB
                   </div>
               </div>

               {/* Full Description Text Area */}
               <div className="text-[#16e707] text-lg md:text-2xl leading-relaxed whitespace-pre-wrap font-medium">
                   <h4 className="border-b border-[#16e707]/50 mb-4 inline-block">Currently Reading: DESCRIPTION.txt</h4>
                   {/*
                       This displays the FULL description.
                       The 'whitespace-pre-wrap' class ensures paragraphs in your data are respected.
                   */}
                   <p>{selectedProject.description}</p>

                   {/* Fake terminal footer data */}
                   <p className="mt-8 text-[#16e707]/50 text-base">
                       --- END OF ENTRY --- <br/>
                       STATUS: DECLASSIFIED <br/>
                       VAULT-TEC TERMINAL OS v.7.2.1
                   </p>
               </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="border-t-2 border-[#16e707] p-4 flex gap-4 bg-[#0a0a0a] text-lg md:text-xl shrink-0">
              {selectedProject.links.repo && (
                <a
                  href={selectedProject.links.repo}
                  target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-[#16e707]/70 hover:bg-[#16e707] hover:text-black hover:border-[#16e707] transition-all py-2 hover:shadow-[0_0_15px_#16e707]"
                >
                  <Github size={20} /> ACCESS REPOSITORY
                </a>
              )}
              {selectedProject.links.demo && (
                <a
                  href={selectedProject.links.demo}
                  target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-[#16e707] bg-[#16e707]/20 hover:bg-[#16e707] hover:text-black transition-all py-2 shadow-[0_0_10px_rgba(22,231,7,0.3)] hover:shadow-[0_0_20px_#16e707]"
                >
                   <ExternalLink size={20} /> EXECUTE DEMO
                </a>
              )}
            </div>

          </div>
        </div>
      )}


      <style>{`
        /* ... previous animations ... */
        @keyframes flicker {
          0% { opacity: 0.3; }
          5% { opacity: 0.25; }
          10% { opacity: 0.3; }
          15% { opacity: 0.35; }
          20% { opacity: 0.3; }
          100% { opacity: 0.3; }
        }
        .animate-flicker { animation: flicker 4s infinite; }

        @keyframes card-load {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        /* Scrollbar styling applies to both main grid and modal */
        .scrollbar-pipboy::-webkit-scrollbar {
          width: 12px;
          background-color: #050505;
          border-left: 2px solid #16e707;
          border-right: 1px solid #16e707;
        }

        .scrollbar-pipboy::-webkit-scrollbar-thumb {
          background-color: #16e707;
          border: 3px solid #050505;
        }

        .scrollbar-pipboy::-webkit-scrollbar-thumb:hover {
          background-color: #22ff55;
          box-shadow: 0 0 15px #16e707 inset;
        }
      `}</style>
    </div>
  );
};