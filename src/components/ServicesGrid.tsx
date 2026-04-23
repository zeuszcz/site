'use client';
import { services } from '@/lib/services';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden border border-line">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-surface p-10 md:p-12 cursor-default transition-colors duration-500 hover:bg-surface2 h-full"
          >
            <div className="flex items-start justify-between mb-14">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface2 text-fg">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <ArrowUpRight
                size={20}
                strokeWidth={1.5}
                className="text-muted opacity-0 -translate-y-1 translate-x-1 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
              />
            </div>

            <h3 className="h-display text-[1.75rem] md:text-[2rem] leading-[1.1] mb-4 text-fg">{s.title}</h3>
            <p className="text-[15px] text-muted leading-[1.6] max-w-sm">{s.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
