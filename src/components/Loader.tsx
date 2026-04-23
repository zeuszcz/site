'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [show, setShow] = useState(true);
  const [seen, setSeen] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const visited = sessionStorage.getItem('innertalk-loaded');
    if (visited) {
      setShow(false);
      return;
    }
    setSeen(false);
    const t = setTimeout(() => {
      sessionStorage.setItem('innertalk-loaded', '1');
      setShow(false);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  if (seen) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[300] bg-bg flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-fg">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-fg/30"
                />
                <span className="text-bg font-display font-semibold text-base">i</span>
              </span>
              <span className="font-display text-2xl tracking-tight">
                innertalk<span className="text-muted"> studio</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted"
            >
              Loading experience
            </motion.div>

            <div className="relative h-[2px] w-48 bg-line overflow-hidden rounded-full">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-1/2 bg-fg"
              />
            </div>
          </div>

          <div className="absolute bottom-8 inset-x-0 flex justify-between px-10 font-mono text-[10px] tracking-[0.3em] uppercase text-muted">
            <span>Ink &amp; Linen · 2026</span>
            <span>v 0.2</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
