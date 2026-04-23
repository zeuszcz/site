'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '@/lib/content';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, [paused]);

  function next() { setI((x) => (x + 1) % testimonials.length); }
  function prev() { setI((x) => (x - 1 + testimonials.length) % testimonials.length); }

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="min-h-[320px] md:min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-display text-xl md:text-3xl leading-[1.35] text-fg"
          >
            «{t.quote}»
          </motion.blockquote>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${i}-author`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fg text-bg font-display font-medium text-sm">
              {t.initials}
            </div>
            <div>
              <div className="font-display text-[15px]">{t.author}</div>
              <div className="text-[13px] text-muted">{t.role} · {t.company}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted tabular-nums">
          {String(i + 1).padStart(2, '0')} — {String(testimonials.length).padStart(2, '0')}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Предыдущий"
            className="h-10 w-10 rounded-full border border-line hover:border-fg transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Следующий"
            className="h-10 w-10 rounded-full border border-line hover:border-fg transition-colors flex items-center justify-center"
          >
            <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
