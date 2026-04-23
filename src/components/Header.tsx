'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import MagneticButton from '@/components/MagneticButton';

const nav = [
  { href: '/services', label: 'Услуги' },
  { href: '/works', label: 'Работы' },
  { href: '/about', label: 'О нас' },
  { href: '/contact', label: 'Контакты' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-bg/80 border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-fg">
            <span className="text-bg font-display font-semibold text-xs">i</span>
          </span>
          <span className="font-display font-medium tracking-tight text-base">
            innertalk<span className="text-muted"> studio</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative text-sm transition-colors ${active ? 'text-fg' : 'text-muted hover:text-fg'}`}
              >
                {n.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 h-[1px] w-full bg-fg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:inline-flex">
          <MagneticButton href="/contact" className="btn-primary text-xs">
            Обсудить проект
          </MagneticButton>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-full border border-line"
          aria-label="Меню"
          data-cursor-hover
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg border-b border-line"
          >
            <div className="container-x py-6 flex flex-col gap-4">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="py-2 text-lg text-muted hover:text-fg transition-colors">
                  {n.label}
                </Link>
              ))}
              <Link href="/contact" className="btn-primary mt-2 self-start text-xs">
                Обсудить проект
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
