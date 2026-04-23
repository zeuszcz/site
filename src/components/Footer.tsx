import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg">
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
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Связь</h4>
          <ul className="space-y-2.5 text-[14px] text-muted">
            <li><a href="mailto:hello@innertalk.ru" className="hover:text-fg transition-colors">hello@innertalk.ru</a></li>
            <li><a href="https://t.me/innertalk" className="hover:text-fg transition-colors">Telegram</a></li>
            <li><Link href="/contact" className="hover:text-fg transition-colors">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Часы</h4>
          <ul className="space-y-2.5 text-[14px] text-muted">
            <li>Пн — Пт · 10–20</li>
            <li>Москва</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-muted font-mono tracking-wider">
          <span>© {new Date().getFullYear()} INNERTALK STUDIO</span>
          <span>SITE.INNERTALK.RU</span>
        </div>
      </div>
    </footer>
  );
}
