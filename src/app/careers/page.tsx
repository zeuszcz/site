import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import { ArrowUpRight } from 'lucide-react';
import { positions } from '@/lib/careers';

export const metadata = { title: 'Вакансии' };

export default function CareersPage() {
  const perks = [
    { title: 'Работаем откуда хочется', body: 'Москва, удалёнка, миксованный формат. Главное — результат.' },
    { title: 'ДМС + стоматология', body: 'С первого месяца, без испытательных периодов.' },
    { title: 'Образовательный бюджет', body: '100 000 ₽ в год на курсы, конференции, книги.' },
    { title: 'Техника за счёт студии', body: 'MacBook Pro или эквивалент. Обновляем раз в 3 года.' },
    { title: 'Пятница до 16:00', body: 'Каждую пятницу работаем короткий день.' },
    { title: 'Без микроменеджмента', body: 'Фиксируем задачи и результаты, не отчёты.' },
  ];

  return (
    <>
      <section className="pt-40 md:pt-48 pb-24 md:pb-32">
        <div className="container-x">
          <Reveal><span className="eyebrow">Вакансии</span></Reveal>
          <h1 className="h-display mt-8 text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.03] max-w-5xl tracking-[-0.035em]">
            <SplitText text="Присоединяйтесь" />
            <br />
            <SplitText text="к команде" delay={0.2} italic className="text-olive" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted leading-[1.55]">
              Мы ищем людей, которые делают продукты не для портфолио, а для пользы. 14 человек в студии — каждый усиливает команду.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-32">
        <div className="container-x">
          <Reveal className="mb-12 flex items-end justify-between">
            <span className="eyebrow">Открытые позиции</span>
            <span className="font-mono text-xs text-muted">{positions.length} позиций · обновлено 23 апр</span>
          </Reveal>

          <div className="flex flex-col divide-y divide-line border-y border-line">
            {positions.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <Link
                  href={`/careers/${p.id}`}
                  className="group grid grid-cols-[1fr_auto] md:grid-cols-[1fr_160px_160px_auto] gap-6 py-8 md:py-10 items-center"
                >
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-2">{p.team}</div>
                    <h3 className="h-display text-2xl md:text-3xl leading-[1.15] group-hover:italic transition-all duration-300">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-muted md:hidden">{p.location} · {p.type}</p>
                  </div>
                  <div className="hidden md:block text-sm text-muted">{p.location}</div>
                  <div className="hidden md:block text-sm text-muted">{p.type}</div>
                  <ArrowUpRight
                    size={22}
                    strokeWidth={1.5}
                    className="text-muted group-hover:text-fg group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500 shrink-0"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-32 border-t border-line bg-surface2">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 max-w-3xl">
            <span className="eyebrow">Что мы предлагаем</span>
            <h2 className="h-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.025em]">
              Условия, которые <span className="italic text-olive">реально работают</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="bg-surface p-8 md:p-10 h-full">
                  <h3 className="h-display text-xl md:text-2xl mb-3">{p.title}</h3>
                  <p className="text-muted leading-[1.6] text-[14px]">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-28 md:py-36">
        <div className="container-x max-w-3xl text-center">
          <Reveal>
            <h2 className="h-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.03em]">
              Не нашли <span className="italic text-olive">подходящую вакансию?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg text-muted max-w-lg mx-auto">
              Пишите в свободной форме — мы всегда открыты к сильным специалистам.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12">
              <MagneticButton href="mailto:hello@innertalk.ru?subject=Вакансия" className="btn-primary">
                Написать нам
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
