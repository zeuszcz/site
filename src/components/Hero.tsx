'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-[10%] left-[5%] h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px] animate-float" />
        <div className="absolute bottom-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-accent2/10 blur-[140px] animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(230,255,86,0.06),transparent_50%)]" />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative container-x w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-6"
        >
          <Sparkles size={14} className="text-accent" /> Студия полного цикла
        </motion.div>

        <h1 className="h-display text-[12vw] md:text-[8.5vw] lg:text-[7rem] leading-[0.9] tracking-tighter max-w-6xl">
          {['Создаём', 'продукты,', 'которые'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-accent italic"
          >
            звучат.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 max-w-xl text-lg text-fg/70 leading-relaxed"
        >
          Дизайн, разработка и брендинг — от первой идеи до работающего продукта. Помогаем бизнесу становиться узнаваемым.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/contact" className="btn-primary">
            Обсудить проект
          </Link>
          <Link href="/works" className="btn-ghost">
            Посмотреть работы
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-xs text-muted"
          >
            <span className="uppercase tracking-widest">Листай</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
