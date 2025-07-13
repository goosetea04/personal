"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import HeroBackground from "../HeroBackground";

export const Hero = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const items = [
    { label: "About", href: "/#about" },
    { label: "Tech Stack", href: "/#techstack" },
    { label: "Get In Touch", href: "/#contact" },
    { label: "Projects", href: "/portfolio" },
    { label: "Resume", href: "/resume" },
    { label: "Games", href: "/library" },
  ];

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's an anchor link (starts with /#)
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2); // Remove '/#' to get the ID
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex flex-col lg:flex-row px-4 sm:px-6 lg:px-0">
      <HeroBackground />
      
      {/* Left Side - Content */}
      <div className="w-full pr-16 lg:w-1/2 relative z-10 flex flex-col justify-center lg:justify-end pt-20 lg:pt-0 pb-8 lg:pb-24 px-4 lg:pl-12 lg:pr-0">
        <div className="space-y-2 lg:space-y-2">
          <p className="text-[#095544] text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-4xl font-bold font-nimbus pl-0 lg:pl-2">
            Hi I&apos;m
          </p>
          <h1
            className="text-[#06302b] text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-9xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
          >
            Gusti
          </h1>
          <h1
            className="text-[#06302b] text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-9xl font-bold uppercase tracking-wide pb-2"
            style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
          >
            Rais
          </h1>
          <p className="text-[#095544] text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-medium font-nimbus leading-relaxed pl-0 lg:pl-2 max-w-none lg:max-w-lg xl:max-w-xl">
            I love creating things! From applications, research, branding and
            games, I love to make it all. Stay awhile and see what I have to
            offer. Play games to enjoy your stay as well!
          </p>
        </div>
      </div>

      {/* Right Side - Navigation */}
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center items-end pb-8 lg:pb-0 px-4 lg:pr-12 lg:pl-0">
        <motion.ul
          initial="hidden"
          animate={controls}
          variants={listVariants}
          className="space-y-3 lg:space-y-4 text-right w-full"
        >
          {items.map((item, index) => (
            <motion.li
              key={index}
              className="text-[#06302b] text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-bold uppercase tracking-wide cursor-pointer relative group"
              style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
            >
              <Link 
                href={item.href} 
                className="relative inline-block transition-all duration-300 hover:text-[#095544]"
                onClick={(e) => handleClick(e, item.href)}
              >
                {item.label}
                <span className="absolute left-0 lg:left-auto lg:right-0 -bottom-1 w-0 h-[2px] bg-[#06302b] transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};