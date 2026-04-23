import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import InsightsList from '@/components/InsightsList';
import MagneticButton from '@/components/MagneticButton';

export const metadata = { title: 'Инсайты' };

export default function InsightsPage() {
  return (
    <>
      <section className="pt-40 md:pt-48 pb-16">
        <div className="container-x">
          <Reveal><span className="eyebrow">Инсайты</span></Reveal>
          <h1 className="h-display mt-8 text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.03] max-w-5xl tracking-[-0.035em]">
            <SplitText text="Мысли" />
            <br />
            <SplitText text="в процессе" delay={0.18} italic className="text-muted" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted leading-[1.55]">
              Пишем о процессе, дизайн-системах, брендинге и запуске продуктов. Только из практики — никаких общих мест.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-32">
        <div className="container-x">
          <InsightsList />
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-28 bg-surface2">
        <div className="container-x max-w-3xl text-center">
          <Reveal>
            <h2 className="h-display text-[clamp(2rem,5vw,4rem)] leading-[1.08]">
              Подписка <span className="italic text-muted">на наши мысли</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted">Раз в месяц — только то, что стоит времени.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <MagneticButton href="#newsletter" className="btn-primary">Подписаться в футере</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
