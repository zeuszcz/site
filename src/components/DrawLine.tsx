'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  width?: string;
  delay?: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
};

export default function DrawLine({ width = '100%', delay = 0, className = '', orientation = 'horizontal' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const isH = orientation === 'horizontal';
  return (
    <div ref={ref} className={`${className}`} style={{ width: isH ? width : '1px', height: isH ? '1px' : width }}>
      <motion.div
        initial={{ scaleX: isH ? 0 : 1, scaleY: isH ? 1 : 0 }}
        animate={inView ? { scaleX: 1, scaleY: 1 } : {}}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: isH ? '0% 50%' : '50% 0%' }}
        className="w-full h-full bg-fg"
      />
    </div>
  );
}
