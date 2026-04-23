'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Work } from '@/lib/storage';
import { useState, useRef } from 'react';

export default function WorksGrid({ works }: { works: Work[] }) {
  const [categories] = useState<string[]>(() => Array.from(new Set(works.map((w) => w.category).filter(Boolean))));
  const [active, setActive] = useState<string>('all');

  const filtered = active === 'all' ? works : works.filter((w) => w.category === active);

  if (works.length === 0) {
    return (
      <div className="py-24 text-center text-muted">
        <p className="text-lg">Работы скоро появятся.</p>
        <p className="mt-2 text-sm">
          Если вы админ — зайдите в{' '}
          <Link href="/admin" className="text-fg underline underline-offset-4">/admin</Link>
          {' '}чтобы добавить первую.
        </p>
      </div>
    );
  }

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-14">
          <button
            onClick={() => setActive('all')}
            className={`text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-all ${
              active === 'all' ? 'border-fg text-fg bg-surface' : 'border-line text-muted hover:text-fg hover:border-fg'
            }`}
          >
            Все
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-all ${
                active === c ? 'border-fg text-fg bg-surface' : 'border-line text-muted hover:text-fg hover:border-fg'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
        {filtered.map((w, i) => (
          <WorkCard key={w.id} work={w} index={i} />
        ))}
      </div>
    </>
  );
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/works/${work.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface2">
          {work.coverUrl ? (
            <motion.img
              src={work.coverUrl}
              alt={work.title}
              style={{ y: imgY, scale: 1.08, viewTransitionName: `work-cover-${work.id}` } as any}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-xs tracking-widest">NO COVER</div>
          )}
        </div>

        <div className="pt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted">{work.category || '—'}</span>
            <span className="text-[11px] font-mono text-muted">{new Date(work.createdAt).getFullYear()}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="h-display text-xl md:text-2xl text-fg group-hover:text-muted transition-colors duration-300 flex-1">
              {work.title}
            </h3>
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="text-muted mt-1 shrink-0 opacity-0 -translate-y-1 translate-x-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
            />
          </div>
          {work.excerpt && <p className="mt-2 text-[14px] text-muted line-clamp-2 leading-[1.5]">{work.excerpt}</p>}
        </div>
      </Link>
    </motion.div>
  );
}
