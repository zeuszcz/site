import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import SplitText from '@/components/SplitText';
import { Mail, MessageCircle } from 'lucide-react';

export const metadata = { title: 'Контакты' };

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 md:pt-48 pb-20">
        <div className="container-x">
          <Reveal><span className="eyebrow">Контакты</span></Reveal>
          <h1 className="h-display mt-8 text-[clamp(3rem,8vw,7rem)] leading-[1.02] tracking-[-0.035em] max-w-5xl">
            <SplitText text="Давайте" />
            <span className="mr-[0.25em]" />
            <SplitText text="поговорим" delay={0.15} italic className="text-olive" />
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl text-lg md:text-xl text-muted leading-[1.55]">
              Расскажите о задаче — отвечаем в течение 24 часов.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32 md:pb-40">
        <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-start">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@innertalk.ru" className="group card p-8 md:p-10 flex items-start gap-5 hover:bg-surface2 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface2 text-fg">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted">Почта</div>
                  <div className="h-display text-xl md:text-2xl mt-1.5 group-hover:italic transition-all duration-300">hello@innertalk.ru</div>
                  <p className="text-sm text-muted mt-2">Отвечаем в рабочие часы по Мск</p>
                </div>
              </a>

              <a href="https://t.me/innertalk" className="group card p-8 md:p-10 flex items-start gap-5 hover:bg-surface2 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface2 text-fg">
                  <MessageCircle size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted">Telegram</div>
                  <div className="h-display text-xl md:text-2xl mt-1.5 group-hover:italic transition-all duration-300">@innertalk</div>
                  <p className="text-sm text-muted mt-2">Быстрая связь по проекту</p>
                </div>
              </a>

              <div className="card p-8 md:p-10 bg-surface2/50">
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-4">Часы работы</div>
                <div className="space-y-1.5 text-[15px]">
                  <div className="flex justify-between"><span>Пн — Пт</span><span className="text-muted font-mono">10:00 — 20:00</span></div>
                  <div className="flex justify-between"><span>Сб — Вс</span><span className="text-muted">выходной</span></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
