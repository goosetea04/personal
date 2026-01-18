import React from 'react';
import { jobs } from '@/constants/jobs';

export const ResumeSection = () => {
  // Function to handle the download
  const handleDownload = () => {
    // Ensure the PDF is in your /public folder
    const link = document.createElement('a');
    link.href = '/Gusti_Rais_Resume.pdf'; 
    link.download = 'Gusti_Rais_Resume.pdf';
    link.click();
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center p-4 pt-20 pb-20">
      <h2 className="text-5xl md:text-7xl font-black text-white mb-10 transform -rotate-3 border-b-4 border-[#39ff14] animate-mask-wipe">
        MY JOURNEY
      </h2>

      <div className="flex flex-col md:flex-row items-start gap-12 w-full max-w-6xl mx-auto px-4">

        {/* Right Column: Timeline */}
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
        {/* Left Column: Download Button (Sticky) */}
          <div className="md:sticky md:top-20 flex-shrink-0 ml-4">
            <button 
              onClick={handleDownload}
              className="px-8 py-3 bg-[#39ff14] text-black font-black text-xl hover:bg-white hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0_white] active:shadow-none active:translate-x-0 active:translate-y-0 border-2 border-black"
            >
              DOWNLOAD CV.PDF
            </button>
          </div>
      </div>
    </div>
  );
};