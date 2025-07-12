"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const timeline = [
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
    <div className="justify-start w-full min-h-screen bg-[#2cc295] flex flex-col lg:flex-row sm:px-6 md:px-16">
      {/* Left - Timeline */}
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-start py-12 px-6 lg:pl-12">
        <h2 className="text-[#06302b] text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-wide mb-12 font-nimbus">
          My Journey
        </h2>

        <motion.div
          className="relative"
          initial="hidden"
          animate={controls}
          variants={listVariants}
        >
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
        </motion.div>
      </div>

      {/* Right - Download + Description */}
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-start items-end py-12 px-6 lg:pr-12 ">
        <p className="text-[#06302b] text-xl pl-2 sm:text-4xl text-right md:text-6xl font-bold font-nimbus leading-relaxed">
            Download my Resume!
          </p>
        <button
          onClick={() => window.open("/resume.pdf", "_blank")}
          className="flex items-center gap-3 bg-[#06302b] hover:bg-[#095544] text-white font-medium px-6 py-3 rounded-2xl shadow-md transition-all"
        >
          <FaDownload />
          Download My Resume
        </button>
        <p className="text-[#095544] text-xl pl-2 sm:text-2xl md:text-4xl font-nimbus text-right justify-end pt-16">
            I&apos;m currently into designing easy-to-use, intuitive yet stunning interfaces that work hand-in-hand with machine learning apps and software. I love making complex AI tools feel simple and natural for people, so everyone can get the most out of them without the frustration.
        </p>
      </div>
    </div>
  );
}
