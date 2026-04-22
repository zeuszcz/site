import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const STORAGE_ROOT = process.env.SITE_STORAGE_ROOT || path.join(process.cwd(), 'storage');
const LOG = path.join(STORAGE_ROOT, 'messages.jsonl');

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'invalid json' }, { status: 400 }); }

  const { name, email, phone, message } = body || {};
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'invalid fields' }, { status: 400 });
  }
  if (name.length < 2 || name.length > 100) return NextResponse.json({ error: 'name length' }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) return NextResponse.json({ error: 'email invalid' }, { status: 400 });
  if (message.length < 10 || message.length > 5000) return NextResponse.json({ error: 'message length' }, { status: 400 });
  if (phone && (typeof phone !== 'string' || phone.length > 30)) return NextResponse.json({ error: 'phone invalid' }, { status: 400 });

  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    message: message.trim(),
    ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
    ua: req.headers.get('user-agent') || '',
  };

  await fs.mkdir(STORAGE_ROOT, { recursive: true });
  await fs.appendFile(LOG, JSON.stringify(entry) + '\n', 'utf-8');

  return NextResponse.json({ ok: true, id: entry.id });
}
