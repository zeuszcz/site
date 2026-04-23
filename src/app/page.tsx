import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import WorksGrid from '@/components/WorksGrid';
import Reveal from '@/components/Reveal';
import Link from 'next/link';
import { listWorks } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const works = (await listWorks({ publishedOnly: true })).slice(0, 6);

  return (
    <>
      <Hero />

      <section id="services" className="relative py-28 md:py-40 border-t border-line">
        <div className="container-x">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">01 — Услуги</span>
              <h2 className="h-display mt-5 text-5xl md:text-7xl max-w-3xl">
                Полный цикл <span className="italic text-muted">— под ключ</span>
              </h2>
            </div>
            <Link href="/services" className="btn-ghost shrink-0">Все услуги</Link>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>

      <section className="relative py-28 md:py-40 border-t border-line">
        <div className="container-x">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">02 — Работы</span>
              <h2 className="h-display mt-5 text-5xl md:text-7xl max-w-3xl">
                Избранное <span className="italic text-muted">из портфолио</span>
              </h2>
            </div>
            <Link href="/works" className="btn-ghost shrink-0">Все работы</Link>
          </Reveal>
          <WorksGrid works={works} />
        </div>
      </section>

      <section className="relative py-28 border-t border-line">
        <div className="container-x">
          <Reveal className="mb-12">
            <span className="eyebrow">03 — Цифры</span>
          </Reveal>
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line border-y border-line">
            {[
              { k: '50+', v: 'реализованных проектов' },
              { k: '6', v: 'лет на рынке' },
              { k: '24/7', v: 'поддержка клиентов' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1} className="p-10 md:p-14">
                <div className="h-display text-7xl md:text-8xl text-fg">{s.k}</div>
                <p className="mt-6 text-muted">{s.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
