"use client";

import Header from "@/components/Header";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex flex-col">
      <Header />
      <About />
    </div>
  );
}
