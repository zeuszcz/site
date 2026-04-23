'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${res.status}`);
      }
      setStatus('sent');
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-fg text-fg mb-8">
          <Check size={24} strokeWidth={1.5} />
        </div>
        <h3 className="h-display text-3xl mb-3">Спасибо.</h3>
        <p className="text-muted">Мы получили ваше сообщение и скоро ответим.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-fg underline underline-offset-4 hover:text-muted">
          Отправить ещё одно
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Field label="Имя" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Телефон (необязательно)" name="phone" type="tel" />
      <div>
        <label htmlFor="message" className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2 block">О проекте</label>
        <textarea id="message" name="message" required rows={5} maxLength={5000}
                  className="w-full bg-transparent border-b border-line focus:border-fg outline-none py-3 text-base transition-colors resize-none" />
      </div>
      {error && <p className="text-sm text-accent2">{error}</p>}
      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-4 self-start disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'sending' ? 'Отправка…' : <>Отправить <ArrowRight size={14} /></>}
      </button>
    </form>
  );
}

function Field({ label, name, type = 'text', required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-[10px] uppercase tracking-[0.22em] text-muted mb-2 block">{label}</label>
      <input id={name} name={name} type={type} required={required} maxLength={200}
             className="w-full bg-transparent border-b border-line focus:border-fg outline-none py-3 text-base transition-colors" />
    </div>
  );
}
