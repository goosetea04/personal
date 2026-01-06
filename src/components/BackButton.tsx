import { ArrowLeft } from "lucide-react";
export const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group flex items-center gap-2"
  >
    <div className="bg-white text-black font-black text-sm md:text-xl px-3 md:px-4 py-1 transform skew-x-12 border-2 border-black group-hover:bg-[#39ff14] transition-colors duration-200">
      BACK
    </div>
    <div className="bg-black rounded-full p-2 border-2 border-white group-hover:border-[#39ff14] group-hover:rotate-180 transition-all duration-300">
      <ArrowLeft className="text-white group-hover:text-[#39ff14] w-4 h-4 md:w-6 md:h-6" />
    </div>
  </button>
);