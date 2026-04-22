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

      <section id="services" className="relative py-24 md:py-40">
        <div className="container-x">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">Услуги</span>
              <h2 className="h-display mt-4 text-5xl md:text-7xl max-w-3xl">
                Полный цикл <span className="text-accent italic">— под ключ</span>
              </h2>
            </div>
            <Link href="/services" className="btn-ghost shrink-0">Все услуги</Link>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>

      <section className="relative py-24 md:py-40 border-t border-line">
        <div className="container-x">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">Работы</span>
              <h2 className="h-display mt-4 text-5xl md:text-7xl max-w-3xl">
                Избранное <span className="text-accent italic">из портфолио</span>
              </h2>
            </div>
            <Link href="/works" className="btn-ghost shrink-0">Все работы</Link>
          </Reveal>
          <WorksGrid works={works} />
        </div>
      </section>

      <section className="relative py-24 md:py-32 border-t border-line">
        <div className="container-x grid md:grid-cols-3 gap-8">
          {[
            { k: '50+', v: 'реализованных проектов' },
            { k: '6', v: 'лет на рынке' },
            { k: '24/7', v: 'поддержка клиентов' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="p-10 rounded-2xl border border-line bg-surface">
              <div className="h-display text-6xl md:text-7xl text-accent">{s.k}</div>
              <p className="mt-4 text-fg/70">{s.v}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
