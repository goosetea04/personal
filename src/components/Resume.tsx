"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import Background from "./Background";

const timeline = [
    {
    start: "June 2025",
    end: "July 2025",
    title: "Business Growth @ SAIEP, Brisbane",
    description: "I was partnered with a client organization in Brisbane to conduct a thorough assessment of their business operations. Together, we identified several areas for enhancement and formulated a multi-faceted implementation strategy to address these opportunities.",
  },
    {
    start: "January 2025",
    end: "Present",
    title: "VP of Partnership and Finance @ ANU Data Science Community",
    description: "Organized workshops, built community around practical ML and research reading.",
  },
  {
    start: "November 2024",
    end: "February 2025",
    title: "Data Engineer Intern @ Ooredoo Group",
    description: "Worked on a RAG backend pipeline, frontend in Next.js, and Azure deployment.",
  },
  {
    start: "December 2024",
    end: "February 2025",
    title: "Full-Stack Developer @ Martabak SG. BNE.",
    description: "Led the development of an integrated online menu website ordering system that significantly increased revenue and business growth.",
  },
];

export default function Resume() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="justify-start w-full min-h-screen bg-[#2cc295] flex flex-col lg:flex-row">
      <Background />
      
      {/* Mobile-first layout */}
      <div className="w-full relative z-10 flex flex-col lg:flex-row">
        
        {/* Header section - mobile optimized */}
        <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-12 pt-6 pb-8 lg:pb-12">
          <h2 className="text-[#06302b] text-4xl sm:text-5xl lg:text-7xl xl:text-9xl font-bold uppercase tracking-wide mb-8 lg:mb-12 font-nimbus text-center lg:text-left">
            My Journey
          </h2>

          {/* Timeline */}
          <motion.div
            className="relative max-w-4xl mx-auto lg:mx-0"
            initial="hidden"
            animate={controls}
            variants={listVariants}
          >
            {/* Mobile: Simple vertical timeline */}
            <div className="block lg:hidden">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#0b453a]" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative flex items-start"
                  >
                    <div className="absolute left-6 w-4 h-4 bg-[#06302b] border-2 border-white rounded-full z-10 shadow-lg" />
                    <div className="ml-16 pr-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/95 rounded-xl shadow-md p-4 border border-[#06302b]"
                      >
                        <h4 className="font-medium text-sm text-[#095544] mb-1">
                          {item.start} — {item.end}
                        </h4>
                        <h3 className="text-lg font-bold text-[#06302b] font-nimbus mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop: Original alternating timeline */}
            <div className="hidden lg:block">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#0b453a]" />
              <div className="space-y-16">
                {timeline.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={index}
                      className={`relative flex items-center w-full ${
                        isLeft ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`w-1/2 ${
                          isLeft ? "pr-8 text-right" : "pl-8 text-left"
                        }`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="bg-white/90 rounded-2xl shadow-md p-4 border border-[#06302b]"
                        >
                          <h4 className="font-medium text-sm text-[#095544]">
                            {item.start} — {item.end}
                          </h4>
                          <h3 className="text-xl font-bold text-[#06302b] font-nimbus">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-700">{item.description}</p>
                        </motion.div>
                      </div>
                      {/* Node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#06302b] border-4 border-white rounded-full z-10 shadow-lg" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right section - mobile optimized */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-start items-center lg:items-end py-8 lg:py-12 px-4 sm:px-6 lg:px-12">
          <div className="text-center lg:text-right max-w-lg lg:max-w-none items-end justify-end">
            <p className="text-[#06302b] text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold font-nimbus leading-tight mb-6">
              Download my Resume!
            </p>
            
            <div className="text-center lg:text-right ">
            <button
              onClick={() => window.open("/Resume.pdf", "_blank")}
              className="inline-flex items-center gap-3 bg-[#06302b] hover:bg-[#095544] text-white font-medium px-6 py-3 rounded-2xl shadow-md transition-all mb-8 lg:mb-16"
            >
              <FaDownload />
              Download My Resume
            </button>
          </div>
            
            <p className="text-[#06302b] text-lg sm:text-xl lg:text-2xl xl:text-4xl font-nimbus leading-relaxed">
              I&apos;m currently into designing easy-to-use, intuitive yet stunning interfaces that work hand-in-hand with machine learning apps and software. I love making complex AI tools feel simple and natural for people, so everyone can get the most out of them without the frustration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}