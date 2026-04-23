'use client';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function Counter({ to, prefix = '', suffix = '', duration = 1.8, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, to, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{display}</span>
      {suffix}
    </span>
  );
}
