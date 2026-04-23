'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LiveTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const moscow = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
      const hh = String(moscow.getHours()).padStart(2, '0');
      const mm = String(moscow.getMinutes()).padStart(2, '0');
      setTime(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="hidden lg:flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="h-1.5 w-1.5 rounded-full bg-fg"
      />
      MSK {time}
    </span>
  );
}
