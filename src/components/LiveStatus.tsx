'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LiveStatus() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' })));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const hours = now.getHours();
  const isOnline = hours >= 10 && hours < 20;
  const dayIdx = now.getDay();
  const isWeekend = dayIdx === 0 || dayIdx === 6;

  const statusText = isWeekend
    ? 'Выходной · Ответим в понедельник'
    : isOnline
      ? 'В студии · отвечаем в течение 2ч'
      : 'Вне часов · ответ утром';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden"
    >
      <div className="bg-surface p-6 md:p-8 flex items-center gap-4">
        <motion.div
          animate={{ scale: isOnline ? [1, 1.4, 1] : 1, opacity: isOnline ? [0.6, 1, 0.6] : 0.4 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className={`h-2.5 w-2.5 rounded-full shrink-0 ${isOnline ? 'bg-fg' : 'bg-muted'}`}
        />
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono mb-1">Статус</div>
          <div className="text-sm">{statusText}</div>
        </div>
      </div>

      <div className="bg-surface p-6 md:p-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono mb-1">В работе</div>
        <div className="text-sm">
          <span className="font-display text-2xl mr-2">4</span>
          <span className="text-muted">проекта · сейчас</span>
        </div>
      </div>

      <div className="bg-surface p-6 md:p-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono mb-1">Свободны для</div>
        <div className="text-sm">
          <span className="font-display text-2xl mr-2">2</span>
          <span className="text-muted">новых клиентов в мае</span>
        </div>
      </div>
    </motion.div>
  );
}
