import { notFound } from 'next/navigation';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import MagneticButton from '@/components/MagneticButton';
import { ArrowLeft, Check } from 'lucide-react';
import { positions } from '@/lib/careers';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = positions.find((x) => x.id === id);
  if (!p) return { title: 'Вакансия не найдена' };
  return { title: p.title };
}

export default async function PositionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = positions.find((x) => x.id === id);
  if (!p) notFound();

  const other = positions.filter((x) => x.id !== p.id).slice(0, 3);

  return (
    <>
      <section className="pt-32">
        <div className="container-x">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg transition-colors">
            <ArrowLeft size={16} strokeWidth={1.5} /> Все вакансии
          </Link>
        </div>
      </section>

      <section className="pt-10 pb-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-8">
              <span>{p.team}</span>
              <span className="h-px w-8 bg-line" />
              <span>{p.location}</span>
              <span className="h-px w-8 bg-line" />
              <span>{p.type}</span>
              <span className="h-px w-8 bg-line" />
              <span>{p.experience}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.03] tracking-[-0.03em] max-w-4xl">{p.title}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted leading-[1.55]">{p.description}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-fg text-bg text-sm font-medium">
              {p.salary}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          <Reveal>
            <div className="bg-surface p-10 md:p-12 h-full">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-6">Обязанности</div>
              <ul className="space-y-3 text-[15px] leading-[1.6]">
                {p.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <Check size={16} strokeWidth={1.5} className="text-fg mt-1 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="bg-surface p-10 md:p-12 h-full">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-6">Требования</div>
              <ul className="space-y-3 text-[15px] leading-[1.6]">
                {p.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <Check size={16} strokeWidth={1.5} className="text-fg mt-1 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-x">
          <Reveal>
            <div className="card p-10 md:p-14 bg-surface2">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-8">Что мы предлагаем</div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {p.benefits.map((b) => (
                  <div key={b} className="text-[15px]">{b}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 border-y border-line">
        <div className="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="h-display text-3xl md:text-4xl">Готовы откликнуться?</h2>
            <p className="mt-3 text-muted">Письмо + резюме + портфолио на почту студии.</p>
          </div>
          <MagneticButton
            href={`mailto:hello@innertalk.ru?subject=Вакансия: ${encodeURIComponent(p.title)}`}
            className="btn-primary shrink-0"
          >
            Откликнуться
          </MagneticButton>
        </div>
      </section>

      {other.length > 0 && (
        <section className="py-24">
          <div className="container-x">
            <h3 className="eyebrow mb-10">Другие вакансии</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {other.map((o) => (
                <Link
                  key={o.id}
                  href={`/careers/${o.id}`}
                  className="group card p-8 hover:bg-surface2 transition-colors"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-4">{o.team}</div>
                  <h4 className="h-display text-xl mb-3 group-hover:italic transition-all">{o.title}</h4>
                  <p className="text-sm text-muted">{o.location} · {o.type}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
