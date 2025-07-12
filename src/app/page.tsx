import Image from "next/image";
import { Hero } from "@/components/hero/Hero";
import TechStack from "@/components/TechStack";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center bg-[#2cc295]">
        <Hero />
        <Header />
        <TechStack />
        <TechStack />
      </div>
      {/* More sections like About, Projects, Contact */}
    </>
  );
}