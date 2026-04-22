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
        <h1 className="h-display mt-4 text-5xl md:text-7xl">Панель управления</h1>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="card p-8">
            <div className="text-xs uppercase tracking-widest text-muted">Всего работ</div>
            <div className="h-display text-6xl text-accent mt-2">{works.length}</div>
          </div>
          <div className="card p-8">
            <div className="text-xs uppercase tracking-widest text-muted">Опубликовано</div>
            <div className="h-display text-6xl text-accent mt-2">{published}</div>
          </div>
          <div className="card p-8">
            <div className="text-xs uppercase tracking-widest text-muted">Черновики</div>
            <div className="h-display text-6xl text-accent mt-2">{works.length - published}</div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/admin/works/new" className="btn-primary"><Plus size={16}/> Добавить работу</Link>
          <Link href="/admin/works" className="btn-ghost"><FileText size={16}/> Все работы</Link>
          <Link href="/" className="btn-ghost"><Eye size={16}/> На сайт</Link>
        </div>
      </div>
    </div>
  );
}
