import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  slug: string;
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPostMeta(slug: string): Promise<PostMeta> {
  const mod = await import(`@/content/blog/${slug}.mdx`);
  return mod.metadata as PostMeta;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => ({ slug, ...(await getPostMeta(slug)) }))
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
