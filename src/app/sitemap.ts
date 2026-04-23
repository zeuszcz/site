import type { MetadataRoute } from 'next';
import { listWorks } from '@/lib/storage';
import { insights } from '@/lib/content';
import { positions } from '@/lib/careers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://site.innertalk.ru';
  const works = await listWorks({ publishedOnly: true });
  const staticPages = ['', '/services', '/works', '/insights', '/about', '/careers', '/contact', '/start', '/book']
    .map((p) => ({
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
  const insightPages = insights.map((i) => ({
    url: `${base}/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));
  const careerPages = positions.map((p) => ({
    url: `${base}/careers/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));
  return [...staticPages, ...workPages, ...insightPages, ...careerPages];
}
