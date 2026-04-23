'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { insights } from '@/lib/content';

export default function InsightsPreview({ limit = 4 }: { limit?: number }) {
  const items = insights.slice(0, limit);
  return (
    <div className="grid md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
      {items.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface"
        >
          <Link
            href={`/insights/${p.slug}`}
            className="group block p-8 md:p-10 h-full transition-colors hover:bg-surface2"
            data-cursor-hover
            data-cursor-label="READ"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted">{p.category}</span>
                <span className="h-px w-10 bg-line" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">{p.readTime}</span>
              </div>
              <ArrowUpRight size={20} strokeWidth={1.5} className="text-fg/30 group-hover:text-fg group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
            </div>

            <h3 className="h-display text-2xl md:text-3xl mb-4 text-fg group-hover:italic transition-all duration-500">
              {p.title}
            </h3>
            <p className="text-muted leading-relaxed">{p.excerpt}</p>

            <div className="mt-10 font-mono text-[10px] tracking-widest text-muted">
              {new Date(p.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
