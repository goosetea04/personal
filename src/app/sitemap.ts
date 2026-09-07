import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://gustirais.com';
const ROUTES = ['', '/about', '/resume', '/projects', '/blog', '/contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return [
    ...ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
