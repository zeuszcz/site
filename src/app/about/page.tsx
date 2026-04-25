import Reveal from '@/components/Reveal';
import FAQ from '@/components/FAQ';
import MagneticButton from '@/components/MagneticButton';
import SplitText from '@/components/SplitText';
import Team from '@/components/Team';
import Awards from '@/components/Awards';

export const metadata = { title: 'Студия' };

const values = [
  { title: 'Сначала задача', body: 'Начинаем с проблемы клиента, а не с готового решения. Решаем именно то, что нужно.' },
  { title: 'Дизайн — инструмент', body: 'Красиво не ради красоты. Каждый элемент работает на цель продукта.' },
  { title: 'Открытость процесса', body: 'Клиент видит ход работы на каждом этапе — без «чёрных ящиков».' },
  { title: 'Результат важнее процесса', body: 'Цель — запущенный продукт и рост бизнеса, а не тонна артефактов.' },
];

const milestones = [
  { year: '2020', title: 'Основана студия', body: 'Артём Стенвик собрал первую команду из 3 человек. Первый проект — айдентика локального кафе.' },
  { year: '2022', title: 'Первый международный клиент', body: 'Выиграли питч на проект из Берлина. Расширились до 8 человек.' },
  { year: '2024', title: 'В топ-20 digital-студий РФ', body: 'Рейтинг Ruward. Запустили направление дизайн-систем для enterprise.' },
  { year: '2026', title: 'Команда 14 человек', body: 'Работаем с клиентами из 8 стран. Открыт найм на Lead Designer.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 md:pt-48 pb-24 md:pb-32">
        <div className="container-x">
          <Reveal><span className="eyebrow">Студия</span></Reveal>
          <h1 className="h-display mt-8 text-[clamp(3rem,8vw,7rem)] leading-[1.02] max-w-5xl tracking-[-0.035em] text-fg">
            <SplitText text="Команда, которая" speed={0.02} />
            <br />
            <SplitText text="звучит чётко" speed={0.02} delay={0.22} italic className="text-olive" />
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted leading-[1.55]">
              Мы собрали сильных дизайнеров, разработчиков и продактов. Делаем продукты, которые решают задачи и красиво это показывают.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-x grid md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="bg-surface p-10 md:p-14 h-full">
                <h3 className="h-display text-2xl md:text-3xl mb-4">{v.title}</h3>
                <p className="text-muted leading-[1.6]">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-28 pt-28 border-t border-line">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-6xl">
            <div>
              <span className="eyebrow">Команда</span>
              <h2 className="h-display mt-6 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.025em]">
                14 человек <span className="italic text-olive">в студии</span>
              </h2>
            </div>
            <MagneticButton href="/careers" className="btn-ghost shrink-0">Открытые вакансии</MagneticButton>
          </Reveal>
          <Team />
        </div>
      </section>

      <section className="pb-28 pt-28 border-t border-line bg-surface2">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 max-w-3xl">
            <span className="eyebrow">Путь студии</span>
            <h2 className="h-display mt-6 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.025em]">
              От 3 до 14 <span className="italic text-olive">за 6 лет</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.06}>
                <div className="bg-surface p-8 md:p-10 h-full">
                  <div className="font-mono text-sm text-olive mb-4">{m.year}</div>
                  <h3 className="h-display text-xl mb-3 leading-[1.2]">{m.title}</h3>
                  <p className="text-sm text-muted leading-[1.6]">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28 pt-28 border-t border-line bg-olive-soft/40">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 max-w-3xl">
            <span className="eyebrow">Награды</span>
            <h2 className="h-display mt-6 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.025em]">
              Нас заметили <span className="italic text-olive">здесь</span>
            </h2>
          </Reveal>
          <Awards />
        </div>
      </section>

      <section className="pb-28 pt-28 border-t border-line bg-surface2">
        <div className="container-x">
          <Reveal className="mb-16 md:mb-20 max-w-3xl">
            <span className="eyebrow">FAQ</span>
            <h2 className="h-display mt-6 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.025em]">
              Часто <span className="italic text-olive">спрашивают</span>
            </h2>
          </Reveal>
          <FAQ />
        </div>
      </section>

      <section className="border-t border-line py-28 md:py-40">
        <div className="container-x max-w-4xl text-center">
          <Reveal>
            <h2 className="h-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.03em]">
              Расскажите о вашем <br />
              <span className="italic text-olive">проекте</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12">
              <MagneticButton href="/contact" className="btn-primary">Связаться</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
