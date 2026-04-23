import fs from 'node:fs/promises';
import path from 'node:path';

const STORAGE_ROOT = process.env.SITE_STORAGE_ROOT || path.join(process.cwd(), 'storage');

export type Brief = {
  id: string;
  createdAt: string;
  type: string;
  goal: string;
  timeline: string;
  budget: string;
  company: string;
  website: string;
  name: string;
  email: string;
  phone: string;
  ip?: string;
  ua?: string;
};

export type Booking = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  topic: string;
  day: string;
  slot: string;
  ip?: string;
};

export type Message = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  ip?: string;
};

export type Subscriber = {
  id: string;
  email: string;
  createdAt: string;
  ip?: string;
};

async function readJsonl<T>(filename: string): Promise<T[]> {
  const fp = path.join(STORAGE_ROOT, filename);
  try {
    const raw = await fs.readFile(fp, 'utf-8');
    return raw
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => JSON.parse(l) as T);
  } catch (err: any) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

function byCreatedDesc(a: { createdAt: string }, b: { createdAt: string }) {
  return b.createdAt.localeCompare(a.createdAt);
}

export async function getBriefs(): Promise<Brief[]> {
  const list = await readJsonl<Brief>('briefs.jsonl');
  return list.sort(byCreatedDesc);
}
export async function getBookings(): Promise<Booking[]> {
  const list = await readJsonl<Booking>('bookings.jsonl');
  return list.sort(byCreatedDesc);
}
export async function getMessages(): Promise<Message[]> {
  const list = await readJsonl<Message>('messages.jsonl');
  return list.sort(byCreatedDesc);
}
export async function getSubscribers(): Promise<Subscriber[]> {
  const list = await readJsonl<Subscriber>('newsletter.jsonl');
  return list.sort(byCreatedDesc);
}

export async function getInbox() {
  const [briefs, bookings, messages, subscribers] = await Promise.all([
    getBriefs(),
    getBookings(),
    getMessages(),
    getSubscribers(),
  ]);
  return { briefs, bookings, messages, subscribers };
}
