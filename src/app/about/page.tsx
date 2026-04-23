import Reveal from '@/components/Reveal';
import Link from 'next/link';

export const metadata = { title: 'О нас' };

const values = [
  { title: 'Сначала задача', body: 'Начинаем с проблемы клиента, а не с готового решения. Решаем именно то, что нужно.' },
  { title: 'Дизайн — инструмент', body: 'Красиво не ради красоты. Каждый элемент работает на цель продукта.' },
  { title: 'Открытость процесса', body: 'Клиент видит ход работы на каждом этапе — без «чёрных ящиков».' },
  { title: 'Результат важнее процесса', body: 'Цель — запущенный продукт и рост бизнеса, а не тонна артефактов.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-24">
        <div className="container-x">
          <Reveal><span className="eyebrow">О студии</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display mt-8 text-6xl md:text-8xl max-w-5xl tracking-[-0.03em]">
              Команда, которая <br />
              <span className="italic text-muted">звучит чётко</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg text-muted leading-relaxed">
              Мы собрали сильных дизайнеров, разработчиков и продактов. Делаем продукты, которые решают задачи и красиво это показывают.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="bg-surface p-10 md:p-12 h-full">
                <div className="font-mono text-[10px] tracking-[0.3em] text-muted mb-6">0{i + 1} / 0{values.length}</div>
                <h3 className="h-display text-3xl mb-4">{v.title}</h3>
                <p className="text-muted leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 border-t border-line">
        <div className="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="h-display text-4xl md:text-5xl">Расскажите о вашем <span className="italic text-muted">проекте</span></h2>
          <Link href="/contact" className="btn-primary self-start md:self-auto">Связаться</Link>
        </div>
      </section>
    </>
  );
}
