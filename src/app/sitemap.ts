import type { MetadataRoute } from 'next';
import { listWorks } from '@/lib/storage';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://site.innertalk.ru';
  const works = await listWorks({ publishedOnly: true });
  const staticPages = ['', '/services', '/works', '/about', '/contact'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.7,
  }));
  const workPages = works.map((w) => ({
    url: `${base}/works/${w.slug}`,
    lastModified: new Date(w.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  return [...staticPages, ...workPages];
}
