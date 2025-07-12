import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#032221] text-[#2cc295] px-6 py-4 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="text-sm mb-4 md:mb-0 text-[#2cc295]">&copy; {new Date().getFullYear()} Gusti Rais. All rights reserved.</p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-xl">
          <a href="https://github.com/goosetea04" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="hover:text-emerald-500 transition-colors duration-200" />
          </a>
          <a href="https://linkedin.com/in/gustirais" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="hover:text-emerald-500 transition-colors duration-200" />
          </a>
          <a href="https://dribbble.com/goosetea" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
            <FaDribbble className="hover:text-emerald-500 transition-colors duration-200" />
          </a>
          <a href="mailto:gusti.fatu@gmail.com" aria-label="Email">
            <FaEnvelope className="hover:text-emerald-500 transition-colors duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
