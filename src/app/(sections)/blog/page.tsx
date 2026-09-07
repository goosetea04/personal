import type { Metadata } from "next";
import { BlogSection } from "@/components/sections/BlogSection";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writeups on projects, experiments, and things Gusti Rais has learned.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogSection posts={posts} />;
}
