import Image from "next/image";
import { Hero } from "@/components/hero/Hero";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center bg-gradient-to-b from-white to-gray-100">
        <Hero />
        <TechStack />
        <TechStack />
      </div>
      {/* More sections like About, Projects, Contact */}
    </>
  );
}