'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const types = [
  { id: 'brand',    label: 'Бренд',               desc: 'Айдентика, логотип, гайдлайны' },
  { id: 'landing',  label: 'Лендинг / Сайт',      desc: 'Маркетинговый сайт, одностраничник' },
  { id: 'web',      label: 'Веб-приложение',      desc: 'SaaS, дашборд, сервис' },
  { id: 'mobile',   label: 'Мобильное приложение',desc: 'iOS / Android / React Native' },
  { id: 'system',   label: 'Дизайн-система',      desc: 'Токены, компоненты, документация' },
  { id: 'other',    label: 'Другое',              desc: 'Расскажем вам на созвоне' },
];

const budgets = [
  '< 500 000 ₽',
  '500 000 – 1 500 000 ₽',
  '1 500 000 – 3 000 000 ₽',
  '3 000 000 – 7 000 000 ₽',
  '> 7 000 000 ₽',
  'Пока не знаю',
];

const timelines = [
  'Как можно быстрее',
  '1 – 2 месяца',
  '3 – 6 месяцев',
  '6+ месяцев',
  'Гибко, нет жёсткого дедлайна',
];

export default function BriefWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({
    type: '',
    goal: '',
    timeline: '',
    budget: '',
    company: '',
    website: '',
    name: '',
    email: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const total = 5;
  const progress = ((step + 1) / total) * 100;

  function update(field: string, value: any) { setData({ ...data, [field]: value }); }

  function canNext() {
    switch (step) {
      case 0: return !!data.type;
      case 1: return data.goal && data.goal.length >= 20;
      case 2: return data.timeline && data.budget;
      case 3: return data.company && data.company.length >= 2;
      case 4: return data.name && data.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email);
      default: return false;
    }
  }

  async function submit() {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/briefs', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Ошибка');
      setDone(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl py-20 text-center mx-auto"
      >
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-fg text-fg mb-8">
          <Check size={24} strokeWidth={1.5} />
        </div>
        <h2 className="h-display text-4xl md:text-5xl mb-4">Спасибо.</h2>
        <p className="text-muted text-lg">Мы получили ваш бриф и ответим в течение рабочего дня. Обычно за 2-4 часа.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10 md:mb-14">
        <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
          Шаг {step + 1} / {total}
        </div>
        <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
          {Math.round(progress)}%
        </div>
      </div>
      <div className="relative h-[2px] bg-line mb-14 md:mb-20">
        <motion.div
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 bg-olive"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <>
              <h2 className="h-display text-3xl md:text-5xl mb-4 leading-[1.1]">Что нужно сделать?</h2>
              <p className="text-muted mb-10">Выберите ближайший тип проекта.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {types.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => update('type', t.id)}
                    className={`text-left p-6 rounded-2xl border-2 transition-all ${
                      data.type === t.id
                        ? 'border-olive bg-olive-soft/60'
                        : 'border-line hover:border-olive/50 bg-surface2/50'
                    }`}
                  >
                    <div className="h-display text-xl mb-1">{t.label}</div>
                    <div className="text-sm text-muted">{t.desc}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="h-display text-3xl md:text-5xl mb-4 leading-[1.1]">Расскажите о задаче</h2>
              <p className="text-muted mb-10">
                Что решаем, для кого, какой результат ожидаете. Минимум 20 символов.
              </p>
              <textarea
                autoFocus
                rows={8}
                value={data.goal}
                onChange={(e) => update('goal', e.target.value)}
                placeholder="Нам нужно..."
                maxLength={3000}
                className="w-full bg-surface border border-line rounded-xl p-5 focus:border-olive outline-none transition-colors text-[16px] leading-[1.55] resize-none"
              />
              <div className="mt-2 text-xs text-muted font-mono">{data.goal.length} / 3000</div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="h-display text-3xl md:text-5xl mb-4 leading-[1.1]">Сроки и бюджет</h2>
              <p className="text-muted mb-10">Нам нужна общая картина — не окончательные цифры.</p>

              <div className="mb-10">
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-4">Когда нужно готовое?</div>
                <div className="flex flex-wrap gap-2">
                  {timelines.map((t) => (
                    <button
                      key={t}
                      onClick={() => update('timeline', t)}
                      className={`px-4 py-2.5 rounded-full text-sm transition-all ${
                        data.timeline === t
                          ? 'bg-olive text-bg'
                          : 'border border-line text-fg hover:border-olive hover:text-olive'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-4">Примерный бюджет</div>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      onClick={() => update('budget', b)}
                      className={`px-4 py-2.5 rounded-full text-sm transition-all ${
                        data.budget === b
                          ? 'bg-olive text-bg'
                          : 'border border-line text-fg hover:border-olive hover:text-olive'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="h-display text-3xl md:text-5xl mb-4 leading-[1.1]">О компании</h2>
              <p className="text-muted mb-10">Поможет быстрее войти в контекст.</p>

              <div className="space-y-6">
                <WizardInput label="Название компании" value={data.company} onChange={(v) => update('company', v)} autoFocus />
                <WizardInput label="Сайт (если есть)" type="url" value={data.website} onChange={(v) => update('website', v)} placeholder="https://..." />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="h-display text-3xl md:text-5xl mb-4 leading-[1.1]">Как с вами связаться?</h2>
              <p className="text-muted mb-10">Ответим в рабочее время — обычно в течение 2-4 часов.</p>

              <div className="space-y-6">
                <WizardInput label="Ваше имя" value={data.name} onChange={(v) => update('name', v)} autoFocus />
                <WizardInput label="Email" type="email" value={data.email} onChange={(v) => update('email', v)} />
                <WizardInput label="Телефон / Telegram (необязательно)" value={data.phone} onChange={(v) => update('phone', v)} />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {error && <p className="mt-6 text-sm text-accent2">{error}</p>}

      <div className="mt-16 flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={14} /> Назад
        </button>

        {step < total - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Дальше <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!canNext() || submitting}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Отправка…' : <>Отправить бриф <ArrowRight size={14} /></>}
          </button>
        )}
      </div>
    </div>
  );
}

function WizardInput({ label, value, onChange, type = 'text', placeholder, autoFocus }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.22em] text-muted mb-3 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={200}
        className="w-full bg-transparent border-b border-line focus:border-olive outline-none py-3 text-[17px] transition-colors"
      />
    </div>
  );
}
