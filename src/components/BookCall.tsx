'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Clock, ArrowRight } from 'lucide-react';

const SLOTS = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

function nextBusinessDays(count: number) {
  const days: Date[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < count) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export default function BookCall() {
  const days = useMemo(() => nextBusinessDays(7), []);
  const [day, setDay] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', topic: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  const canBook = day && slot && form.name.length >= 2 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);

  async function submit() {
    if (!canBook) return;
    setStatus('sending');
    setMsg('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...form,
          day: day!.toISOString(),
          slot,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'error');
      setStatus('ok');
    } catch (e: any) {
      setStatus('err');
      setMsg(e.message);
    }
  }

  if (status === 'ok') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto text-center py-20"
      >
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-fg text-fg mb-8">
          <Check size={24} strokeWidth={1.5} />
        </div>
        <h2 className="h-display text-4xl mb-4">Забронировали.</h2>
        <p className="text-muted text-lg">
          {day!.getDate()} {months[day!.getMonth()]} в {slot}. Напишем на {form.email} с подтверждением и ссылкой на встречу.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-10 md:gap-16 items-start">
      <div>
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-5">
            <Calendar size={14} strokeWidth={1.5} /> 01 · Дата
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
            {days.map((d) => {
              const selected = day && day.toDateString() === d.toDateString();
              return (
                <button
                  key={d.toISOString()}
                  onClick={() => { setDay(d); setSlot(null); }}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selected
                      ? 'border-olive bg-olive text-bg'
                      : 'border-line hover:border-olive/50 bg-surface'
                  }`}
                >
                  <div className={`text-[10px] uppercase tracking-widest ${selected ? 'text-bg/70' : 'text-muted'}`}>
                    {weekdays[d.getDay()]}
                  </div>
                  <div className="h-display text-2xl mt-1">{d.getDate()}</div>
                  <div className={`text-[10px] font-mono ${selected ? 'text-bg/70' : 'text-muted'}`}>
                    {months[d.getMonth()].slice(0, 3)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {day && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-5">
                <Clock size={14} strokeWidth={1.5} /> 02 · Время (Мск)
              </div>
              <div className="flex flex-wrap gap-2">
                {SLOTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                      slot === s
                        ? 'bg-olive text-bg'
                        : 'border border-line text-fg hover:border-olive hover:text-olive'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {day && slot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-5">03 · Контакты</div>
              <div className="space-y-5">
                <Field label="Имя"            value={form.name}    onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Email"          value={form.email}   onChange={(v) => setForm({ ...form, email: v })} type="email" />
                <Field label="Компания"       value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                <Field label="О чём поговорить (необязательно)" value={form.topic}   onChange={(v) => setForm({ ...form, topic: v })} />
              </div>
              {msg && <p className="mt-4 text-sm text-accent2">{msg}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:sticky lg:top-28 bg-surface border border-line rounded-2xl p-8 md:p-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-6">Ваша встреча</div>

        <div className="space-y-3 text-[15px]">
          <div className="flex justify-between">
            <span className="text-muted">Тип</span>
            <span>Discovery call</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Длительность</span>
            <span>30 минут</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Формат</span>
            <span>Google Meet</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Дата</span>
            <span>{day ? `${day.getDate()} ${months[day.getMonth()]}` : '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Время</span>
            <span>{slot ? `${slot} Мск` : '—'}</span>
          </div>
        </div>

        <div className="my-8 h-px bg-line" />

        <p className="text-[13px] text-muted leading-[1.55] mb-8">
          После брони пришлём подтверждение на почту и Google Meet ссылку. Можно отменить за 3 часа до встречи.
        </p>

        <button
          onClick={submit}
          disabled={!canBook || status === 'sending'}
          className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Бронирование…' : <>Забронировать <ArrowRight size={14} /></>}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.22em] text-muted mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={200}
        className="w-full bg-transparent border-b border-line focus:border-olive outline-none py-3 text-[16px] transition-colors"
      />
    </div>
  );
}
