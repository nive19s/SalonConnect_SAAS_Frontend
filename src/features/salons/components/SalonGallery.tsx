import Img from '@/components/ui/Img';
import type { Salon } from '@/types/domain';

export default function SalonGallery({ salon }: { salon: Salon }) {
  const photos = [salon.cover, ...salon.gallery];
  return (
    <div className="grid grid-cols-2 gap-2 md:h-[30rem] md:grid-cols-4 md:grid-rows-2">
      {photos.map((photo, i) => (
        <Img
          key={`${photo}-${i}`}
          photo={photo}
          alt={i === 0 ? `Inside ${salon.name}` : `${salon.name} photo ${i}`}
          ratio="aspect-[4/3] md:aspect-auto"
          className={i === 0 ? 'col-span-2 md:row-span-2 md:h-full' : 'md:h-full'}
          sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
          widths={i === 0 ? [640, 960, 1400] : [320, 480, 720]}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
