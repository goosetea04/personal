"use client";

import Header from "@/components/Header";
import About from "@/components/About";
import Background from "@/components/Background";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex flex-col">
      <Background />
      <Header />
      <About />
    </div>
  );
}
