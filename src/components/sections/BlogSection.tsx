import Link from "next/link";
import { Terminal, Sparkles } from "lucide-react";
import type { Post } from "@/lib/blog";

export const BlogSection = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center p-4 pt-20 pb-20">
      <div className="relative mb-2 transform -rotate-3">
        <h2
          className="glitch-text text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic animate-slam"
          data-text="BLOG"
        >
          BLOG
        </h2>
      </div>
      <div className="w-40 h-1.5 bg-[#39ff14] transform -rotate-3 mb-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]" />

      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col gap-6">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-[#39ff14]/20 font-black text-7xl tracking-tighter">??</div>
            <p className="font-black text-white/30 text-sm tracking-[0.3em] uppercase">
              NO_POSTS_YET
            </p>
          </div>
        ) : (
          posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative block"
              style={{
                animation: "slide-up-stagger 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                animationDelay: `${0.05 + i * 0.07}s`,
                opacity: 0,
              }}
            >
              {/* Hover star, echoes the home menu's hover sparkle */}
              <div className="hidden md:block absolute -left-10 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-180">
                <Sparkles className="w-7 h-7 text-[#39ff14] fill-[#39ff14]" />
              </div>

              <div className="bg-zinc-900 border-2 border-white/20 transform -skew-x-2 transition-all duration-200 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] group-hover:border-[#39ff14] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[8px_8px_0px_0px_rgba(57,255,20,0.35)]">
                <div className="transform skew-x-2">
                  <div className="flex items-center justify-between mb-4">
                    {/* Date HUD chip */}
                    <div className="-skew-x-12 bg-[#03120b] border-2 border-[#39ff14]/60 group-hover:border-[#39ff14] px-3 py-1 transition-colors">
                      <div className="skew-x-12 flex items-center gap-2">
                        <Terminal size={11} className="text-[#39ff14]" />
                        <span className="font-black text-[10px] tracking-[0.2em] text-[#e0ffe8]/80 uppercase">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <span className="px-2.5 py-1 -skew-x-3 border-2 border-white/20 group-hover:border-[#39ff14]/50 text-[9px] font-black tracking-[0.15em] uppercase text-white/40 group-hover:text-[#39ff14]/70 transition-colors">
                        #{post.tags[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#39ff14] transition-colors italic">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm font-bold leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  <span className="inline-block mt-4 text-[10px] font-black text-[#39ff14] tracking-[0.2em] uppercase bg-[#39ff14]/10 px-2 py-1 group-hover:bg-[#39ff14] group-hover:text-black transition-colors">
                    [ READ_POST ]
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
