'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/content';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  function next() { setI((x) => (x + 1) % testimonials.length); }
  function prev() { setI((x) => (x - 1 + testimonials.length) % testimonials.length); }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid lg:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start">
        <div className="relative min-h-[260px] md:min-h-[280px]">
          <Quote size={48} strokeWidth={1} className="text-fg/20 mb-6" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-display text-2xl md:text-4xl leading-[1.2] text-fg"
            >
              «{t.quote}»
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${i}-author`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fg text-bg font-display font-semibold text-sm">
                {t.initials}
              </div>
              <div>
                <div className="font-display text-base">{t.author}</div>
                <div className="text-sm text-muted">{t.role} · {t.company}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex lg:flex-col items-start gap-6 lg:min-w-[120px]">
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Предыдущий"
              data-cursor-hover
              className="h-11 w-11 rounded-full border border-line hover:border-fg hover:bg-surface transition-colors flex items-center justify-center"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              aria-label="Следующий"
              data-cursor-hover
              className="h-11 w-11 rounded-full border border-line hover:border-fg hover:bg-surface transition-colors flex items-center justify-center"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted tabular-nums">
            {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </div>

          <div className="flex lg:flex-col gap-1.5 w-full">
            {testimonials.map((_, ix) => (
              <button
                key={ix}
                onClick={() => setI(ix)}
                aria-label={`К отзыву ${ix + 1}`}
                data-cursor-hover
                className={`h-0.5 flex-1 lg:flex-initial lg:w-full transition-colors ${ix === i ? 'bg-fg' : 'bg-line'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
