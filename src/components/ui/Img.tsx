import { useState } from 'react';
import { cn } from '@/lib/cn';
import { photoSrcSet, photoUrl } from '@/lib/media';

/**
 * Responsive, lazy photo with a graceful fallback if the image fails to load.
 * `ratio` is a Tailwind aspect class (e.g. "aspect-[4/3]"). Use `priority` only
 * for the single largest above-the-fold image.
 */
interface Props {
  photo: string;
  alt: string;
  sizes?: string;
  widths?: number[];
  ratio?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

export default function Img({ photo, alt, sizes = '100vw', widths, ratio, priority = false, className, imgClassName }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-bone', ratio, className)}>
      {failed ? (
        <span className="absolute inset-0 flex items-center justify-center font-display text-6xl text-ash" aria-hidden>
          {alt?.[0]}
        </span>
      ) : (
        <img
          src={photoUrl(photo, 800)}
          srcSet={photoSrcSet(photo, widths)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      )}
    </div>
  );
}
