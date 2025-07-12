import { HeroImage } from "./HeroImage";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex md:px-20">
      {/* Left Side */}
      <div className="w-1/2 relative z-10 flex flex-col justify-end pb-24">
        <div className="space-y-2">
          <p className="text-white text-xl md:text-2xl font-light">Hi I'm</p>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide">
            Gusti Rais
          </h1>
        </div>
      </div>
      
      {/* Right Side */}
      <div className="w-1/2 relative z-10 flex items-center justify-center">
        <HeroImage />
      </div>
    </div>
  );
};