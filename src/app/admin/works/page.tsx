import Link from 'next/link';
import { listWorks } from '@/lib/storage';
import { Plus, Pencil } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

export const metadata = { title: 'Работы — Админка' };
export const dynamic = 'force-dynamic';

export default async function AdminWorksList() {
  const works = await listWorks();
  return (
    <div className="pt-32 pb-24">
      <div className="container-x">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="eyebrow">Админка</span>
            <h1 className="h-display mt-4 text-5xl">Работы</h1>
          </div>
          <Link href="/admin/works/new" className="btn-primary"><Plus size={16}/> Добавить</Link>
        </div>

        {works.length === 0 ? (
          <div className="card p-16 text-center text-muted">
            Работ пока нет. <Link href="/admin/works/new" className="text-accent underline">Добавить первую</Link>.
          </div>
        ) : (
          <div className="grid gap-3">
            {works.map((w) => (
              <div key={w.id} className="card p-4 flex items-center gap-6">
                <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-surface2">
                  {w.coverUrl && <img src={w.coverUrl} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${w.published ? 'bg-accent/20 text-accent' : 'bg-line text-muted'}`}>
                      {w.published ? 'опубликовано' : 'черновик'}
                    </span>
                    <span className="text-xs text-muted">{w.category || '—'}</span>
                  </div>
                  <div className="h-display text-lg truncate">{w.title}</div>
                  <div className="text-xs text-muted font-mono truncate">/works/{w.slug}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/admin/works/${w.id}/edit`} className="btn-ghost text-xs"><Pencil size={14}/></Link>
                  <DeleteButton id={w.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
