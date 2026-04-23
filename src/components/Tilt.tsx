'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  max?: number;
  perspective?: number;
  scale?: number;
};

export default function Tilt({ children, className, max = 6, perspective = 1000, scale = 1.015 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 22, mass: 0.5 });
  const rotY = useTransform(sx, (v) => v * max);
  const rotX = useTransform(sy, (v) => -v * max);
  const s = useMotionValue(1);
  const ss = useSpring(s, { stiffness: 250, damping: 22 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 2);
    y.set(py * 2);
  }
  function onEnter() { s.set(scale); }
  function onLeave() {
    x.set(0);
    y.set(0);
    s.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        perspective,
        rotateX: rotX,
        rotateY: rotY,
        scale: ss,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
