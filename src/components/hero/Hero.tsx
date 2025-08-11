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
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex flex-col lg:flex-row px-4 sm:px-6 lg:px-10">
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
          
          {/* Social Media Links */}
          <div className="flex gap-4 pt-4 pb-4 pl-0 lg:pl-2">
            <a
              href="https://dribbble.com/goosetea"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 bg-[#ea4c89] hover:bg-[#d63384] rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Visit my Dribbble profile"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"/>
              </svg>
            </a>
            
            <a
              href="https://linkedin.com/in/gustirais"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 bg-[#0077b5] hover:bg-[#005885] rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Visit my LinkedIn profile"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a
              href="https://github.com/goosetea04"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 bg-[#333] hover:bg-[#24292e] rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Visit my GitHub profile"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
          
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