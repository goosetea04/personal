"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const Hero = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const items = [
    { label: "Applications", href: "/applications" },
    { label: "Research", href: "/research" },
    { label: "Branding", href: "/branding" },
    { label: "Games", href: "/games" },
    { label: "Play & Enjoy", href: "/play" },
  ];

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex sm:px-6">
      {/* Left Side */}
      <div className="w-1/2 relative z-10 flex flex-col justify-end pb-24">
        <div className="space-y-2">
          <p className="text-[#095544] text-xl pl-2 sm:text-2xl md:text-4xl font-bold font-nimbus">
            Hi I'm
          </p>
          <h1
            className="text-[#06302b] text-6xl md:text-7xl lg:text-9xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
          >
            Gusti
          </h1>
          <h1
            className="text-[#06302b] text-6xl md:text-7xl lg:text-9xl font-bold uppercase tracking-wide pb-2"
            style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
          >
            Rais
          </h1>
          <p className="text-[#095544] text-xl pl-2 sm:text-xl md:text-3xl font-medium font-nimbus leading-relaxed">
            I love creating things! From applications, research, branding and
            games, I love to make it all. Stay awhile and see what I have to
            offer. Play games to enjoy your stay as well!
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 relative z-10 flex flex-col justify-center items-end pr-12">
        <motion.ul
          initial="hidden"
          animate={controls}
          variants={listVariants}
          className="space-y-4 text-right"
        >
          {items.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="text-[#06302b] text-3xl md:text-5xl font-bold uppercase tracking-wide cursor-pointer relative group"
              style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
            >
              <Link href={item.href} className="relative inline-block">
                {item.label}
                <span className="absolute right-0 -bottom-1 w-0 h-[2px] bg-[#06302b] transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};
