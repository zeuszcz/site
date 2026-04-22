import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { listWorks, upsertWork, deleteWork, getWorkById, slugify, getStoragePaths, type Work } from '@/lib/storage';

export const runtime = 'nodejs';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const MAX_SIZE = 25 * 1024 * 1024;

async function saveImage(file: File, workId: string, name: string) {
  if (!ALLOWED_MIME.has(file.type)) throw new Error(`unsupported mime: ${file.type}`);
  if (file.size > MAX_SIZE) throw new Error('file too large (max 25MB)');

  const { works: worksDir } = getStoragePaths();
  const dir = path.join(worksDir, workId);
  await fs.mkdir(dir, { recursive: true });

  const buf = Buffer.from(await file.arrayBuffer());
  const outName = `${name}.webp`;
  const outPath = path.join(dir, outName);

  await sharp(buf)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(outPath);

  return `/api/media/${workId}/${outName}`;
}

function pickTags(raw: unknown): string[] {
  if (typeof raw !== 'string') return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 20);
}

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();
    const title = String(fd.get('title') || '').trim();
    if (!title) return NextResponse.json({ error: 'title required' }, { status: 400 });

    let slug = String(fd.get('slug') || '').trim();
    if (!slug) slug = slugify(title);
    slug = slugify(slug);
    if (!slug) return NextResponse.json({ error: 'invalid slug' }, { status: 400 });

    const existing = await listWorks();
    if (existing.some((w) => w.slug === slug)) {
      return NextResponse.json({ error: 'slug already exists' }, { status: 409 });
    }

    const id = crypto.randomUUID();
    const coverFile = fd.get('cover') as File | null;
    const coverUrl = coverFile && coverFile.size > 0 ? await saveImage(coverFile, id, 'cover') : '';

    const imageFiles = fd.getAll('images') as File[];
    const images: Work['images'] = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const f = imageFiles[i];
      if (f && f.size > 0) {
        const url = await saveImage(f, id, `img-${i + 1}`);
        images.push({ url });
      }
    }

    const work: Work = {
      id,
      slug,
      title,
      excerpt: String(fd.get('excerpt') || '').trim(),
      description: String(fd.get('description') || '').trim(),
      category: String(fd.get('category') || '').trim(),
      tags: pickTags(fd.get('tags')),
      coverUrl,
      images,
      published: fd.get('published') === '1',
      order: existing.length,
      createdAt: new Date().toISOString(),
    };

    await upsertWork(work);
    return NextResponse.json({ ok: true, id, slug });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'internal error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const existing = await getWorkById(id);
    if (!existing) return NextResponse.json({ error: 'not found' }, { status: 404 });

    const fd = await req.formData();
    const title = String(fd.get('title') || '').trim() || existing.title;
    let slug = String(fd.get('slug') || '').trim() || existing.slug;
    slug = slugify(slug);

    const others = (await listWorks()).filter((w) => w.id !== id);
    if (others.some((w) => w.slug === slug)) {
      return NextResponse.json({ error: 'slug already exists' }, { status: 409 });
    }

    const coverFile = fd.get('cover') as File | null;
    const coverUrl = coverFile && coverFile.size > 0 ? await saveImage(coverFile, id, 'cover') : existing.coverUrl;

    const imageFiles = (fd.getAll('images') as File[]).filter((f) => f && f.size > 0);
    let images = existing.images;
    if (imageFiles.length > 0) {
      const newOnes: Work['images'] = [];
      for (let i = 0; i < imageFiles.length; i++) {
        const url = await saveImage(imageFiles[i], id, `img-${Date.now()}-${i}`);
        newOnes.push({ url });
      }
      images = [...existing.images, ...newOnes];
    }

    const updated: Work = {
      ...existing,
      title,
      slug,
      excerpt: String(fd.get('excerpt') || existing.excerpt),
      description: String(fd.get('description') || existing.description),
      category: String(fd.get('category') || existing.category),
      tags: fd.has('tags') ? pickTags(fd.get('tags')) : existing.tags,
      coverUrl,
      images,
      published: fd.get('published') === '1',
    };

    await upsertWork(updated);
    return NextResponse.json({ ok: true, id, slug });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'internal error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await deleteWork(id);
  return NextResponse.json({ ok: true });
}
