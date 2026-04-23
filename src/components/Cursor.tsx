'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
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
      const isInteractive = t.closest('a, button, input, textarea, label, [role="button"], [data-cursor-hover]');
      setHover(!!isInteractive);
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
    </>
  );
}
