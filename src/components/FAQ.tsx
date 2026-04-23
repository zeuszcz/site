'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const faq = [
  {
    q: 'Сколько стоит проект?',
    a: 'Зависит от скоупа. Брендинг от 250 000 ₽, лендинг — от 400 000 ₽, веб-сервис — от 1 000 000 ₽. После короткого звонка присылаем вилку и план на этапы.',
  },
  {
    q: 'Как устроен процесс?',
    a: 'Дискавери → дизайн → согласование → разработка → тестирование → запуск. Раз в неделю — демо, где показываем прогресс и принимаем правки.',
  },
  {
    q: 'Сколько времени занимает проект?',
    a: 'Брендинг — 3-5 недель, лендинг — 4-8 недель, веб-сервис — от 3 месяцев. Сроки фиксируем в договоре, буфер на правки закладываем честно.',
  },
  {
    q: 'Работаете с уже существующим продуктом?',
    a: 'Да. Регулярно делаем аудит, редизайн, ускорение. Если продукт живой — это даже интереснее: сразу видно, что болит и где копать.',
  },
  {
    q: 'Кому принадлежат исходники?',
    a: 'Вам. Передаём все файлы — Figma, репозитории, дизайн-систему, доступы к инфраструктуре. Лицензии на шрифты и стоки — тоже на ваше имя.',
  },
  {
    q: 'А если не понравится результат?',
    a: 'Мы фиксируем KPI и критерии приёмки на старте — так риск «не понравится» минимален. Если всё же что-то не зашло — переделываем в рамках фазы без доп. оплаты.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <button
            key={i}
            onClick={() => setOpen(isOpen ? null : i)}
            className="py-8 md:py-10 text-left flex items-start justify-between gap-6 group transition-colors"
          >
            <div className="flex-1">
              <div className="h-display text-xl md:text-2xl leading-[1.3]">{item.q}</div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-5 max-w-2xl text-base md:text-[17px] text-muted leading-[1.6]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 mt-1 text-muted group-hover:text-fg transition-colors"
            >
              <Plus size={22} strokeWidth={1.2} />
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}
