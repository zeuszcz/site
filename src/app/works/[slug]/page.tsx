import { notFound } from 'next/navigation';
import { getWorkBySlug, listWorks } from '@/lib/storage';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return { title: 'Работа не найдена' };
  return {
    title: work.title,
    description: work.excerpt || work.description.slice(0, 160),
    openGraph: work.coverUrl ? { images: [work.coverUrl] } : undefined,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work || !work.published) notFound();

  const all = await listWorks({ publishedOnly: true });
  const related = all.filter((w) => w.id !== work.id).slice(0, 3);

  return (
    <>
      <section className="pt-32">
        <div className="container-x">
          <Link href="/works" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
            <ArrowLeft size={16} /> Все работы
          </Link>
        </div>
      </section>

      <section className="pt-8 pb-16">
        <div className="container-x">
          <Reveal><span className="eyebrow">{work.category || 'Проект'}</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display mt-6 text-5xl md:text-7xl lg:text-8xl max-w-5xl tracking-tighter">{work.title}</h1>
          </Reveal>
          {work.excerpt && (
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-lg text-fg/70">{work.excerpt}</p>
            </Reveal>
          )}

          {work.tags.length > 0 && (
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-2">
                {work.tags.map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 rounded-full border border-line text-muted">
                    #{t}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {work.coverUrl && (
        <section className="pb-16">
          <div className="container-x">
            <Reveal>
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-line bg-surface2">
                <img src={work.coverUrl} alt={work.title} className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="pb-24 md:pb-32">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="prose prose-invert max-w-none whitespace-pre-wrap text-lg leading-relaxed text-fg/80">
              {work.description}
            </div>
          </Reveal>
        </div>
      </section>

      {work.images.length > 0 && (
        <section className="pb-24">
          <div className="container-x grid sm:grid-cols-2 gap-4">
            {work.images.map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface2">
                  <img src={img.url} alt={img.alt || work.title} className="h-full w-full object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="pb-32 border-t border-line pt-24">
          <div className="container-x">
            <Reveal>
              <div className="mb-12 flex items-end justify-between">
                <h2 className="h-display text-4xl md:text-5xl">Похожие работы</h2>
                <Link href="/works" className="btn-ghost">Все</Link>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.08}>
                  <Link href={`/works/${r.slug}`} className="card block overflow-hidden group">
                    {r.coverUrl && (
                      <div className="aspect-[4/5] overflow-hidden bg-surface2">
                        <img src={r.coverUrl} alt={r.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs uppercase tracking-widest text-muted">{r.category || '—'}</span>
                      <h3 className="h-display text-xl mt-2">{r.title}</h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
