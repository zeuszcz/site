import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-line bg-bg">
      <div className="container-x py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="h-display text-4xl md:text-5xl mb-6">
            Готовы обсудить <br/>
            <span className="text-accent">ваш проект?</span>
          </h3>
          <Link href="/contact" className="btn-primary">Написать нам</Link>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Навигация</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="text-fg/70 hover:text-accent transition-colors">Услуги</Link></li>
            <li><Link href="/works" className="text-fg/70 hover:text-accent transition-colors">Работы</Link></li>
            <li><Link href="/about" className="text-fg/70 hover:text-accent transition-colors">О нас</Link></li>
            <li><Link href="/contact" className="text-fg/70 hover:text-accent transition-colors">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Контакты</h4>
          <ul className="space-y-2 text-sm text-fg/70">
            <li><a href="mailto:hello@innertalk.ru" className="hover:text-accent">hello@innertalk.ru</a></li>
            <li>Россия</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} Innertalk Studio</span>
          <span className="font-mono">site.innertalk.ru</span>
        </div>
      </div>
    </footer>
  );
}
