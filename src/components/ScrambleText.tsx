'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  words: string[];
  className?: string;
  interval?: number;
  scrambleTime?: number;
};

const CHARS = 'абвгдежзийклмнопрстуфхцчшщъыьэюяABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';

export default function ScrambleText({ words, className = '', interval = 2800, scrambleTime = 450 }: Props) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState(words[0] || '');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIdx((x) => (x + 1) % words.length);
    }, interval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [words.length, interval]);

  useEffect(() => {
    const target = words[idx];
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / scrambleTime, 1);
      const revealCount = Math.floor(target.length * progress);

      let next = '';
      for (let i = 0; i < target.length; i++) {
        if (i < revealCount) {
          next += target[i];
        } else {
          next += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(target);
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [idx, words, scrambleTime]);

  return <span className={`${className} font-mono whitespace-nowrap`}>{display}</span>;
}
