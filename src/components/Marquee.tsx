'use client';
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame, wrap } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  items: string[];
  baseSpeed?: number;
  className?: string;
};

export default function Marquee({ items, baseSpeed = 60, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 60, stiffness: 300 });
  const velocityFactor = useTransform(smoothVelocity, [0, 2000], [0, 5], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-1500, 1500], [4, -4]);
  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);

  const directionFactor = useRef(-1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * (baseSpeed / 100) * (delta / 1000) * 10;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ x, skewX }} className="flex gap-16 whitespace-nowrap will-change-transform">
        {[...items, ...items, ...items, ...items].map((item, i) => (
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
