import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

export default function Footer() {
  return (
    <footer id="newsletter" className="relative z-10 border-t border-line bg-bg">
      <div className="container-x py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fg">
              <span className="text-bg font-display font-semibold text-xs">i</span>
            </span>
            <span className="font-display font-medium tracking-tight text-[15px]">
              innertalk<span className="text-muted"> studio</span>
            </span>
          </Link>
          <p className="mt-5 text-[13px] text-muted leading-[1.6] max-w-[220px]">
            Студия полного цикла. Дизайн, разработка, бренд. С 2020 года.
          </p>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Сайт</h4>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link href="/services" className="text-muted hover:text-fg transition-colors">Услуги</Link></li>
            <li><Link href="/works" className="text-muted hover:text-fg transition-colors">Работы</Link></li>
            <li><Link href="/insights" className="text-muted hover:text-fg transition-colors">Инсайты</Link></li>
            <li><Link href="/about" className="text-muted hover:text-fg transition-colors">Студия</Link></li>
            <li><Link href="/careers" className="text-muted hover:text-fg transition-colors">Вакансии</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Связь</h4>
          <ul className="space-y-2.5 text-[14px] text-muted">
            <li><a href="mailto:hello@innertalk.ru" className="hover:text-fg transition-colors">hello@innertalk.ru</a></li>
            <li><a href="https://t.me/innertalk" className="hover:text-fg transition-colors">Telegram</a></li>
            <li><Link href="/start" className="hover:text-fg transition-colors">Начать проект</Link></li>
            <li><Link href="/book" className="hover:text-fg transition-colors">Записаться на созвон</Link></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-muted font-mono tracking-wider">
          <span>© {new Date().getFullYear()} INNERTALK STUDIO</span>
          <span className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1">
              <kbd className="border border-line bg-surface rounded px-1.5 py-0.5">⌘K</kbd>
              <span className="normal-case tracking-normal">быстрый поиск</span>
            </span>
            <span>SITE.INNERTALK.RU</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
