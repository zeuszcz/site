'use client';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  italic?: boolean;
  tag?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
};

const charVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function SplitText({
  text,
  className,
  delay = 0,
  speed = 0.025,
  italic = false,
  tag = 'span',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const words = text.split(' ');
  let charIndex = 0;

  const Tag = tag as any;

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, wi) => {
        const chars = Array.from(word);
        return (
          <span key={wi} className="inline-block mr-[0.25em] whitespace-nowrap align-baseline">
            {chars.map((c, ci) => {
              const myDelay = delay + (charIndex++) * speed;
              return (
                <span key={ci} className="inline-block overflow-hidden align-baseline">
                  <motion.span
                    custom={myDelay}
                    variants={charVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className={`inline-block ${italic ? 'italic' : ''}`}
                  >
                    {c}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
