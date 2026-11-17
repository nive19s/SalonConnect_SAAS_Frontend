import { Link } from 'react-router-dom';
import { categories } from '@/data/services';
import Img from '@/components/ui/Img';
import type { Salon } from '@/types/domain';
import Stars from '@/components/ui/Stars';

const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

export default function SalonCard({ salon }: { salon: Salon }) {
  return (
    <article className="group relative flex flex-col">
      <Img
        photo={salon.cover}
        alt={`Inside ${salon.name}`}
        ratio="aspect-[4/3]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        widths={[400, 640, 960]}
        imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl">
            {/* Stretched link: the whole card is clickable, one tab stop per card. */}
            <Link to={`/salons/${salon.id}`} className="after:absolute after:inset-0">{salon.name}</Link>
          </h3>
          <p className="flex shrink-0 items-center gap-1.5 text-sm">
            <Stars value={1} size={14} />
            {salon.rating}
            <span className="text-ash">({salon.reviews})</span>
          </p>
        </div>
        <p className="mt-1 text-sm text-ash">{salon.area}</p>
        <p className="mt-3 text-sm">{salon.categories.map(categoryName).join(', ')}</p>
      </div>
    </article>
  );
}
