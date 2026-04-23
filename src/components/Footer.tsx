import Link from 'next/link';
import MagneticButton from '@/components/MagneticButton';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-line bg-surface2">
      <div className="container-x py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <h3 className="h-display text-5xl md:text-6xl mb-8 max-w-2xl">
            Готовы обсудить <br/>
            <span className="italic text-muted">ваш проект?</span>
          </h3>
          <MagneticButton href="/contact" className="btn-primary">Написать нам</MagneticButton>
        </div>

        <div className="md:col-span-3">
          <h4 className="eyebrow mb-6">Навигация</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/services" className="text-muted hover:text-fg hover:underline underline-offset-4 transition-colors">Услуги</Link></li>
            <li><Link href="/works" className="text-muted hover:text-fg hover:underline underline-offset-4 transition-colors">Работы</Link></li>
            <li><Link href="/insights" className="text-muted hover:text-fg hover:underline underline-offset-4 transition-colors">Инсайты</Link></li>
            <li><Link href="/about" className="text-muted hover:text-fg hover:underline underline-offset-4 transition-colors">О нас</Link></li>
            <li><Link href="/contact" className="text-muted hover:text-fg hover:underline underline-offset-4 transition-colors">Контакты</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="eyebrow mb-6">Контакты</h4>
          <ul className="space-y-3 text-sm text-muted">
            <li><a href="mailto:hello@innertalk.ru" className="hover:text-fg hover:underline underline-offset-4">hello@innertalk.ru</a></li>
            <li>Россия</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} Innertalk Studio</span>
          <span className="font-mono tracking-wider">SITE.INNERTALK.RU</span>
        </div>
      </div>
    </footer>
  );
}
