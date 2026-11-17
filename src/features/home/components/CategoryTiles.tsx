import { Link } from 'react-router-dom';
import { categories } from '@/data/services';
import { categoryPhotos } from '@/data/media';
import Img from '@/components/ui/Img';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CategoryTiles() {
  return (
    <Section id="services">
      <SectionHeading title="Whatever you are booking, start here." text="Pick a category to see salons that offer it near you." />
      <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {categories.map((c) => (
          <li key={c.id}>
            <Link to={`/salons?category=${c.id}`} className="group relative block overflow-hidden">
              <Img
                photo={categoryPhotos[c.id as keyof typeof categoryPhotos]}
                alt={`${c.name} treatments`}
                ratio="aspect-[4/5]"
                sizes="(min-width: 768px) 33vw, 50vw"
                widths={[320, 480, 720]}
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-paper md:p-6">
                <h3 className="font-display text-2xl md:text-4xl">{c.name}</h3>
                <p className="mt-1 hidden text-sm text-paper/80 md:block">{c.blurb}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
