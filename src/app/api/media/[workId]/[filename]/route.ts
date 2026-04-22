import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getStoragePaths } from '@/lib/storage';

export const runtime = 'nodejs';

const MIME: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.avif': 'image/avif',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ workId: string; filename: string }> }
) {
  const { workId, filename } = await params;
  if (!/^[a-f0-9-]+$/i.test(workId)) return new NextResponse('bad workId', { status: 400 });
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) return new NextResponse('bad filename', { status: 400 });

  const { works } = getStoragePaths();
  const fp = path.join(works, workId, filename);
  const rel = path.relative(works, fp);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return new NextResponse('forbidden', { status: 403 });

  try {
    const buf = await fs.readFile(fp);
    const ext = path.extname(filename).toLowerCase();
    const ct = MIME[ext] || 'application/octet-stream';
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'content-type': ct,
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('not found', { status: 404 });
  }
}
