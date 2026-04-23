import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import SplitText from '@/components/SplitText';
import { Mail, MessageCircle } from 'lucide-react';

export const metadata = { title: 'Контакты' };

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-16">
        <div className="container-x">
          <Reveal><span className="eyebrow">Контакты</span></Reveal>
          <h1 className="h-display mt-8 text-6xl md:text-8xl tracking-[-0.03em] max-w-5xl">
            <SplitText text="Давайте" />
            <span className="mr-[0.25em]" />
            <SplitText text="поговорим" delay={0.15} italic className="text-muted" />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg text-muted leading-relaxed">
              Расскажите о задаче — мы отвечаем в течение 24 часов.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-x grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="card p-8 md:p-12">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@innertalk.ru" className="card p-10 group">
                <div className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-fg">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-muted">Почта</div>
                    <div className="h-display text-2xl mt-1 group-hover:italic transition-all duration-300">hello@innertalk.ru</div>
                    <p className="text-sm text-muted mt-2">Отвечаем в рабочие часы по Мск</p>
                  </div>
                </div>
              </a>

              <a href="https://t.me/innertalk" className="card p-10 group">
                <div className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-fg">
                    <MessageCircle size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-muted">Telegram</div>
                    <div className="h-display text-2xl mt-1 group-hover:italic transition-all duration-300">@innertalk</div>
                    <p className="text-sm text-muted mt-2">Быстрая связь по проекту</p>
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
