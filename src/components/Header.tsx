// components/Header.tsx

import React from "react";
import Link from "next/link";

import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 shadow-md bg-[#032221]">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        <Image
                src="/gust-1.svg"
                alt="Profile"
                width={50}
                height={50}
                className="rounded-none object-cover"
              />
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-6 text-[#2cc295] text-lg">
          <li>
            <Link href="about">About</Link>
          </li>
          <li>
            <Link href="blog">Blog</Link>
          </li>
          <li>
            <Link href="portfolio">Portfolio</Link>
          </li>
          <li>
            <Link href="resume">Resume</Link>
          </li>
          <li>
            <Link href="library">Games!</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;