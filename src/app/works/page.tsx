import WorksGrid from '@/components/WorksGrid';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import { listWorks } from '@/lib/storage';

export const metadata = { title: 'Работы' };
export const dynamic = 'force-dynamic';

export default async function WorksPage() {
  const works = await listWorks({ publishedOnly: true });

  return (
    <>
      <section className="pt-40 md:pt-48 pb-20 md:pb-24">
        <div className="container-x">
          <Reveal><span className="eyebrow">Портфолио</span></Reveal>
          <h1 className="h-display mt-8 text-[clamp(3rem,8vw,7rem)] leading-[1.02] tracking-[-0.035em]">
            <SplitText text="Наши" />
            <span className="mr-[0.25em]" />
            <SplitText text="работы" delay={0.12} italic className="text-muted" />
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted leading-[1.55]">
              Проекты, которые мы создавали — от ранних MVP до масштабных продуктовых релизов.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <WorksGrid works={works} />
        </div>
      </section>
    </>
  );
}
