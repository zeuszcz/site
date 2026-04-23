import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const STORAGE_ROOT = process.env.SITE_STORAGE_ROOT || path.join(process.cwd(), 'storage');
const LOG = path.join(STORAGE_ROOT, 'bookings.jsonl');

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'invalid json' }, { status: 400 }); }

  const { name, email, company, topic, day, slot } = body || {};
  if (!name || !email || !day || !slot) return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  if (!/^\d{2}:\d{2}$/.test(slot)) return NextResponse.json({ error: 'invalid slot' }, { status: 400 });
  const dayDate = new Date(day);
  if (Number.isNaN(dayDate.getTime())) return NextResponse.json({ error: 'invalid day' }, { status: 400 });

  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: String(name).slice(0, 100),
    email: String(email).slice(0, 200),
    company: String(company || '').slice(0, 200),
    topic: String(topic || '').slice(0, 1000),
    day: dayDate.toISOString(),
    slot,
    ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
  };

  await fs.mkdir(STORAGE_ROOT, { recursive: true });
  await fs.appendFile(LOG, JSON.stringify(entry) + '\n', 'utf-8');

  return NextResponse.json({ ok: true, id: entry.id });
}
