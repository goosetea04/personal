import { HeroImage } from "./HeroImage";
import { HeroCTA } from "./HeroCTA";
import { HeroText } from "./HeroText";

export const Hero = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center md:flex-row px-6 md:px-20 py-24">
      <div className="md:w-1/2">
        <HeroText />
        <HeroCTA />
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0">
        <HeroImage />
      </div>
    </div>
  );
};
