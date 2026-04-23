'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { team } from '@/lib/content';

export default function Team() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
      {team.map((m, i) => (
        <Member key={m.name} m={m} index={i} />
      ))}
    </div>
  );
}

function Member({ m, index }: { m: (typeof team)[number]; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative bg-surface p-8 md:p-10 min-h-[280px] flex flex-col group cursor-default overflow-hidden"
      data-cursor-hover
    >
      <motion.div
        animate={{ opacity: hover ? 0 : 1, y: hover ? -6 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col"
      >
        <div className="relative h-24 w-24 rounded-full bg-surface2 border border-line flex items-center justify-center mb-6 overflow-hidden">
          <span className="font-display text-3xl text-fg">{m.initials}</span>
          <motion.div
            animate={{ scale: hover ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0.5, originY: 0.5 }}
            className="absolute inset-0 bg-fg rounded-full"
          />
          <motion.span
            animate={{ opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute font-display text-3xl text-bg"
          >
            {m.initials}
          </motion.span>
        </div>
        <h3 className="h-display text-xl md:text-2xl mb-2">{m.name}</h3>
        <p className="font-mono text-[11px] tracking-widest uppercase text-muted">{m.role}</p>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end pointer-events-none"
      >
        <p className="text-muted leading-relaxed">{m.bio}</p>
      </motion.div>

      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.3em] text-muted">
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  );
}
