'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden pt-28">
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-[60vh] bg-gradient-to-b from-surface2 to-transparent" />
        <div className="absolute top-24 left-[12%] h-px w-[120px] bg-fg/20" />
        <div className="absolute top-28 right-[10%] font-mono text-[10px] tracking-[0.3em] text-muted/70">
          STUDIO · EST. 2020
        </div>
      </div>

      <motion.div style={{ y, opacity }} className="relative container-x w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-10"
        >
          Студия полного цикла
        </motion.div>

        <h1 className="h-display text-[13vw] md:text-[9vw] lg:text-[7.5rem] leading-[0.92] tracking-[-0.035em] max-w-6xl text-fg">
          {['Создаём', 'продукты,'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-5"
            >
              {word}
            </motion.span>
          ))}
          <br className="hidden md:inline" />
          {['которые'].map((word, i) => (
            <motion.span
              key={`r${i}`}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-5"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block italic font-normal text-muted"
          >
            звучат.
          </motion.span>
        </h1>

        <div className="mt-16 grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl text-lg text-muted leading-relaxed"
          >
            Дизайн, разработка и брендинг — от первой идеи до работающего продукта. Помогаем бизнесу становиться узнаваемым.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/contact" className="btn-primary">Обсудить проект</Link>
            <Link href="/works" className="btn-ghost">Посмотреть работы</Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-muted"
          >
            <span>SCROLL</span>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
