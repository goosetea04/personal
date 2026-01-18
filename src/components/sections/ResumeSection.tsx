import React, { useState } from 'react';
import { jobs } from '@/constants/jobs';

export const ResumeSection = () => {
  const [currentImg, setCurrentImg] = useState(0);

  // Sample images - replace with your actual paths
  const photos = [
    { src: '/Ooredoo.jpg', label: 'Ooredoo' },
    { src: '/Pookie.PNG', label: 'Pookie' },
    { src: '/ANUISA.jpg', label: 'ANU Indonesian Students Association' },
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Gusti_Rais_Resume.pdf'; 
    link.download = 'Gusti_Rais_Resume.pdf';
    link.click();
  };

  const nextPhoto = () => setCurrentImg((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrentImg((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center p-4 pt-20 pb-20">
      <h2 className="text-5xl md:text-7xl font-black text-white mb-10 transform -rotate-3 border-b-4 border-[#39ff14] animate-mask-wipe">
        MY JOURNEY
      </h2>

      <div className="flex flex-col md:flex-row items-start gap-12 w-full max-w-6xl mx-auto px-4">

        {/* Left Column: Timeline */}
        <div className="relative w-full max-w-xl pl-6 md:pl-10 border-l-4 border-white/20">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="relative mb-12 group"
              style={{ 
                animation: `slide-up-stagger 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`, 
                animationDelay: `${0.2 + (idx * 0.15)}s`, 
                opacity: 0 
              }}
            >
              <div className="absolute -left-[37px] md:-left-[49px] top-0 w-5 h-5 md:w-6 md:h-6 bg-[#39ff14] border-4 border-black rotate-45 group-hover:scale-150 group-hover:rotate-90 transition-all duration-300"></div>
              
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

        {/* Right Column: Download & Interactive Screen */}
        <div className="md:sticky md:top-20 flex-shrink-0 ml-4 flex flex-col gap-8 w-full md:w-auto">
          
          <button 
            onClick={handleDownload}
            className="px-8 py-3 bg-[#39ff14] text-black font-black text-xl hover:bg-white hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0_white] active:shadow-none active:translate-x-0 active:translate-y-0 border-2 border-black"
          >
            DOWNLOAD CV.PDF
          </button>

          {/* Interactive Photo Screen */}
          <div className="relative group w-full max-w-sm self-center md:self-start">
            {/* Screen Housing */}
            <div className="bg-zinc-900 border-4 border-white p-2 shadow-[20px_20px_0_#39ff14]">
              
              {/* The "Glass" Display */}
              <div className="relative aspect-video bg-black overflow-hidden border-2 border-white/10">
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
                
                <img 
                  key={currentImg}
                  src={photos[currentImg].src} 
                  alt="Gallery" 
                  className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-300 grayscale group-hover:grayscale-0"
                />

                {/* Status Bar */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center z-20">
                    <span className="text-[10px] font-mono text-[#39ff14] bg-black/80 px-1 border border-[#39ff14]">
                        IMG_{currentImg + 1}.SYS
                    </span>
                    <span className="text-[10px] font-mono text-[#39ff14] bg-black/80 px-1 border border-[#39ff14]">
                        {photos[currentImg].label}
                    </span>
                </div>
              </div>

              {/* Control Panel */}
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={prevPhoto}
                  className="flex-1 bg-white text-black font-black py-1 text-sm hover:bg-[#39ff14] transition-colors border-2 border-black active:translate-y-0.5"
                >
                  PREV
                </button>
                <div className="flex gap-1 items-center px-2">
                    {photos.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rotate-45 ${i === currentImg ? 'bg-[#39ff14]' : 'bg-white/20'}`} />
                    ))}
                </div>
                <button 
                  onClick={nextPhoto}
                  className="flex-1 bg-white text-black font-black py-1 text-sm hover:bg-[#39ff14] transition-colors border-2 border-black active:translate-y-0.5"
                >
                  NEXT
                </button>
              </div>
            </div>
            
            {/* Decorative Label */}
            <div className="absolute -top-3 -right-3 bg-white text-black text-[10px] font-bold px-2 py-0.5 rotate-12 border-2 border-black">
                PHOTO_BOOTH
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};