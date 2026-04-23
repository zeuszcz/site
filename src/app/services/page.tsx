import ServicesGrid from '@/components/ServicesGrid';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import PriceEstimator from '@/components/PriceEstimator';

export const metadata = { title: 'Услуги' };

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-40 pb-20">
        <div className="container-x">
          <Reveal><span className="eyebrow">Услуги</span></Reveal>
          <h1 className="h-display mt-8 text-6xl md:text-8xl max-w-5xl tracking-[-0.03em]">
            <SplitText text="Что мы" />
            <span className="mr-[0.25em]" />
            <SplitText text="делаем" delay={0.15} italic className="text-muted" />
          </h1>
          <Reveal delay={0.3}>
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

      <section className="relative py-24 md:py-32 border-t border-line bg-surface2">
        <div className="container-x">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">Калькулятор</span>
              <h2 className="h-display mt-6 text-5xl md:text-6xl">
                Прикиньте <span className="italic text-muted">стоимость</span>
              </h2>
            </div>
            <p className="text-muted max-w-sm">Интерактивная вилка — подстройте тип проекта, сложность и сроки под свою задачу.</p>
          </Reveal>

          <PriceEstimator />
        </div>
      </section>

      <section className="py-24 border-t border-line">
        <div className="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="h-display text-4xl md:text-5xl">Нужна помощь <span className="italic text-muted">с проектом?</span></h2>
          <MagneticButton href="/contact" className="btn-primary self-start md:self-auto">Написать нам</MagneticButton>
        </div>
      </section>
    </>
  );
}
