import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mt-12 mb-6 first:mt-0 border-b-4 border-[#39ff14] pb-2 inline-block">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-bold text-[#39ff14] mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[#e0ffe8]/90 leading-relaxed mb-5">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="text-[#39ff14] underline decoration-2 underline-offset-2 hover:text-white transition-colors"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-[#e0ffe8]/90 marker:text-[#39ff14]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-[#e0ffe8]/90 marker:text-[#39ff14]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#39ff14] pl-4 my-6 italic text-[#e0ffe8]/70">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-[#03120b] text-[#39ff14] px-1.5 py-0.5 border border-[#39ff14]/30">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="font-mono text-sm bg-[#03120b] border-2 border-[#39ff14]/40 p-4 mb-6 overflow-x-auto text-[#e0ffe8]">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-t-2 border-[#39ff14]/30 my-10" />,
  strong: ({ children }) => (
    <strong className="font-black text-white">{children}</strong>
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="w-full h-auto border-2 border-[#39ff14]/40 my-6" {...props} alt={props.alt ?? ""} />
  ),
};

export function useMDXComponents(existingComponents: MDXComponents): MDXComponents {
  return {
    ...existingComponents,
    ...components,
  };
}
