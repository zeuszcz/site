'use client';
import { services } from '@/lib/services';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function ServicesGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group relative card p-8 cursor-default"
          >
            <motion.div
              animate={{ opacity: hovered === i ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none"
            />

            <div className="relative flex items-center justify-between mb-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface2 text-accent">
                <Icon size={20} />
              </div>
              <motion.div
                animate={{ rotate: hovered === i ? 0 : -45, opacity: hovered === i ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
                className="text-fg/40"
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </div>

            <h3 className="h-display text-2xl mb-2">{s.title}</h3>
            <p className="text-sm text-muted mb-4">{s.subtitle}</p>
            <p className="text-sm text-fg/70 leading-relaxed mb-6">{s.description}</p>

            <ul className="flex flex-wrap gap-2">
              {s.deliverables.map((d) => (
                <li key={d} className="text-xs font-mono px-3 py-1 rounded-full border border-line text-fg/60">
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
