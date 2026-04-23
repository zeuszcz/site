'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticButton({ href, children, className, strength = 0.22 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 240, damping: 20, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      data-cursor-hover
    >
      <Link href={href} className={className}>
        <span className="inline-flex items-center gap-2 pointer-events-none">{children}</span>
      </Link>
    </motion.div>
  );
}
