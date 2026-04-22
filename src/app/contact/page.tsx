import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { Mail, MessageCircle } from 'lucide-react';

export const metadata = { title: 'Контакты' };

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-16">
        <div className="container-x">
          <Reveal><span className="eyebrow">Контакты</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display mt-6 text-6xl md:text-8xl tracking-tighter max-w-5xl">
              Давайте <span className="text-accent italic">поговорим</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg text-fg/70">
              Расскажите о задаче — мы отвечаем в течение 24 часов.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-x grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="card p-8 md:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@innertalk.ru" className="card p-8 group">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface2 text-accent">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted">Почта</div>
                    <div className="h-display text-2xl mt-1 group-hover:text-accent transition-colors">hello@innertalk.ru</div>
                    <p className="text-sm text-fg/70 mt-2">Отвечаем в рабочие часы по Мск</p>
                  </div>
                </div>
              </a>

              <a href="https://t.me/innertalk" className="card p-8 group">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface2 text-accent">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted">Telegram</div>
                    <div className="h-display text-2xl mt-1 group-hover:text-accent transition-colors">@innertalk</div>
                    <p className="text-sm text-fg/70 mt-2">Быстрая связь по проекту</p>
                  </div>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
