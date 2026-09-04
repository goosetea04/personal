import type { MetadataRoute } from 'next';

const BASE_URL = 'https://gustirais.com';
const ROUTES = ['', '/about', '/resume', '/projects', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
