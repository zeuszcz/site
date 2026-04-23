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
    <section ref={ref} className="relative min-h-[92vh] flex items-end pt-32 pb-32 overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative container-x w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-14"
        >
          Студия полного цикла · С 2020
        </motion.div>

        <h1 className="h-display text-[clamp(3.5rem,10vw,9.5rem)] leading-[1.02] tracking-[-0.035em] max-w-6xl text-fg">
          <SplitText text="Создаём продукты," speed={0.022} />
          <br />
          <SplitText text="которые" speed={0.022} delay={0.18} />
          <span className="mr-[0.25em]" />
          <SplitText text="звучат." speed={0.022} delay={0.34} italic className="text-muted" />
        </h1>

        <div className="mt-14 md:mt-20 grid md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-end max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-lg text-lg md:text-xl text-muted leading-[1.55]"
          >
            Дизайн, разработка и брендинг. От первой идеи до работающего продукта.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticButton href="/contact" className="btn-primary">Обсудить проект</MagneticButton>
            <MagneticButton href="/works" className="btn-ghost">Посмотреть работы</MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
