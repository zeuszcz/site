import Link from 'next/link';
import { listWorks } from '@/lib/storage';
import { Plus, FileText, Eye } from 'lucide-react';

export const metadata = { title: 'Админка' };
export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const works = await listWorks();
  const published = works.filter((w) => w.published).length;

  return (
    <div className="pt-32 pb-24">
      <div className="container-x">
        <span className="eyebrow">Админка</span>
        <h1 className="h-display mt-6 text-5xl md:text-7xl">Панель управления</h1>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {[
            { label: 'Всего работ', value: works.length },
            { label: 'Опубликовано', value: published },
            { label: 'Черновики', value: works.length - published },
          ].map((s, i) => (
            <div key={i} className="bg-surface p-10">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted">{s.label}</div>
              <div className="h-display text-6xl text-fg mt-3">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/admin/works/new" className="btn-primary"><Plus size={16} strokeWidth={1.5}/> Добавить работу</Link>
          <Link href="/admin/works" className="btn-ghost"><FileText size={16} strokeWidth={1.5}/> Все работы</Link>
          <Link href="/" className="btn-ghost"><Eye size={16} strokeWidth={1.5}/> На сайт</Link>
        </div>
      </div>
    </div>
  );
}
