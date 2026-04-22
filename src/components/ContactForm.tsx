'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send } from 'lucide-react';

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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent mb-6">
          <Check size={32} />
        </div>
        <h3 className="h-display text-3xl mb-2">Спасибо!</h3>
        <p className="text-fg/70">Мы получили ваше сообщение и скоро ответим.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-accent underline">
          Отправить ещё одно
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted mb-2 block">Имя</label>
        <input id="name" name="name" type="text" required maxLength={100}
               className="w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-lg transition-colors" />
      </div>
      <div>
        <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted mb-2 block">Email</label>
        <input id="email" name="email" type="email" required maxLength={200}
               className="w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-lg transition-colors" />
      </div>
      <div>
        <label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted mb-2 block">Телефон (необязательно)</label>
        <input id="phone" name="phone" type="tel" maxLength={30}
               className="w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-lg transition-colors" />
      </div>
      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted mb-2 block">О проекте</label>
        <textarea id="message" name="message" required rows={5} maxLength={5000}
                  className="w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-lg transition-colors resize-none" />
      </div>
      {error && <p className="text-sm text-accent2">{error}</p>}
      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-4 self-start disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'sending' ? 'Отправка…' : <>Отправить <Send size={16} /></>}
      </button>
    </form>
  );
}
