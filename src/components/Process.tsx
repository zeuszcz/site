'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { n: '01', title: 'Бриф',      body: '30 минут разговора о задаче, бизнесе, сроках и бюджете. На выходе — понимание целей и план этапов.' },
  { n: '02', title: 'Дискавери', body: 'Интервью с командой и пользователями. Анализ конкурентов. Карта пути клиента. Гипотезы и приоритеты.' },
  { n: '03', title: 'Дизайн',    body: 'Архитектура, концепция, дизайн-система, макеты. Финализируем UX перед тем, как трогать код.' },
  { n: '04', title: 'Разработка',body: 'Чистый код. TypeScript, тесты, code review. Раз в неделю показываем прогресс на демо.' },
  { n: '05', title: 'Запуск',    body: 'Деплой, мониторинг, обучение команды клиента. Поддержка после релиза — по SLA.' },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const lineY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-px bg-line hidden sm:block" />
      <motion.div
        style={{ height: lineY }}
        className="absolute left-[60px] md:left-[80px] top-0 w-px bg-olive origin-top hidden sm:block"
      />

      {steps.map((s, i) => (
        <ProcessStep key={i} step={s} index={i} />
      ))}
    </div>
  );
}

function ProcessStep({ step, index }: { step: { n: string; title: string; body: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 35%'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const dotScale = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative grid grid-cols-[60px_1fr] md:grid-cols-[80px_180px_1fr] gap-6 py-10 md:py-14 border-b border-line"
    >
      <motion.div
        style={{ scale: dotScale }}
        className="absolute left-[54px] md:left-[74px] top-[54px] md:top-[74px] h-3 w-3 rounded-full bg-olive z-10 hidden sm:block"
      />

      <div className="font-mono text-xs md:text-sm text-muted pt-1">{step.n}</div>
      <motion.div style={{ x }} className="col-span-2 md:col-span-1">
        <h3 className="h-display text-2xl md:text-4xl">{step.title}</h3>
      </motion.div>
      <motion.p style={{ x }} className="text-muted leading-relaxed max-w-md text-base md:text-lg md:pt-2 col-span-2 md:col-span-1">
        {step.body}
      </motion.p>
    </motion.div>
  );
}
