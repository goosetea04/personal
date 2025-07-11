import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Gusti Rais All rights reserved.</p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-xl">
          <a href="https://github.com/goosetea04" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="hover:text-emerald-700 transition-colors duration-200" />
          </a>
          <a href="https://linkedin.com/in/gustirais" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="hover:text-emerald-700 transition-colors duration-200" />
          </a>
          <a href="https://dribbble.com/goosetea" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaDribbble className="hover:text-emerald-700 transition-colors duration-200" />
          </a>
          <a href="mailto:gusti.fatu@gmail.com" aria-label="Email">
            <FaEnvelope className="hover:text-emerald-700 transition-colors duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
