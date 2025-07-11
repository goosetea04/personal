// page.tsx
"use client";

import { useRouter } from "next/navigation";

const games = [
  {
    slug: "game1",
    title: "Adventure Quest",
    description: "Embark on an epic journey full of quests and treasures.",
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🎮 Game Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {games.map((game) => (
          <div
            key={game.slug}
            onClick={() => router.push(`/${game.slug}`)}
            className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {game.title}
            </h2>
            <p className="text-gray-600">{game.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
