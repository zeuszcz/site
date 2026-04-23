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
    }, 900);
    return () => clearTimeout(t);
  }, []);

  if (seen) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[300] bg-bg flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fg text-bg font-display font-semibold text-sm">
              i
            </span>
            <span className="font-display text-xl tracking-tight">
              innertalk<span className="text-muted"> studio</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
