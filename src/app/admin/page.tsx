import Link from 'next/link';
import { listWorks } from '@/lib/storage';
import { getInbox } from '@/lib/inbox';
import { Plus, FileText, Eye, Inbox, Calendar, Mail, Users, MessageSquare } from 'lucide-react';

export const metadata = { title: 'Админка' };
export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const [works, inbox] = await Promise.all([listWorks(), getInbox()]);
  const published = works.filter((w) => w.published).length;

  return (
    <div className="pt-32 pb-24">
      <div className="container-x">
        <span className="eyebrow">Админка</span>
        <h1 className="h-display mt-6 text-5xl md:text-7xl">Панель управления</h1>

        <section className="mt-14">
          <h2 className="eyebrow mb-6">Входящие</h2>
          <Link
            href="/admin/inbox"
            className="group grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden hover:border-fg/30 transition-colors"
          >
            <InboxStat icon={MessageSquare} label="Брифы"       value={inbox.briefs.length} />
            <InboxStat icon={Calendar}      label="Созвоны"     value={inbox.bookings.length} />
            <InboxStat icon={Mail}          label="Сообщения"   value={inbox.messages.length} />
            <InboxStat icon={Users}         label="Подписчики"  value={inbox.subscribers.length} />
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <Link href="/admin/inbox" className="inline-flex items-center gap-2 text-[13px] text-fg hover:text-muted transition-colors">
              <Inbox size={14} strokeWidth={1.5} />
              Открыть входящие
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="eyebrow mb-6">Портфолио</h2>
          <div className="grid md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            <StatCard label="Всего работ"    value={works.length} />
            <StatCard label="Опубликовано"   value={published} />
            <StatCard label="Черновики"      value={works.length - published} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/admin/works/new" className="btn-primary"><Plus size={16} strokeWidth={1.5}/> Добавить работу</Link>
            <Link href="/admin/works" className="btn-ghost"><FileText size={16} strokeWidth={1.5}/> Все работы</Link>
            <Link href="/" className="btn-ghost"><Eye size={16} strokeWidth={1.5}/> На сайт</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-surface p-10">
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted">{label}</div>
      <div className="h-display text-6xl text-fg mt-3 tabular-nums">{value}</div>
    </div>
  );
}

function InboxStat({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: number }) {
  return (
    <div className="bg-surface p-8 transition-colors group-hover:bg-olive-soft/40">
      <div className="flex items-start justify-between mb-6">
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors ${value > 0 ? 'bg-olive text-bg' : 'bg-surface2 text-muted'}`}>
          <Icon size={15} strokeWidth={1.5} />
        </div>
        {value > 0 && (
          <div className="font-mono text-[10px] uppercase tracking-widest text-olive">new</div>
        )}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-1">{label}</div>
      <div className={`h-display text-4xl md:text-5xl tabular-nums ${value > 0 ? 'text-olive' : 'text-fg'}`}>{value}</div>
    </div>
  );
}
