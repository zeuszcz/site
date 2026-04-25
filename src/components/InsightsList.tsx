'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search } from 'lucide-react';
import { insights } from '@/lib/content';

export default function InsightsList() {
  const categories = useMemo(() => ['Все', ...Array.from(new Set(insights.map((i) => i.category)))], []);
  const [active, setActive] = useState('Все');
  const [query, setQuery] = useState('');

  const filtered = insights.filter((p) => {
    const catOk = active === 'Все' || p.category === active;
    const q = query.trim().toLowerCase();
    const textOk = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return catOk && textOk;
  });

  return (
    <div>
      <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center mb-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-[13px] transition-all ${
                active === c
                  ? 'bg-olive text-bg'
                  : 'border border-line text-muted hover:text-olive hover:border-olive'
              }`}
            >
              {c}
              {c !== 'Все' && (
                <span className={`ml-2 text-[10px] font-mono ${active === c ? 'text-bg/70' : 'text-muted'}`}>
                  {insights.filter((i) => i.category === c).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative flex items-center gap-2 border-b border-line focus-within:border-fg transition-colors">
          <Search size={14} strokeWidth={1.5} className="text-muted shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск…"
            maxLength={200}
            className="bg-transparent py-2 text-[14px] outline-none placeholder:text-muted w-60"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted">Ничего не найдено. Попробуйте другой запрос.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
              className="bg-surface"
            >
              <Link
                href={`/insights/${p.slug}`}
                className="group block p-8 md:p-10 h-full transition-colors hover:bg-surface2"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted">{p.category}</span>
                    <span className="h-px w-10 bg-line" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">{p.readTime}</span>
                  </div>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="text-muted group-hover:text-fg group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500"
                  />
                </div>
                <h3 className="h-display text-2xl md:text-[28px] leading-[1.2] mb-4 text-fg group-hover:italic transition-all duration-500">
                  {p.title}
                </h3>
                <p className="text-muted leading-[1.6] text-[15px]">{p.excerpt}</p>
                <div className="mt-10 font-mono text-[10px] tracking-widest text-muted">
                  {new Date(p.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
