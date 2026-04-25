'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'error');
      setStatus('ok');
      setEmail('');
    } catch (e: any) {
      setStatus('err');
      setMsg(e.message);
    }
  }

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-5">Рассылка</div>
      <p className="text-[13px] text-muted mb-4 leading-[1.55]">Раз в месяц — только то, что стоит времени. Без спама.</p>

      <AnimatePresence mode="wait">
        {status === 'ok' ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-[13px] text-fg"
          >
            <Check size={16} strokeWidth={1.5} />
            Подписались. До встречи в почте.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              maxLength={200}
              className="flex-1 min-w-0 bg-transparent border-b border-line focus:border-olive outline-none py-2.5 text-[14px] transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              aria-label="Подписаться"
              className="h-10 w-10 shrink-0 rounded-full bg-olive text-bg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
            >
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === 'err' && <p className="mt-3 text-[12px] text-accent2">{msg}</p>}
    </div>
  );
}
