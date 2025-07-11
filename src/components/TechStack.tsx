"use client";

import React, { useState } from "react";
import Image from "next/image";

const techStacks = [
  {
    name: "Python",
    logo: "/logos/python.png",
    libraries: [
      { name: "Pandas", logo: "/logos/pandas.png" },
      { name: "NumPy", logo: "/logos/numpy.png" },
      { name: "Matplotlib", logo: "/logos/matplotlib.png" },
    ],
  },
  {
    name: "JavaScript",
    logo: "/logos/javascript.png",
    libraries: [
      { name: "Three.js", logo: "/logos/threejs.png" },
      { name: "Matter.js", logo: "/logos/matterjs.png" },
      { name: "React", logo: "/logos/react.png" },
    ],
  },
  {
    name: "TypeScript",
    logo: "/logos/typescript.png",
    libraries: [
      { name: "Next.js", logo: "/logos/nextjs.png" },
      { name: "Prisma", logo: "/logos/prisma.png" },
      { name: "tRPC", logo: "/logos/trpc.png" },
    ],
  },
  {
    name: "C#",
    logo: "/logos/csharp.png",
    libraries: [
      { name: "Unity", logo: "/logos/unity.png" },
      { name: ".NET Core", logo: "/logos/dotnet.png" },
      { name: "Entity Framework", logo: "/logos/efcore.png" },
    ],
  },
];

export default function TechStack() {
  const [selectedTech, setSelectedTech] = useState<null | typeof techStacks[0]>(
    null
  );

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold mb-6">🚀 Tech Stack</h2>
      <div className="flex flex-wrap gap-6 max-w-4xl justify-center">
        {techStacks.map((tech) => (
          <div
            key={tech.name}
            onClick={() => setSelectedTech(tech)}
            className={`cursor-pointer flex flex-col items-center px-6 py-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow w-40 ${
              !selectedTech ? "animate-bounce" : ""
            }`}
          >
            <div className="w-12 h-12 mb-3 relative">
              <Image
                src={tech.logo}
                alt={tech.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xl font-semibold text-gray-800">{tech.name}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTech && (
        <div
          className="fixed inset-0 flex items-center justify-center z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
        >
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative animate-fadeInUp">
            <h3 className="text-2xl font-bold mb-4">
              {selectedTech.name} Libraries I Have Used
            </h3>
            <ul className="space-y-4">
              {selectedTech.libraries.map((lib) => (
                <li
                  key={lib.name}
                  className="flex items-center gap-3 text-gray-700"
                >
                  {lib.logo && (
                    <div className="relative w-6 h-6">
                      <Image
                        src={lib.logo}
                        alt={lib.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {lib.name}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
