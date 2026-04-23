import { getInbox } from '@/lib/inbox';
import InboxView from '@/components/admin/InboxView';

export const metadata = { title: 'Входящие' };
export const dynamic = 'force-dynamic';

export default async function InboxPage() {
  const data = await getInbox();
  return (
    <div className="pt-32 pb-24">
      <div className="container-x">
        <span className="eyebrow">Админка · Входящие</span>
        <div className="mt-6 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1 className="h-display text-5xl md:text-7xl">Входящие</h1>
          <div className="flex items-center gap-4 text-[11px] font-mono tracking-widest uppercase text-muted">
            <span>Обновлено: {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        <InboxView data={data} />
      </div>
    </div>
  );
}
