import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const STORAGE_ROOT = process.env.SITE_STORAGE_ROOT || path.join(process.cwd(), 'storage');
const LOG = path.join(STORAGE_ROOT, 'briefs.jsonl');

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'invalid json' }, { status: 400 }); }

  const { type, goal, timeline, budget, company, website, name, email, phone } = body || {};
  if (!type || !goal || !company || !name || !email) {
    return NextResponse.json({ error: 'missing required fields' }, { status: 400 });
  }
  if (typeof goal !== 'string' || goal.length < 20 || goal.length > 3000) {
    return NextResponse.json({ error: 'invalid goal length' }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    type: String(type).slice(0, 50),
    goal: String(goal).slice(0, 3000),
    timeline: String(timeline || '').slice(0, 100),
    budget: String(budget || '').slice(0, 100),
    company: String(company).slice(0, 200),
    website: String(website || '').slice(0, 300),
    name: String(name).slice(0, 100),
    email: String(email).slice(0, 200),
    phone: String(phone || '').slice(0, 60),
    ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
    ua: req.headers.get('user-agent')?.slice(0, 500) || '',
  };

  await fs.mkdir(STORAGE_ROOT, { recursive: true });
  await fs.appendFile(LOG, JSON.stringify(entry) + '\n', 'utf-8');

  return NextResponse.json({ ok: true, id: entry.id });
}
