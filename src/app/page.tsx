import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import WorksGrid from '@/components/WorksGrid';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';
import Counter from '@/components/Counter';
import MagneticButton from '@/components/MagneticButton';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import { listWorks } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const works = (await listWorks({ publishedOnly: true })).slice(0, 6);
  const brands = ['Ocea Cosmetics', 'FinEx', 'Nordhaus', 'Tableau', 'Spark', 'Volna', 'Meridian', 'Paperhouse'];

  return (
    <>
      <Hero />

      <section className="relative py-8 md:py-10 border-y border-line">
        <Marquee items={brands} baseSpeed={35} size="md" />
      </section>

      <section id="services" className="relative py-32 md:py-44">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 max-w-3xl">
            <span className="eyebrow">Услуги</span>
            <h2 className="h-display mt-6 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.025em]">
              Полный цикл <span className="italic text-muted">— под ключ</span>
            </h2>
            <p className="mt-6 text-lg text-muted leading-[1.6] max-w-xl">
              От исследования задачи до запуска продукта и его развития.
            </p>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>

      <section className="relative py-32 md:py-44 bg-surface2">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-6xl">
            <div>
              <span className="eyebrow">Работы</span>
              <h2 className="h-display mt-6 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.025em]">
                Избранное <span className="italic text-muted">из портфолио</span>
              </h2>
            </div>
            <MagneticButton href="/works" className="btn-ghost shrink-0">Все работы</MagneticButton>
          </Reveal>
          <WorksGrid works={works} />
        </div>
      </section>

      <section className="relative py-32 md:py-44">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 max-w-3xl">
            <span className="eyebrow">Процесс</span>
            <h2 className="h-display mt-6 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.025em]">
              Как мы <span className="italic text-muted">работаем</span>
            </h2>
            <p className="mt-6 text-lg text-muted leading-[1.6] max-w-xl">
              Прозрачный процесс с демо раз в неделю — клиент видит, куда движется проект.
            </p>
          </Reveal>
          <Process />
        </div>
      </section>

      <section className="relative py-32 md:py-44 bg-surface2">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 max-w-3xl">
            <span className="eyebrow">Отзывы</span>
            <h2 className="h-display mt-6 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.025em]">
              Что говорят <span className="italic text-muted">клиенты</span>
            </h2>
          </Reveal>
          <Testimonials />
        </div>
      </section>

      <section className="relative py-24 md:py-32">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <div className="h-display text-6xl md:text-7xl text-fg tabular-nums">
                <Counter to={50} suffix="+" />
              </div>
              <p className="mt-4 text-muted">реализованных проектов</p>
            </div>
            <div>
              <div className="h-display text-6xl md:text-7xl text-fg tabular-nums">
                <Counter to={6} />
              </div>
              <p className="mt-4 text-muted">лет на рынке</p>
            </div>
            <div>
              <div className="h-display text-6xl md:text-7xl text-fg">
                24<span className="text-muted">/</span>7
              </div>
              <p className="mt-4 text-muted">поддержка клиентов</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-line py-28 md:py-40">
        <div className="container-x max-w-4xl text-center">
          <Reveal>
            <h2 className="h-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.03em]">
              Готовы обсудить <br/>
              <span className="italic text-muted">ваш проект?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg text-muted max-w-lg mx-auto">
              Заполните короткий бриф или забронируйте 30-минутный созвон.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-3 justify-center">
              <MagneticButton href="/start" className="btn-primary">
                Заполнить бриф
              </MagneticButton>
              <MagneticButton href="/book" className="btn-ghost">
                Забронировать созвон
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
