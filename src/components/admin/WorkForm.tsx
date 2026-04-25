'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Work } from '@/lib/storage';
import { UploadCloud, X } from 'lucide-react';

type Props = { initial?: Work };

export default function WorkForm({ initial }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [coverPreview, setCoverPreview] = useState<string | null>(initial?.coverUrl || null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setBusy(true);

    const fd = new FormData(e.currentTarget);
    if (cover) fd.set('cover', cover);
    images.forEach((f) => fd.append('images', f));
    if (initial) fd.set('id', initial.id);

    const url = initial ? `/api/admin/works?id=${initial.id}` : '/api/admin/works';
    const method = initial ? 'PUT' : 'POST';

    const res = await fetch(url, { method, body: fd });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || `HTTP ${res.status}`);
      setBusy(false);
      return;
    }
    router.push('/admin/works');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Field label="Название" name="title" required defaultValue={initial?.title} />
      <Field label="Slug (url)" name="slug" required defaultValue={initial?.slug} hint="латиница, цифры, дефис. Если пусто — сгенерируется из названия." />
      <Field label="Категория" name="category" defaultValue={initial?.category} hint="Например: веб, брендинг, приложение" />
      <Field label="Теги (через запятую)" name="tags" defaultValue={initial?.tags?.join(', ')} />
      <Field label="Короткое описание" name="excerpt" defaultValue={initial?.excerpt} />

      <div>
        <label className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2 block">Полное описание</label>
        <textarea name="description" rows={8} required defaultValue={initial?.description}
                  className="w-full bg-surface border border-line rounded-xl p-4 focus:border-olive outline-none transition-colors text-fg" />
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2 block">Обложка</label>
        <FileDrop
          accept="image/*"
          multiple={false}
          onFiles={(files) => {
            const f = files[0];
            setCover(f);
            setCoverPreview(URL.createObjectURL(f));
          }}
        />
        {coverPreview && (
          <div className="mt-4 relative aspect-video rounded-xl overflow-hidden border border-line max-w-md">
            <img src={coverPreview} alt="" className="h-full w-full object-cover" />
          </div>
        )}
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2 block">Дополнительные изображения</label>
        <FileDrop
          accept="image/*"
          multiple
          onFiles={(files) => setImages((prev) => [...prev, ...files])}
        />
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {images.map((f, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-line">
                <img src={URL.createObjectURL(f)} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, ix) => ix !== i))}
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-bg/90 flex items-center justify-center text-fg hover:text-accent2"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" name="published" value="1" defaultChecked={initial?.published ?? true} className="h-5 w-5 accent-[#141414]" />
        <span>Опубликовать</span>
      </label>

      {error && <p className="text-sm text-accent2">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-50">
          {busy ? 'Сохранение…' : initial ? 'Сохранить' : 'Создать работу'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-ghost">Отмена</button>
      </div>
    </form>
  );
}

function Field({ label, name, required, defaultValue, hint }: {
  label: string; name: string; required?: boolean; defaultValue?: string; hint?: string;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2 block">{label}{required && ' *'}</label>
      <input name={name} required={required} defaultValue={defaultValue}
             className="w-full bg-surface border border-line rounded-xl px-4 py-3 focus:border-olive outline-none transition-colors text-fg" />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function FileDrop({ accept, multiple, onFiles }: { accept: string; multiple: boolean; onFiles: (files: File[]) => void }) {
  const [over, setOver] = useState(false);
  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length) onFiles(files);
      }}
      className={`block rounded-2xl border border-dashed p-10 text-center cursor-pointer transition-colors ${
        over ? 'border-fg bg-surface2' : 'border-line hover:border-fg/50 bg-surface'
      }`}
    >
      <input type="file" accept={accept} multiple={multiple}
             onChange={(e) => e.target.files && onFiles(Array.from(e.target.files))}
             className="hidden" />
      <UploadCloud className="mx-auto mb-3 text-muted" size={22} strokeWidth={1.5} />
      <div className="text-sm text-fg">Перетащите файл{multiple ? 'ы' : ''} или нажмите, чтобы выбрать</div>
      <div className="text-xs text-muted mt-1">jpg, png, webp, до 25 МБ каждый</div>
    </label>
  );
}
