import Image from "next/image";
import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <Hero />
      </div>
      {/* More sections like About, Projects, Contact */}
    </>
  );
}