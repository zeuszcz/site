import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import InsightsPreview from '@/components/InsightsPreview';
import Link from 'next/link';

export const metadata = { title: 'Инсайты' };

export default function InsightsPage() {
  return (
    <>
      <section className="pt-40 pb-16">
        <div className="container-x">
          <Reveal><span className="eyebrow">Инсайты</span></Reveal>
          <h1 className="h-display mt-8 text-6xl md:text-8xl max-w-5xl tracking-[-0.03em]">
            <SplitText text="Мысли" />
            <span className="mr-[0.25em]" />
            <SplitText text="в процессе" delay={0.1} italic className="text-muted" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg text-muted leading-relaxed">
              Пишем о процессе, дизайн-системах, брендинге и запуске продуктов. Только из практики, никаких общих мест.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <InsightsPreview limit={4} />
        </div>
      </section>

      <section className="py-24 border-t border-line">
        <div className="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="h-display text-4xl md:text-5xl">Подписка <span className="italic text-muted">на наши мысли</span></h2>
          <Link href="/contact" className="btn-primary self-start md:self-auto">Написать</Link>
        </div>
      </section>
    </>
  );
}
