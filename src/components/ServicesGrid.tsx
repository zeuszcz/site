'use client';
import { services } from '@/lib/services';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import Tilt from '@/components/Tilt';

export default function ServicesGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <Tilt key={s.slug} className="block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative bg-surface p-10 cursor-default transition-colors duration-500 hover:bg-surface2 h-full"
              data-cursor-hover
            >
              <div className="relative flex items-center justify-between mb-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg text-fg">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <motion.div
                  animate={{ rotate: hovered === i ? 0 : -30, opacity: hovered === i ? 1 : 0.25 }}
                  transition={{ duration: 0.4 }}
                  className="text-fg"
                >
                  <ArrowUpRight size={22} strokeWidth={1.5} />
                </motion.div>
              </div>

              <div className="font-mono text-[10px] tracking-[0.3em] text-muted mb-4">0{i + 1} / 0{services.length}</div>
              <h3 className="h-display text-2xl md:text-3xl mb-3 text-fg">{s.title}</h3>
              <p className="text-sm italic text-muted mb-6">{s.subtitle}</p>
              <p className="text-sm text-muted leading-relaxed mb-8">{s.description}</p>

              <ul className="flex flex-wrap gap-1.5">
                {s.deliverables.map((d) => (
                  <li key={d} className="text-[11px] font-mono tracking-wide px-3 py-1 rounded-full border border-line text-muted bg-bg">
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Tilt>
        );
      })}
    </div>
  );
}
