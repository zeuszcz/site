'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[88svh] flex items-center pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="relative container-x w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-10 md:mb-12"
        >
          Студия полного цикла · С 2020
        </motion.div>

        <h1 className="h-display text-[clamp(2.5rem,7vw,6.25rem)] leading-[1.04] tracking-[-0.03em] text-fg">
          <SplitText text="Создаём продукты," speed={0.02} />
          <br />
          <SplitText text="которые" speed={0.02} delay={0.16} />
          <span className="mr-[0.25em]" />
          <SplitText text="звучат." speed={0.02} delay={0.3} italic className="text-muted" />
        </h1>

        <div className="mt-12 md:mt-16 grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-md text-lg text-muted leading-[1.55]"
          >
            Дизайн, разработка и брендинг. От идеи до работающего продукта.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticButton href="/start" className="btn-primary">Начать проект</MagneticButton>
            <MagneticButton href="/works" className="btn-ghost">Посмотреть работы</MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
