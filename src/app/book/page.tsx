import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import BookCall from '@/components/BookCall';

export const metadata = { title: 'Забронировать созвон' };

export default function BookPage() {
  return (
    <>
      <section className="pt-40 md:pt-48 pb-16">
        <div className="container-x">
          <Reveal><span className="eyebrow">30 минут · бесплатно</span></Reveal>
          <h1 className="h-display mt-8 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.03] max-w-5xl tracking-[-0.035em]">
            <SplitText text="Созвон" />
            <span className="mr-[0.25em]" />
            <SplitText text="с нами" delay={0.12} italic className="text-muted" />
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted leading-[1.55]">
              Коротко обсудим задачу, ограничения и ожидания. На выходе — понимание скоупа, сроков и вилки по бюджету.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32 md:pb-40">
        <div className="container-x">
          <BookCall />
        </div>
      </section>
    </>
  );
}
