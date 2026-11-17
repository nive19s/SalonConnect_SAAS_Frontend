import { useEffect, useState } from 'react';
import { heroMedia } from '@/data/media';
import Img from '@/components/ui/Img';

// Skip video when the visitor asks for less motion or has Data Saver on.
const canPlayVideo = () =>
  !!heroMedia.video &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

/** Photo first (it is the LCP image); an optional video fades in once it can play. */
export default function HeroMedia() {
  const [playVideo, setPlayVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => setPlayVideo(canPlayVideo()), []);

  return (
    <div className="relative">
      <Img
        photo={heroMedia.photo}
        alt={heroMedia.alt}
        ratio="aspect-[4/5]"
        sizes="(min-width: 1024px) 40vw, 100vw"
        widths={[480, 800, 1200]}
        priority
      />
      {playVideo && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
          src={heroMedia.video}
          poster=""
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onCanPlay={() => setReady(true)}
        />
      )}
    </div>
  );
}
