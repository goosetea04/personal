"use client";

import Header from "@/components/Header";
import Resume from "@/components/Resume";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex flex-col">
      <Header />
      <Resume />
    </div>
  );
}
