import fs from 'node:fs/promises';
import path from 'node:path';

export type Work = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  tags: string[];
  coverUrl: string;
  images: { url: string; alt?: string }[];
  published: boolean;
  order: number;
  createdAt: string;
};

const STORAGE_ROOT = process.env.SITE_STORAGE_ROOT || path.join(process.cwd(), 'storage');
const WORKS_JSON = path.join(STORAGE_ROOT, 'works.json');
const WORKS_DIR = path.join(STORAGE_ROOT, 'works');

async function ensureDirs() {
  await fs.mkdir(STORAGE_ROOT, { recursive: true });
  await fs.mkdir(WORKS_DIR, { recursive: true });
}

export async function listWorks(opts: { publishedOnly?: boolean } = {}): Promise<Work[]> {
  await ensureDirs();
  try {
    const raw = await fs.readFile(WORKS_JSON, 'utf-8');
    const all = JSON.parse(raw) as Work[];
    const filtered = opts.publishedOnly ? all.filter((w) => w.published) : all;
    return filtered.sort((a, b) => a.order - b.order || b.createdAt.localeCompare(a.createdAt));
  } catch (err: any) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const all = await listWorks();
  return all.find((w) => w.slug === slug) ?? null;
}

export async function getWorkById(id: string): Promise<Work | null> {
  const all = await listWorks();
  return all.find((w) => w.id === id) ?? null;
}

export async function saveWorks(works: Work[]) {
  await ensureDirs();
  await fs.writeFile(WORKS_JSON, JSON.stringify(works, null, 2), 'utf-8');
}

export async function upsertWork(work: Work) {
  const all = await listWorks();
  const idx = all.findIndex((w) => w.id === work.id);
  if (idx >= 0) all[idx] = work;
  else all.push(work);
  await saveWorks(all);
}

export async function deleteWork(id: string) {
  const all = await listWorks();
  const remaining = all.filter((w) => w.id !== id);
  await saveWorks(remaining);
  const workDir = path.join(WORKS_DIR, id);
  await fs.rm(workDir, { recursive: true, force: true });
}

export function slugify(s: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  };
  return s
    .toLowerCase()
    .trim()
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getStoragePaths() {
  return { root: STORAGE_ROOT, works: WORKS_DIR, worksJson: WORKS_JSON };
}
