'use client';
import { motion } from 'framer-motion';

type Props = {
  items: string[];
  speed?: number;
  className?: string;
};

export default function Marquee({ items, speed = 40, className = '' }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        className="flex gap-16 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-16 shrink-0">
            <span className="font-display text-4xl md:text-6xl lg:text-7xl text-fg tracking-[-0.02em]">
              {item}
            </span>
            <span className="text-muted text-4xl md:text-6xl lg:text-7xl">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
