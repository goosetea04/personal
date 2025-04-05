import { HeroImage } from "./HeroImage";
import { HeroCTA } from "./HeroCTA";
import { HeroText } from "./HeroText";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="md:w-1/2">
        <HeroText />
        <HeroCTA />
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0">
        <HeroImage />
      </div>
    </section>
  );
};
