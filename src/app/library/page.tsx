// page.tsx
"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import HeroBackground from "@/components/HeroBackground";

const games = [
  {
    slug: "game1",
    title: "Three.js Snake",
    description: "The classic game you know and love :)",
  },
  {
    slug: "game2",
    title: "Pixel Platformer",
    description: "Jump, run, and dodge obstacles in this retro adventure.",
  },
];

export default function GameLibrary() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col bg-[#2cc295]">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <HeroBackground />
        <div className="w-full max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-[#06302b] text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide mb-4" style={{ fontFamily: 'var(--font-nimbus-sans), sans-serif' }}>
              Game
            </h1>
            <h1 className="text-[#06302b] text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-nimbus-sans), sans-serif' }}>
              Library
            </h1>
            <p className="text-[#06302b] text-xl md:text-2xl font-medium font-nimbus mt-8 leading-relaxed">
              I have loved making games in c++, lua, and Javascript. Try out some Javascript games I made below!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game) => (
              <div
                key={game.slug}
                onClick={() => router.push(`/${game.slug}`)}
                className="cursor-pointer bg-[#06302b] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-[#095544] hover:border-[#2cc295] transform hover:scale-105"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2cc295] uppercase tracking-wide" style={{ fontFamily: 'var(--font-nimbus-sans), sans-serif' }}>
                  {game.title}
                </h2>
                <p className="text-[#2cc295] text-lg font-medium leading-relaxed opacity-90">
                  {game.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}