import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Terminal } from "lucide-react";
import { getPostSlugs, getPostMeta } from "@/lib/blog";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const meta = await getPostMeta(slug);
    return {
      title: meta.title,
      description: meta.description,
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let Post, meta;
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    Post = mod.default;
    meta = mod.metadata;
  } catch {
    notFound();
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center p-4 pt-20 pb-20">
      <article className="w-full max-w-3xl mx-auto px-4">
        <Link href="/blog" className="group inline-flex items-center gap-3 mb-10">
          <div className="bg-[#03120b] border-2 border-white/20 group-hover:border-[#39ff14] px-3 py-1.5 -skew-x-12 transition-colors">
            <span className="block skew-x-12 font-black text-[10px] tracking-[0.25em] uppercase text-white/50 group-hover:text-[#39ff14] transition-colors">
              Back
            </span>
          </div>
          <div className="w-7 h-7 rounded-full bg-black border-2 border-white/20 group-hover:border-[#39ff14] flex items-center justify-center transition-all duration-300 group-hover:rotate-180">
            <ArrowLeft className="w-3.5 h-3.5 text-white/50 group-hover:text-[#39ff14] transition-colors" />
          </div>
        </Link>

        {/* Title bar, matches the home menu's skewed black/green bars */}
        <div className="inline-block transform -rotate-2 mb-4 animate-slam">
          <div className="px-5 py-2.5 mb-8 md:px-7 md:py-3 -skew-x-12 bg-[#03120b] border-2 md:border-4 border-[#39ff14] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)]">
            <h1 className="skew-x-12 font-black text-2xl md:text-4xl tracking-tighter italic text-white uppercase">
              {meta.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          <div className="-skew-x-12 bg-[#03120b] border-2 border-[#39ff14]/60 px-3 py-1">
            <div className="skew-x-12 flex items-center gap-2">
              <Terminal size={11} className="text-[#39ff14]" />
              <span className="font-black text-[10px] tracking-[0.2em] text-[#e0ffe8]/80 uppercase">
                {new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          {meta.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 py-1 -skew-x-3 border-2 border-white/20 text-[9px] font-black tracking-[0.15em] uppercase text-[#39ff14]/70"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div>
          <Post />
        </div>
      </article>
    </div>
  );
}
