import { notFound } from 'next/navigation';
import { getWorkById } from '@/lib/storage';
import WorkForm from '@/components/admin/WorkForm';

export const metadata = { title: 'Редактирование работы' };
export const dynamic = 'force-dynamic';

export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = await getWorkById(id);
  if (!work) notFound();

  return (
    <div className="pt-32 pb-24">
      <div className="container-x max-w-3xl">
        <span className="eyebrow">Админка · Редактирование</span>
        <h1 className="h-display mt-4 text-5xl mb-10">{work.title}</h1>
        <WorkForm initial={work} />
      </div>
    </div>
  );
}
