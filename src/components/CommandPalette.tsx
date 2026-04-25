'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Mail, Calendar, Briefcase, FileText, Users, Sparkles, Zap } from 'lucide-react';

type Item = {
  group: string;
  title: string;
  subtitle?: string;
  href?: string;
  action?: () => void;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  keywords?: string;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items: Item[] = useMemo(() => [
    { group: 'Страницы', title: 'Главная',   href: '/',          icon: Sparkles,  keywords: 'home главная' },
    { group: 'Страницы', title: 'Услуги',    href: '/services',  icon: Zap,        keywords: 'services услуги' },
    { group: 'Страницы', title: 'Работы',    href: '/works',     icon: Briefcase,  keywords: 'works portfolio портфолио' },
    { group: 'Страницы', title: 'Инсайты',   href: '/insights',  icon: FileText,   keywords: 'insights blog блог' },
    { group: 'Страницы', title: 'Студия',    href: '/about',     icon: Users,      keywords: 'about team команда' },
    { group: 'Страницы', title: 'Вакансии',  href: '/careers',   icon: Users,      keywords: 'careers jobs работа' },
    { group: 'Страницы', title: 'Контакты',  href: '/contact',   icon: Mail,        keywords: 'contact связь' },

    { group: 'Действия', title: 'Начать проект', subtitle: 'Короткий бриф на 5 шагов', href: '/start',                    icon: ArrowRight, keywords: 'start brief project' },
    { group: 'Действия', title: 'Записаться на созвон', subtitle: '30 минут, бесплатно', href: '/book',                icon: Calendar,   keywords: 'book call meeting встреча' },
    { group: 'Действия', title: 'Написать на почту',      subtitle: 'hello@innertalk.ru', href: 'mailto:hello@innertalk.ru', icon: Mail,     keywords: 'email mail почта' },

    { group: 'Работы',   title: 'Ocea Cosmetics',     subtitle: 'Брендинг',     href: '/works/ocea-cosmetics-rebrand', icon: Briefcase, keywords: 'ocea brand' },
    { group: 'Работы',   title: 'FinEx SaaS',          subtitle: 'Продукт',      href: '/works/finex-saas-dashboard',   icon: Briefcase, keywords: 'finex saas' },
    { group: 'Работы',   title: 'Nordhaus',            subtitle: 'Лендинг',      href: '/works/nordhaus-landing',       icon: Briefcase, keywords: 'nordhaus landing' },
    { group: 'Работы',   title: 'Spark',               subtitle: 'Приложение',   href: '/works/spark-mobile-app',       icon: Briefcase, keywords: 'spark mobile' },
    { group: 'Работы',   title: 'Tableau',             subtitle: 'Айдентика',    href: '/works/tableau-restaurant',     icon: Briefcase, keywords: 'tableau brand' },

    { group: 'Инсайты',  title: 'Ускорили продакшн на 30%',   href: '/insights/faster-production',          icon: FileText, keywords: 'production process' },
    { group: 'Инсайты',  title: 'Дизайн-система как продукт', href: '/insights/design-system-as-product',   icon: FileText, keywords: 'design system' },
    { group: 'Инсайты',  title: 'MVP за 4 недели',             href: '/insights/mvp-in-4-weeks',             icon: FileText, keywords: 'mvp startup' },
    { group: 'Инсайты',  title: '3 ошибки в брендинге',        href: '/insights/startup-branding-mistakes',  icon: FileText, keywords: 'brand branding' },
  ], []);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((it) =>
      it.title.toLowerCase().includes(q) ||
      (it.subtitle?.toLowerCase().includes(q) ?? false) ||
      (it.keywords?.toLowerCase().includes(q) ?? false)
    );
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const item of filtered) {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    }
    return map;
  }, [filtered]);

  const flat = filtered;

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(flat.length - 1, a + 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const it = flat[active];
        if (it) execute(it);
      }
    };
    const onToggle = () => setOpen((o) => !o);
    window.addEventListener('keydown', onKey);
    window.addEventListener('cmd-palette:toggle', onToggle);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('cmd-palette:toggle', onToggle);
    };
  }, [open, flat, active]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [open]);

  function execute(it: Item) {
    setOpen(false);
    if (it.action) it.action();
    if (it.href) {
      if (it.href.startsWith('mailto:') || it.href.startsWith('http')) {
        window.location.href = it.href;
      } else {
        router.push(it.href);
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[250] bg-fg/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-bg border border-line rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(20,20,20,0.25)]"
          >
            <div className="flex items-center gap-3 px-5 border-b border-line">
              <Search size={16} strokeWidth={1.5} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по сайту…"
                className="flex-1 bg-transparent py-4 text-[15px] outline-none placeholder:text-muted"
              />
              <kbd className="font-mono text-[10px] text-muted border border-line rounded px-2 py-1">ESC</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {flat.length === 0 ? (
                <div className="px-5 py-12 text-center text-muted text-sm">Ничего не найдено</div>
              ) : (
                <div>
                  {Array.from(grouped.entries()).map(([group, groupItems]) => (
                    <div key={group} className="px-2 py-2">
                      <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted">
                        {group}
                      </div>
                      {groupItems.map((it) => {
                        const flatIdx = flat.indexOf(it);
                        const isActive = flatIdx === active;
                        const Icon = it.icon;
                        return (
                          <button
                            key={`${it.group}-${it.title}`}
                            onClick={() => execute(it)}
                            onMouseEnter={() => setActive(flatIdx)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                              isActive ? 'bg-olive-soft' : ''
                            }`}
                          >
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-olive text-bg' : 'bg-surface2 text-muted'}`}>
                              <Icon size={14} strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[14px] truncate">{it.title}</div>
                              {it.subtitle && <div className="text-[12px] text-muted truncate">{it.subtitle}</div>}
                            </div>
                            {isActive && <ArrowRight size={14} strokeWidth={1.5} className="text-muted shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-5 py-3 border-t border-line bg-surface2/50">
              <div className="flex items-center gap-4 text-[11px] text-muted">
                <span className="flex items-center gap-1.5">
                  <kbd className="font-mono border border-line bg-bg rounded px-1.5">↑</kbd>
                  <kbd className="font-mono border border-line bg-bg rounded px-1.5">↓</kbd>
                  навигация
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="font-mono border border-line bg-bg rounded px-1.5">↵</kbd>
                  выбрать
                </span>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted">
                {flat.length} результат{flat.length === 1 ? '' : flat.length < 5 ? 'а' : 'ов'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
