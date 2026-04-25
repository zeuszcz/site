'use client';
import { motion } from 'framer-motion';
import { awards } from '@/lib/content';

export default function Awards() {
  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {awards.map((a, i) => (
        <motion.div
          key={`${a.year}-${a.title}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_auto] gap-6 py-6 md:py-8 items-baseline group"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-olive pt-1 md:pt-2">{a.year}</span>
          <h3 className="h-display text-xl md:text-3xl text-fg group-hover:italic group-hover:text-olive transition-all duration-300">{a.title}</h3>
          <span className="text-[11px] md:text-sm text-muted">{a.category}</span>
        </motion.div>
      ))}
    </div>
  );
}
