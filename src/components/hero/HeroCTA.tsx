import Link from "next/link";

export const HeroCTA = () => {
  return (
    <div className="mt-8 flex justify-center md:justify-start gap-4">
      <Link href="#projects">
        <p className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-md">
          See My Work
        </p>
      </Link>
      <Link href="#contact">
        <p className="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-gray-500 hover:text-gray-900 transition-all">
          Get in Touch
        </p>
      </Link>
    </div>
  );
};
