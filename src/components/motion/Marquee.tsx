import { memo } from 'react';

/** Pure CSS marquee (no JS cost). The duplicate track is hidden from assistive tech. */
function Marquee({ items }: { items: string[] }) {
  const track = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="px-6 font-display text-3xl md:px-10 md:text-5xl">
          {item}
          <span className="ml-12 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle md:ml-20" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-ink py-6">
      <div className="flex w-max animate-marquee">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}

export default memo(Marquee);
