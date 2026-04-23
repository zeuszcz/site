import { notFound } from 'next/navigation';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowLeft } from 'lucide-react';
import { insights } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return { title: 'Статья не найдена' };
  return { title: post.title, description: post.excerpt };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section className="pt-32">
        <div className="container-x">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg transition-colors">
            <ArrowLeft size={16} strokeWidth={1.5} /> Все инсайты
          </Link>
        </div>
      </section>

      <article className="pt-10 pb-20">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted font-mono mb-8">
              <span>{post.category}</span>
              <span className="h-px w-8 bg-line" />
              <span>{post.readTime}</span>
              <span className="h-px w-8 bg-line" />
              <span>{new Date(post.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display text-4xl md:text-6xl tracking-[-0.02em] mb-12">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-muted leading-relaxed mb-16">{post.excerpt}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="prose-like text-lg leading-[1.75] text-fg space-y-6">
              <p>
                Это короткая версия материала — полный текст появится в ближайшее время. А пока короткое резюме ниже.
              </p>
              <p>
                {post.excerpt} Обычно тут — прямые примеры, графики и цифры. Мы пишем только о том, что сами проверили на реальных проектах.
              </p>
              <p>
                Если хочешь получить материал раньше остальных — напиши нам в Telegram или на email, положим в рассылку.
              </p>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="py-16 border-t border-line">
        <div className="container-x">
          <h3 className="eyebrow mb-8">Другие инсайты</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {insights.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/insights/${p.slug}`}
                className="group block p-6 border border-line rounded-2xl hover:bg-surface transition-colors"
                data-cursor-hover
                data-cursor-label="READ"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono mb-4">
                  {p.category} · {p.readTime}
                </div>
                <h4 className="h-display text-xl group-hover:italic transition-all">{p.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
