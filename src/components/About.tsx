"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

interface AboutProps {
  imageSrc?: string;
}

export default function About({ imageSrc = "/me (1).png" }: AboutProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const skills = [
    "Full-Stack Development",
    "Branding",
    "Database Design",
    "UI/UX Design",
    "Game Development",
    "API Development",
  ];

  const achievements = [
    { number: "5+", label: "Projects Completed" },
    { number: "3+", label: "Years Experience" },
  ];

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex flex-col lg:flex-row px-6 sm:px-12" id="about">
      {/* Left Side - About Content */}
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center lg:pl-12 py-12 lg:py-24">
        <motion.div
          initial="hidden"
          animate={controls}
          className="space-y-6"
        >
          <div className="space-y-2 text-center lg:text-left">
            <p className="text-[#095544] text-lg sm:text-xl lg:text-2xl xl:text-4xl font-bold font-nimbus">
              About
            </p>
            <h1 className="text-[#06302b] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-wide font-nimbus">
              Me
            </h1>
          </div>

          <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
            <p className="text-[#095544] text-base sm:text-lg lg:text-xl font-medium font-nimbus leading-relaxed text-center lg:text-left">
              I am a passionate software engineer who thrives on turning complex problems into elegant solutions. With a strong foundation in modern web technologies and a keen eye for design, I bridge the gap between functionality and user experience.
            </p>
            <p className="text-[#095544] text-base sm:text-lg lg:text-xl font-medium font-nimbus leading-relaxed text-center lg:text-left">
              My approach combines clean, scalable code with innovative thinking. I believe great software is not just about making things work; it is about making them work beautifully.
            </p>
          </div>

          {/* Achievement Stats */}
          <motion.div
            variants={listVariants}
            className="grid grid-cols-2 gap-4 pt-8 max-w-md mx-auto lg:mx-0"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-[#06302b] bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <div className="text-[#f1f7f6] text-xl sm:text-2xl lg:text-3xl font-bold font-nimbus">
                  {achievement.number}
                </div>
                <div className="text-[#f1f7f6] text-xs sm:text-sm lg:text-base font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Skills */}
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center items-center lg:items-end lg:pr-12 py-12 lg:py-0">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={listVariants}
          className="space-y-6 w-full max-w-md lg:max-w-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end mb-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#06302b] to-[#095544] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <Image
                src={imageSrc}
                alt="Profile"
                width={224}
                height={224}
                className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-[#06302b] shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </motion.div>

          <div className="text-center lg:text-right mb-8">
            <h2 className="text-[#06302b] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-wide font-nimbus">
              what i do 💚
            </h2>
          </div>

          <div className="space-y-4 text-center lg:text-right">
            {skills.map((skill, index) => (
              <motion.div key={index} className="group cursor-pointer">
                <div className="relative inline-block">
                  <h3 className="text-[#06302b] text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold uppercase tracking-wide transition-all duration-300 group-hover:text-[#095544] font-nimbus">
                    {skill}
                  </h3>
                  <span className="absolute right-0 lg:right-0 left-0 lg:left-auto -bottom-1 w-0 h-[2px] bg-[#06302b] transition-all duration-500 group-hover:w-full"></span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#06302b] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#095544] opacity-5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}