import { Link } from 'react-router-dom';
import { categories } from '@/data/services';
import { categoryPhotos } from '@/data/media';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/Icons';
import Section from '@/components/ui/Section';

const categoryIcons: Record<string, string> = {
  hair: 'M8 3v6m8-6v6M6 9c0 3 2 5 6 5s6-2 6-5M9 14l-3 7m9-7 3 7',
  nails: 'M9 3h6v15H9zM9 18H7a2 2 0 0 0-2 2v1h10v-1a2 2 0 0 0-2-2',
  skin: 'M12 3c-1.5 3-6 5.2-6 9a6 6 0 0 0 12 0c0-3.8-4.5-6-6-9Z',
  bridal: 'm12 3 2.2 4.5 5 .7-3.6 3.5.8 5-4.4-2.3-4.4 2.3.8-5-3.6-3.5 5-.7L12 3Z',
  barber: 'M4 13c2-3 4-3 8 0s6 3 8 0M4 17c2-3 4-3 8 0s6 3 8 0',
  spa: 'M12 4c-4 0-6 3-6 5s2 3 6 3 6-1 6-3-2-5-6-5Zm0 8v8m-5 0h10',
};

export default function CategoryTiles() {
  return (
    <Section id="services" className="relative overflow-hidden !bg-[#fcf8f5]">
      <div className="pointer-events-none absolute -right-32 -top-56 h-[38rem] w-[38rem] rounded-full border border-[#d49a4a]/70" aria-hidden />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <header className="max-w-2xl">
          <h2 className="font-display text-display">
            Whatever you are booking, <em className="text-[#b8792b]">start here.</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ash">Pick a category to see salons that offer it near you.</p>
        </header>
        <Button to="/salons" variant="outline" size="md" className="shrink-0 self-start md:self-auto">
          View all services <ArrowRight />
        </Button>
      </div>
      <ul className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-8 md:grid-cols-3 md:gap-5">
        {categories.map((c) => (
          <li key={c.id}>
            <Link
              to={`/salons?category=${c.id}`}
              className="group relative block overflow-hidden rounded-[1.4rem] border border-white/80 shadow-[0_8px_24px_rgba(74,49,32,0.12)]"
            >
              <Img
                photo={categoryPhotos[c.id as keyof typeof categoryPhotos]}
                alt={`${c.name} treatments`}
                ratio="aspect-[1.62]"
                sizes="(min-width: 768px) 33vw, 50vw"
                widths={[320, 480, 720]}
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 text-paper md:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-black/10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
                    <path d={categoryIcons[c.id]} />
                  </svg>
                </span>
                <span className="min-w-0">
                  <h3 className="font-display text-2xl leading-none md:text-3xl">{c.name}</h3>
                  <p className="mt-1 text-xs text-paper/85 md:text-sm">{c.blurb}</p>
                </span>
                <span className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
