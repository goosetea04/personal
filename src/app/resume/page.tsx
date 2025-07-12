import React from "react";
import Header from "@/components/Header";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[#2cc295]">
      <Header />
      <div className="flex flex-col items-center p-8 bg-[#2cc295] rounded-xl ">
        <div className="relative w-32 h-32 mb-6">
          {/* Simple construction loader */}
          <div className="absolute inset-0 rounded-full border-4 border-[#aacbc4] border-t-transparent animate-spin"></div>
          <div className="absolute inset-4 flex items-center justify-center">
            🚧
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Coming Soon</h1>
        <p className="text-gray-600">My blog is under construction. Stay tuned!</p>
      </div>
    </main>
  );
}