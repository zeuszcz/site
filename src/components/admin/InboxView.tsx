'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Calendar, MessageSquare, Users, Copy, ExternalLink, X, ChevronDown } from 'lucide-react';
import type { Brief, Booking, Message, Subscriber } from '@/lib/inbox';

type Props = {
  data: {
    briefs: Brief[];
    bookings: Booking[];
    messages: Message[];
    subscribers: Subscriber[];
  };
};

type Tab = 'briefs' | 'bookings' | 'messages' | 'subscribers';

const TABS: { id: Tab; label: string; icon: typeof Mail }[] = [
  { id: 'briefs',      label: 'Брифы',        icon: MessageSquare },
  { id: 'bookings',    label: 'Созвоны',      icon: Calendar },
  { id: 'messages',    label: 'Сообщения',    icon: Mail },
  { id: 'subscribers', label: 'Подписчики',   icon: Users },
];

export default function InboxView({ data }: Props) {
  const [tab, setTab] = useState<Tab>('briefs');
  const [search, setSearch] = useState('');

  const counts = {
    briefs: data.briefs.length,
    bookings: data.bookings.length,
    messages: data.messages.length,
    subscribers: data.subscribers.length,
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden mb-10">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSearch(''); }}
              className={`bg-surface p-5 md:p-6 text-left transition-colors ${active ? 'bg-surface2' : 'hover:bg-surface2/50'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${active ? 'bg-fg text-bg' : 'bg-surface2 text-muted'}`}>
                  <Icon size={15} strokeWidth={1.5} />
                </div>
                {active && <div className="h-1.5 w-1.5 rounded-full bg-fg" />}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-1">{t.label}</div>
              <div className="h-display text-3xl md:text-4xl tabular-nums">{counts[t.id]}</div>
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex items-center gap-3 border-b border-line focus-within:border-fg transition-colors py-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по email, имени, компании..."
          className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-muted"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-muted hover:text-fg">
            <X size={14} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {tab === 'briefs'      && <BriefsList     items={filterByText(data.briefs,     search, ['name', 'email', 'company', 'goal', 'type'])} />}
      {tab === 'bookings'    && <BookingsList   items={filterByText(data.bookings,   search, ['name', 'email', 'company', 'topic'])} />}
      {tab === 'messages'    && <MessagesList   items={filterByText(data.messages,   search, ['name', 'email', 'message'])} />}
      {tab === 'subscribers' && <SubscribersList items={filterByText(data.subscribers, search, ['email'])} />}
    </div>
  );
}

function filterByText<T extends Record<string, any>>(items: T[], q: string, fields: (keyof T)[]) {
  const query = q.trim().toLowerCase();
  if (!query) return items;
  return items.filter((it) => fields.some((f) => String(it[f] ?? '').toLowerCase().includes(query)));
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted hover:text-fg transition-colors"
      title={`Copy ${label}`}
    >
      <Copy size={12} strokeWidth={1.5} />
      {copied ? 'скопировано' : label}
    </button>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="py-24 text-center text-muted border border-dashed border-line rounded-2xl">{text}</div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-muted bg-surface2 border border-line rounded-full px-2.5 py-1">
      {children}
    </span>
  );
}

function BriefsList({ items }: { items: Brief[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (items.length === 0) return <Empty text="Брифов пока нет" />;
  return (
    <div className="flex flex-col divide-y divide-line border border-line rounded-2xl overflow-hidden">
      {items.map((b) => {
        const isOpen = open === b.id;
        return (
          <div key={b.id} className="bg-surface">
            <button
              onClick={() => setOpen(isOpen ? null : b.id)}
              className="w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-[140px_1fr_160px_40px] gap-4 p-5 items-center text-left transition-colors hover:bg-surface2/60"
            >
              <div className="font-mono text-[11px] text-muted">{fmtDate(b.createdAt)}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[15px] truncate">{b.name}</span>
                  <span className="text-muted text-[13px] truncate">· {b.company}</span>
                </div>
                <div className="text-[12px] text-muted truncate">{b.email}</div>
              </div>
              <div className="hidden md:flex flex-wrap gap-1 justify-end">
                <Badge>{b.type}</Badge>
                {b.budget && <Badge>{b.budget.replace(/\s+/g, ' ').slice(0, 14)}</Badge>}
              </div>
              <ChevronDown size={16} strokeWidth={1.5} className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden bg-surface2"
                >
                  <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono mb-3">Задача</div>
                      <p className="text-[15px] leading-[1.6] whitespace-pre-wrap">{b.goal}</p>
                    </div>
                    <div className="space-y-4">
                      <KV label="Тип проекта" value={b.type} />
                      <KV label="Сроки" value={b.timeline || '—'} />
                      <KV label="Бюджет" value={b.budget || '—'} />
                      <KV label="Компания" value={b.company} />
                      {b.website && (
                        <KV label="Сайт" value={
                          <a href={b.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-fg hover:text-muted underline underline-offset-4">
                            {b.website} <ExternalLink size={11} strokeWidth={1.5} />
                          </a>
                        } />
                      )}
                      <KV label="Email" value={
                        <span className="flex items-center gap-3">
                          <a href={`mailto:${b.email}?subject=${encodeURIComponent('По поводу вашего брифа — Innertalk Studio')}`} className="text-fg underline underline-offset-4">{b.email}</a>
                          <CopyBtn text={b.email} label="copy" />
                        </span>
                      } />
                      {b.phone && <KV label="Телефон / TG" value={b.phone} />}
                      <div className="pt-2 flex flex-wrap gap-2">
                        <a
                          href={`mailto:${b.email}?subject=${encodeURIComponent('По поводу вашего брифа — Innertalk Studio')}`}
                          className="btn-primary text-[12px] py-2.5 px-5"
                        >
                          Ответить по почте
                        </a>
                        <CopyBtn text={JSON.stringify(b, null, 2)} label="copy json" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function BookingsList({ items }: { items: Booking[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (items.length === 0) return <Empty text="Созвонов пока нет" />;
  return (
    <div className="flex flex-col divide-y divide-line border border-line rounded-2xl overflow-hidden">
      {items.map((b) => {
        const isOpen = open === b.id;
        const day = new Date(b.day);
        const dayStr = day.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', weekday: 'short' });
        return (
          <div key={b.id} className="bg-surface">
            <button
              onClick={() => setOpen(isOpen ? null : b.id)}
              className="w-full grid grid-cols-[auto_1fr_auto_40px] gap-4 p-5 items-center text-left transition-colors hover:bg-surface2/60"
            >
              <div>
                <div className="h-display text-2xl leading-none">{b.slot}</div>
                <div className="text-[11px] text-muted font-mono mt-1">{dayStr}</div>
              </div>
              <div className="min-w-0">
                <div className="font-medium text-[15px] truncate">{b.name}</div>
                <div className="text-[12px] text-muted truncate">{b.company || '—'} · {b.email}</div>
              </div>
              <div className="hidden md:block font-mono text-[11px] text-muted whitespace-nowrap">Создан: {fmtDate(b.createdAt)}</div>
              <ChevronDown size={16} strokeWidth={1.5} className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden bg-surface2"
                >
                  <div className="p-6 md:p-8 space-y-4">
                    <KV label="Время" value={<span className="font-medium">{dayStr}, {b.slot} Мск · 30 минут · Google Meet</span>} />
                    <KV label="Контакт" value={
                      <span className="flex items-center gap-3">
                        <a href={`mailto:${b.email}`} className="text-fg underline underline-offset-4">{b.email}</a>
                        <CopyBtn text={b.email} label="copy" />
                      </span>
                    } />
                    <KV label="Компания" value={b.company || '—'} />
                    {b.topic && <KV label="О чём" value={<span className="whitespace-pre-wrap">{b.topic}</span>} />}
                    <div className="pt-3 flex flex-wrap gap-2">
                      <a
                        href={`mailto:${b.email}?subject=${encodeURIComponent(`Подтверждение созвона ${dayStr}, ${b.slot}`)}`}
                        className="btn-primary text-[12px] py-2.5 px-5"
                      >
                        Отправить подтверждение
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function MessagesList({ items }: { items: Message[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (items.length === 0) return <Empty text="Сообщений с формы пока нет" />;
  return (
    <div className="flex flex-col divide-y divide-line border border-line rounded-2xl overflow-hidden">
      {items.map((m) => {
        const isOpen = open === m.id;
        return (
          <div key={m.id} className="bg-surface">
            <button
              onClick={() => setOpen(isOpen ? null : m.id)}
              className="w-full grid grid-cols-[120px_1fr_40px] gap-4 p-5 items-start text-left transition-colors hover:bg-surface2/60"
            >
              <div className="font-mono text-[11px] text-muted pt-1">{fmtDate(m.createdAt)}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[15px]">{m.name}</span>
                  <span className="text-muted text-[13px]">· {m.email}</span>
                </div>
                <div className="text-[13px] text-muted line-clamp-2">{m.message}</div>
              </div>
              <ChevronDown size={16} strokeWidth={1.5} className={`text-muted transition-transform mt-1 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden bg-surface2"
                >
                  <div className="p-6 md:p-8 space-y-4">
                    <p className="text-[15px] leading-[1.6] whitespace-pre-wrap">{m.message}</p>
                    <KV label="Контакт" value={
                      <span className="flex items-center gap-3">
                        <a href={`mailto:${m.email}`} className="text-fg underline underline-offset-4">{m.email}</a>
                        <CopyBtn text={m.email} label="copy" />
                      </span>
                    } />
                    {m.phone && <KV label="Телефон" value={m.phone} />}
                    <div className="pt-2">
                      <a href={`mailto:${m.email}`} className="btn-primary text-[12px] py-2.5 px-5">Ответить</a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function SubscribersList({ items }: { items: Subscriber[] }) {
  if (items.length === 0) return <Empty text="Подписчиков пока нет" />;
  const emails = items.map((i) => i.email).join(', ');
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="text-[13px] text-muted">
          Всего: <span className="text-fg">{items.length}</span>
        </div>
        <CopyBtn text={emails} label="copy all emails" />
      </div>
      <div className="flex flex-col divide-y divide-line border border-line rounded-2xl overflow-hidden">
        {items.map((s) => (
          <div key={s.id} className="bg-surface p-4 px-5 grid grid-cols-[1fr_auto_auto] gap-4 items-center">
            <a href={`mailto:${s.email}`} className="text-[15px] hover:text-muted truncate">{s.email}</a>
            <div className="font-mono text-[11px] text-muted">{fmtDate(s.createdAt)}</div>
            <CopyBtn text={s.email} label="copy" />
          </div>
        ))}
      </div>
    </div>
  );
}

function KV({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 items-baseline">
      <div className="text-[11px] uppercase tracking-[0.25em] font-mono text-muted">{label}</div>
      <div className="text-[14px]">{value}</div>
    </div>
  );
}
