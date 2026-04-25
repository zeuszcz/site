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
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="eyebrow">Админка</span>
            <h1 className="h-display mt-6 text-5xl">Работы</h1>
          </div>
          <Link href="/admin/works/new" className="btn-primary"><Plus size={16} strokeWidth={1.5}/> Добавить</Link>
        </div>

        {works.length === 0 ? (
          <div className="card p-16 text-center text-muted">
            Работ пока нет. <Link href="/admin/works/new" className="text-fg underline underline-offset-4">Добавить первую</Link>.
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-line border-y border-line">
            {works.map((w) => (
              <div key={w.id} className="py-5 flex items-center gap-6">
                <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-surface2 border border-line">
                  {w.coverUrl && <img src={w.coverUrl} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full border ${w.published ? 'border-olive text-olive bg-olive-soft' : 'border-line text-muted'}`}>
                      {w.published ? 'опубликовано' : 'черновик'}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-muted">{w.category || '—'}</span>
                  </div>
                  <div className="h-display text-xl truncate">{w.title}</div>
                  <div className="text-[11px] text-muted font-mono truncate">/works/{w.slug}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/admin/works/${w.id}/edit`} className="btn-ghost text-xs px-3 py-2"><Pencil size={14} strokeWidth={1.5}/></Link>
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
