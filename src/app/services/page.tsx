import ServicesGrid from '@/components/ServicesGrid';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import PriceEstimator from '@/components/PriceEstimator';

export const metadata = { title: 'Услуги' };

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 md:pt-48 pb-24 md:pb-32">
        <div className="container-x">
          <Reveal><span className="eyebrow">Услуги</span></Reveal>
          <h1 className="h-display mt-8 text-[clamp(3rem,8vw,7rem)] leading-[1.02] max-w-5xl tracking-[-0.035em]">
            <SplitText text="Что мы" />
            <span className="mr-[0.25em]" />
            <SplitText text="делаем" delay={0.12} italic className="text-muted" />
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted leading-[1.55]">
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

      <section className="relative py-28 md:py-40 border-t border-line bg-surface2">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 max-w-3xl">
            <span className="eyebrow">Калькулятор</span>
            <h2 className="h-display mt-6 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.025em]">
              Прикиньте <span className="italic text-muted">стоимость</span>
            </h2>
            <p className="mt-6 text-lg text-muted leading-[1.55] max-w-xl">
              Интерактивная вилка — настройте тип проекта, сложность и сроки под свою задачу.
            </p>
          </Reveal>
          <PriceEstimator />
        </div>
      </section>

      <section className="border-t border-line py-28 md:py-40">
        <div className="container-x max-w-4xl text-center">
          <Reveal>
            <h2 className="h-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.03em]">
              Нужна помощь <br />
              <span className="italic text-muted">с проектом?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12">
              <MagneticButton href="/contact" className="btn-primary">Написать нам</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
