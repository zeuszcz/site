import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import WorksGrid from '@/components/WorksGrid';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';
import Counter from '@/components/Counter';
import MagneticButton from '@/components/MagneticButton';
import Link from 'next/link';
import { listWorks } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const works = (await listWorks({ publishedOnly: true })).slice(0, 6);
  const brands = ['Ocea Cosmetics', 'FinEx', 'Nordhaus', 'Tableau', 'Spark', 'Volna', 'Meridian', 'Paperhouse'];

  return (
    <>
      <Hero />

      <section className="relative py-10 md:py-14 border-y border-line bg-surface2">
        <Marquee items={brands} speed={45} />
      </section>

      <section id="services" className="relative py-28 md:py-40 border-b border-line">
        <div className="container-x">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">01 — Услуги</span>
              <h2 className="h-display mt-5 text-5xl md:text-7xl max-w-3xl">
                Полный цикл <span className="italic text-muted">— под ключ</span>
              </h2>
            </div>
            <MagneticButton href="/services" className="btn-ghost shrink-0">Все услуги</MagneticButton>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>

      <section className="relative py-28 md:py-40 border-b border-line">
        <div className="container-x">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">02 — Работы</span>
              <h2 className="h-display mt-5 text-5xl md:text-7xl max-w-3xl">
                Избранное <span className="italic text-muted">из портфолио</span>
              </h2>
            </div>
            <MagneticButton href="/works" className="btn-ghost shrink-0">Все работы</MagneticButton>
          </Reveal>
          <WorksGrid works={works} />
        </div>
      </section>

      <section className="relative py-28">
        <div className="container-x">
          <Reveal className="mb-12">
            <span className="eyebrow">03 — Цифры</span>
          </Reveal>
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line border-y border-line">
            <Reveal className="p-10 md:p-14">
              <div className="h-display text-7xl md:text-8xl text-fg tabular-nums">
                <Counter to={50} suffix="+" />
              </div>
              <p className="mt-6 text-muted">реализованных проектов</p>
            </Reveal>
            <Reveal delay={0.1} className="p-10 md:p-14">
              <div className="h-display text-7xl md:text-8xl text-fg tabular-nums">
                <Counter to={6} />
              </div>
              <p className="mt-6 text-muted">лет на рынке</p>
            </Reveal>
            <Reveal delay={0.2} className="p-10 md:p-14">
              <div className="h-display text-7xl md:text-8xl text-fg">24<span className="text-muted">/</span>7</div>
              <p className="mt-6 text-muted">поддержка клиентов</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
