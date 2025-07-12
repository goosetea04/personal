import Image from "next/image";
import { Hero } from "@/components/hero/Hero";
import TechStack from "@/components/techstack/TechStack";
import Header from "@/components/Header";
import About from "@/components/About";
import { Email } from "@/components/Email";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[#2cc295]">
        <Hero />
        <Header />
        <About />
        <TechStack />
        <Email />
      </div>
      {/* More sections like About, Projects, Contact */}
    </>
  );
}