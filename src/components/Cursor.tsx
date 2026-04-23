'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string>('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.35 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest('a, button, input, textarea, label, [role="button"], [data-cursor-hover]') as HTMLElement | null;
      setHover(!!interactive);
      const labelEl = t.closest('[data-cursor-label]') as HTMLElement | null;
      setLabel(labelEl?.dataset.cursorLabel || '');
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hover ? 3.2 : 1, opacity: hover ? 0.9 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 h-3 w-3 rounded-full bg-fg mix-blend-difference pointer-events-none z-[200]"
      />
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hover ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 h-1 w-1 rounded-full bg-fg mix-blend-difference pointer-events-none z-[201]"
      />
      <AnimatePresence>
        {label && (
          <motion.div
            key={label}
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.22 }}
            className="fixed top-0 left-0 pointer-events-none z-[202] font-mono text-[10px] tracking-[0.2em] uppercase text-bg bg-fg px-3 py-1.5 rounded-full whitespace-nowrap"
          >
            <span className="block translate-x-[18px] translate-y-[12px]">{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
