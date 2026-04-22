import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="container-x text-center">
        <div className="h-display text-[22vw] md:text-[14rem] leading-none text-accent">404</div>
        <p className="text-xl text-fg/70 mt-6">Страница не найдена</p>
        <Link href="/" className="btn-primary mt-10 inline-flex">На главную</Link>
      </div>
    </div>
  );
}
