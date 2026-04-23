'use client';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import ScrambleText from '@/components/ScrambleText';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const bgTextX = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 20);
      my.set((e.clientY / h - 0.5) * 14);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden pt-28">
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-[60vh] bg-gradient-to-b from-surface2 to-transparent" />
        <div className="absolute top-24 left-[12%] h-px w-[120px] bg-fg/20" />
        <div className="absolute top-28 right-[10%] font-mono text-[10px] tracking-[0.3em] text-muted/70">
          STUDIO · EST. 2020
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ x: bgTextX }}
        className="absolute inset-x-0 top-[35%] -z-0 pointer-events-none overflow-hidden select-none"
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="flex gap-24 whitespace-nowrap font-display font-medium text-[22vw] leading-none tracking-[-0.04em] text-fg/[0.04]"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>STUDIO</span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative container-x w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-10"
        >
          Студия полного цикла
        </motion.div>

        <motion.h1
          style={{ x: smx, y: smy }}
          className="h-display text-[13vw] md:text-[9vw] lg:text-[7.5rem] leading-[0.95] tracking-[-0.035em] max-w-6xl text-fg"
        >
          <SplitText text="Создаём продукты," speed={0.022} />
          <br className="hidden md:inline" />
          <SplitText text="которые" speed={0.022} delay={0.2} />
          <span className="mr-[0.25em]" />
          <SplitText text="звучат." speed={0.022} delay={0.38} italic className="text-muted" />
        </motion.h1>

        <div className="mt-16 grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="max-w-xl text-lg text-muted leading-relaxed"
            >
              Дизайн, разработка и брендинг — от первой идеи до работающего продукта. Помогаем бизнесу становиться узнаваемым.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted"
            >
              <span className="font-mono">Специализация:</span>
              <ScrambleText
                className="text-fg text-[11px] tracking-[0.25em]"
                words={['БРЕНДИНГ', 'САЙТЫ', 'ПРИЛОЖЕНИЯ', 'ДИЗАЙН-СИСТЕМЫ', 'ПРОДУКТЫ']}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticButton href="/contact" className="btn-primary">Обсудить проект</MagneticButton>
            <MagneticButton href="/works" className="btn-ghost">Посмотреть работы</MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
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
