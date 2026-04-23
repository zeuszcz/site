import type { Metadata } from 'next';
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import ScrollProgress from '@/components/ScrollProgress';
import Cursor from '@/components/Cursor';
import BackToTop from '@/components/BackToTop';
import Loader from '@/components/Loader';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans', display: 'swap' });
const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-display', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Innertalk Studio — услуги и портфолио',
    template: '%s · Innertalk Studio',
  },
  description: 'Мы создаём продукты, которые звучат. Студия полного цикла: дизайн, разработка, бренд.',
  metadataBase: new URL('https://site.innertalk.ru'),
  openGraph: {
    title: 'Innertalk Studio',
    description: 'Студия полного цикла. Дизайн, разработка, бренд.',
    url: 'https://site.innertalk.ru',
    siteName: 'Innertalk Studio',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable} ${mono.variable}`}>
      <body className="paper font-sans bg-bg text-fg">
        <Loader />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Header />
        <PageTransition>
          <main className="relative z-10">{children}</main>
        </PageTransition>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
