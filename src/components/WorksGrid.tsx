'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Work } from '@/lib/storage';
import { useState } from 'react';

export default function WorksGrid({ works }: { works: Work[] }) {
  const [categories] = useState<string[]>(() => Array.from(new Set(works.map((w) => w.category).filter(Boolean))));
  const [active, setActive] = useState<string>('all');

  const filtered = active === 'all' ? works : works.filter((w) => w.category === active);

  if (works.length === 0) {
    return (
      <div className="py-24 text-center text-muted">
        <p className="text-lg">Работы скоро появятся.</p>
        <p className="mt-2 text-sm">Если вы админ — зайдите в <Link href="/admin" className="text-accent underline">/admin</Link> чтобы добавить первую.</p>
      </div>
    );
  }

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive('all')}
            className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
              active === 'all' ? 'border-accent text-accent' : 'border-line text-muted hover:text-fg hover:border-fg/30'
            }`}
          >
            Все
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                active === c ? 'border-accent text-accent' : 'border-line text-muted hover:text-fg hover:border-fg/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((w, i) => (
          <motion.div
            key={w.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/works/${w.slug}`} className="group block card overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface2">
                {w.coverUrl ? (
                  <motion.img
                    src={w.coverUrl}
                    alt={w.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ scale: 1.05 }}
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted">no cover</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-bg/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight size={18} className="text-accent" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-muted">{w.category || '—'}</span>
                  <span className="text-xs font-mono text-muted">{new Date(w.createdAt).getFullYear()}</span>
                </div>
                <h3 className="h-display text-xl">{w.title}</h3>
                {w.excerpt && <p className="mt-2 text-sm text-fg/70 line-clamp-2">{w.excerpt}</p>}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
