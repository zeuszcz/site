'use client';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const types = [
  { id: 'landing',  label: 'Лендинг',              base: 400_000 },
  { id: 'website',  label: 'Корпоративный сайт',   base: 800_000 },
  { id: 'brand',    label: 'Брендинг',             base: 450_000 },
  { id: 'product',  label: 'Веб-сервис / SaaS',    base: 1_500_000 },
  { id: 'mobile',   label: 'Мобильное приложение', base: 2_200_000 },
];

const complexities = [
  { label: 'Базовая',    factor: 1 },
  { label: 'Средняя',    factor: 1.35 },
  { label: 'Сложная',    factor: 1.8 },
  { label: 'Enterprise', factor: 2.4 },
];

const timelines = [
  { label: 'Не спешим (стандарт)', factor: 1 },
  { label: 'Активный темп',        factor: 1.15 },
  { label: 'Срочно',               factor: 1.35 },
];

export default function PriceEstimator() {
  const [typeId, setTypeId] = useState(types[1].id);
  const [complexity, setComplexity] = useState(1);
  const [timeline, setTimeline] = useState(0);
  const [extras, setExtras] = useState({ research: false, motion: false, cms: false, i18n: false });

  const price = useMemo(() => {
    const t = types.find((x) => x.id === typeId)!;
    let p = t.base * complexities[complexity].factor * timelines[timeline].factor;
    if (extras.research) p += 150_000;
    if (extras.motion)   p += 200_000;
    if (extras.cms)      p += 180_000;
    if (extras.i18n)     p += 120_000;
    return p;
  }, [typeId, complexity, timeline, extras]);

  const low = Math.round(price * 0.85 / 10000) * 10000;
  const high = Math.round(price * 1.2 / 10000) * 10000;

  const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽';

  return (
    <div className="relative grid md:grid-cols-[1fr_380px] gap-10 md:gap-16 items-start">
      <div className="space-y-10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-mono mb-4">01 · Тип проекта</div>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeId(t.id)}
                data-cursor-hover
                className={`px-4 py-2.5 rounded-full text-sm transition-all ${
                  typeId === t.id
                    ? 'bg-fg text-bg'
                    : 'border border-line text-muted hover:text-fg hover:border-fg'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-mono mb-4">02 · Сложность</div>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={complexities.length - 1}
              step={1}
              value={complexity}
              onChange={(e) => setComplexity(parseInt(e.target.value))}
              className="w-full accent-fg"
            />
            <div className="mt-3 flex justify-between text-[11px] text-muted font-mono uppercase tracking-widest">
              {complexities.map((c, i) => (
                <span key={i} className={i === complexity ? 'text-fg' : ''}>{c.label}</span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-mono mb-4">03 · Сроки</div>
          <div className="flex flex-wrap gap-2">
            {timelines.map((t, i) => (
              <button
                key={i}
                onClick={() => setTimeline(i)}
                data-cursor-hover
                className={`px-4 py-2.5 rounded-full text-sm transition-all ${
                  timeline === i
                    ? 'bg-fg text-bg'
                    : 'border border-line text-muted hover:text-fg hover:border-fg'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-mono mb-4">04 · Что ещё</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { k: 'research', label: 'UX-исследование', price: 150 },
              { k: 'motion',   label: 'Motion дизайн',    price: 200 },
              { k: 'cms',      label: 'CMS / админка',    price: 180 },
              { k: 'i18n',     label: 'Мультиязычность',  price: 120 },
            ].map((opt) => {
              const active = (extras as any)[opt.k] as boolean;
              return (
                <button
                  key={opt.k}
                  onClick={() => setExtras({ ...extras, [opt.k]: !active })}
                  data-cursor-hover
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all text-sm ${
                    active
                      ? 'bg-fg text-bg'
                      : 'border border-line text-fg hover:border-fg hover:bg-surface2'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className={`font-mono text-xs ${active ? 'text-bg/70' : 'text-muted'}`}>+{opt.price}k ₽</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-28 bg-surface border border-line rounded-2xl p-8 md:p-10">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-mono mb-6">Ориентировочно</div>

        <motion.div
          key={`${low}-${high}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-display text-4xl md:text-5xl leading-tight mb-2"
        >
          {fmt(low)}
        </motion.div>
        <div className="font-mono text-xs text-muted">— {fmt(high)}</div>

        <div className="my-8 h-px bg-line" />

        <ul className="space-y-2 text-sm text-muted">
          <li>· Вилка, не окончательная цена</li>
          <li>· Точная смета — после 30-минутного созвона</li>
          <li>· Включает дизайн, разработку, QA и запуск</li>
          <li>· Без NDA — работаем прозрачно</li>
        </ul>

        <Link
          href="/contact"
          className="btn-primary w-full justify-center mt-8"
          data-cursor-hover
        >
          Обсудить проект
        </Link>
      </div>
    </div>
  );
}
