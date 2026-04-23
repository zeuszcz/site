'use client';
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame, wrap } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  items: string[];
  baseSpeed?: number;
  className?: string;
  direction?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
};

const SIZES = {
  sm: 'text-xl md:text-2xl',
  md: 'text-2xl md:text-4xl',
  lg: 'text-3xl md:text-5xl',
};

export default function Marquee({ items, baseSpeed = 40, className = '', direction = 'left', size = 'md' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 60, stiffness: 300 });
  const velocityFactor = useTransform(smoothVelocity, [0, 2000], [0, 3], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);

  const directionFactor = useRef(direction === 'left' ? -1 : 1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * (baseSpeed / 100) * (delta / 1000) * 10;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const textSize = SIZES[size];

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex gap-20 whitespace-nowrap will-change-transform">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className={`font-display ${textSize} text-muted tracking-[-0.01em] shrink-0`}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
