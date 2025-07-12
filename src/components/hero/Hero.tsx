import { HeroImage } from "./HeroImage";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] flex sm:px-6">
      {/* Left Side */}
      <div className="w-1/2 relative z-10 flex flex-col justify-end pb-24">
        <div className="space-y-2">
          <p className="text-[#095544] text-xl pl-2 sm:text-2xl md:text-4xl font-bold font-nimbus">Hi I'm</p>
          <h1 className="text-[#06302b] text-6xl md:text-7xl lg:text-9xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-nimbus-sans), sans-serif' }}>
            Gusti
          </h1>
          <h1 className="text-[#06302b] text-6xl md:text-7xl lg:text-9xl font-bold uppercase tracking-wide pb-2" style={{ fontFamily: 'var(--font-nimbus-sans), sans-serif' }}>
            Rais
          </h1>
          <p className="text-[#095544] text-xl pl-2 sm:text-xl md:text-3xl font-medium font-nimbus leading-relaxed">
            I love creating things! From applications, research, branding and games, I love to make it all. Stay awhile and see what I have to offer. Play games to enhjoy your stay as well!
          </p>
        </div>
      </div>
      
      {/* Right Side */}
      <div className="w-1/2 relative z-10 flex items-center justify-center">
        <HeroImage />
      </div>
    </div>
  );
};