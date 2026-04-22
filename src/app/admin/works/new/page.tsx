import WorkForm from '@/components/admin/WorkForm';

export const metadata = { title: 'Новая работа' };

export default function NewWorkPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-x max-w-3xl">
        <span className="eyebrow">Админка · Новая работа</span>
        <h1 className="h-display mt-4 text-5xl mb-10">Добавить работу</h1>
        <WorkForm />
      </div>
    </div>
  );
}
