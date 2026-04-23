import ServicesGrid from '@/components/ServicesGrid';
import Reveal from '@/components/Reveal';
import Link from 'next/link';

export const metadata = { title: 'Услуги' };

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-40 pb-20">
        <div className="container-x">
          <Reveal><span className="eyebrow">Услуги</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display mt-8 text-6xl md:text-8xl max-w-5xl tracking-[-0.03em]">
              Что мы <span className="italic text-muted">делаем</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg text-muted leading-relaxed">
              От исследования рынка до запуска продукта и его развития — покрываем весь цикл создания цифрового продукта.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="container-x">
          <ServicesGrid />
        </div>
      </section>

      <section className="py-24 border-t border-line">
        <div className="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="h-display text-4xl md:text-5xl">Нужна помощь <span className="italic text-muted">с проектом?</span></h2>
          <Link href="/contact" className="btn-primary self-start md:self-auto">Написать нам</Link>
        </div>
      </section>
    </>
  );
}
