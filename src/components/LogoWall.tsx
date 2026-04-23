'use client';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Ocea',       style: 'italic' },
  { name: 'FinEx',      style: 'mono' },
  { name: 'Nordhaus',   style: 'regular' },
  { name: 'TABLEAU',    style: 'spaced' },
  { name: 'Spark',      style: 'italic' },
  { name: 'volna',      style: 'lower' },
  { name: 'Meridian',   style: 'regular' },
  { name: 'Paperhouse', style: 'spaced' },
];

function logoClass(style: string) {
  switch (style) {
    case 'italic':  return 'italic';
    case 'mono':    return 'font-mono tracking-tight text-[0.85em]';
    case 'spaced':  return 'tracking-[0.3em] text-[0.75em]';
    case 'lower':   return 'lowercase';
    default:        return '';
  }
}

export default function LogoWall() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
      {brands.map((b, i) => (
        <motion.div
          key={b.name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: i * 0.04 }}
          className="relative bg-surface h-28 md:h-36 flex items-center justify-center group transition-colors hover:bg-surface2"
        >
          <span className={`font-display text-2xl md:text-3xl tracking-tight text-fg transition-all duration-500 group-hover:text-muted ${logoClass(b.style)}`}>
            {b.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
