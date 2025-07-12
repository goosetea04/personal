import React from "react";
import Header from "@/components/Header";
import { projects } from "@/components/portfolio/Projectlist";
import { Portfolio } from "@/components/portfolio/Projects";

export default function PortfolioPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[#2cc295]">
      <Header />
      <Portfolio projects={projects} />
    </main>
  );
}