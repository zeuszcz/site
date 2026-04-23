import WorksGrid from '@/components/WorksGrid';
import Reveal from '@/components/Reveal';
import { listWorks } from '@/lib/storage';

export const metadata = { title: 'Работы' };
export const dynamic = 'force-dynamic';

export default async function WorksPage() {
  const works = await listWorks({ publishedOnly: true });

  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="container-x">
          <Reveal><span className="eyebrow">Портфолио</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display mt-8 text-6xl md:text-8xl tracking-[-0.03em]">
              Наши <span className="italic text-muted">работы</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg text-muted leading-relaxed">
              Проекты, которые мы создавали — от ранних MVP до масштабных продуктовых релизов.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <WorksGrid works={works} />
        </div>
      </section>
    </>
  );
}
