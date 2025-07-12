import { HeroImage } from "./HeroImage";
import { HeroCTA } from "./HeroCTA";
import { HeroText } from "./HeroText";
import { CursorHighlight } from "../CursorHighlight";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] max-w-7xl mx-auto flex flex-col items-center justify-center md:flex-row px-6 md:px-20 py-24">
      <CursorHighlight />
      <div className="md:w-1/2 relative z-10">
        <HeroText />
        <HeroCTA />
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0 relative z-10">
        <HeroImage />
      </div>
    </div>
  );
};
