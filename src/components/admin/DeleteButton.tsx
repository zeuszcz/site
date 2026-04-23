'use client';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function onDelete() {
    if (!confirm('Удалить работу? Файлы будут удалены безвозвратно.')) return;
    setBusy(true);
    const res = await fetch(`/api/admin/works?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (res.ok) router.refresh();
    else alert('Ошибка удаления');
    setBusy(false);
  }

  return (
    <button
      onClick={onDelete}
      disabled={busy}
      className="btn-ghost text-xs px-3 py-2 hover:text-accent2 hover:border-accent2 disabled:opacity-40"
      aria-label="Удалить"
    >
      <Trash2 size={14} strokeWidth={1.5} />
    </button>
  );
}
