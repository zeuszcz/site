import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const STORAGE_ROOT = process.env.SITE_STORAGE_ROOT || path.join(process.cwd(), 'storage');
const LOG = path.join(STORAGE_ROOT, 'newsletter.jsonl');

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'invalid json' }, { status: 400 }); }

  const email = String(body?.email || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Некорректный email' }, { status: 400 });
  }

  await fs.mkdir(STORAGE_ROOT, { recursive: true });
  try {
    const raw = await fs.readFile(LOG, 'utf-8');
    if (raw.split('\n').some((l) => l.includes(`"email":"${email}"`))) {
      return NextResponse.json({ ok: true, already: true });
    }
  } catch (err: any) {
    if (err.code !== 'ENOENT') throw err;
  }

  const entry = {
    id: crypto.randomUUID(),
    email,
    createdAt: new Date().toISOString(),
    ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
  };
  await fs.appendFile(LOG, JSON.stringify(entry) + '\n', 'utf-8');
  return NextResponse.json({ ok: true });
}
