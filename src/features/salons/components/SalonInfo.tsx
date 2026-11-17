import type { Salon } from '@/types/domain';

export default function SalonInfo({ salon }: { salon: Salon }) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <p className="max-w-prose text-lg leading-relaxed">{salon.about}</p>
      <dl className="space-y-5 text-sm">
        <div><dt className="text-ash">Address</dt><dd className="mt-1">{salon.address}</dd></div>
        <div><dt className="text-ash">Opening hours</dt><dd className="mt-1">{salon.hours}</dd></div>
        <div><dt className="text-ash">Phone</dt><dd className="mt-1"><a href={`tel:${salon.phone.replace(/\s/g, '')}`} className="link-underline">{salon.phone}</a></dd></div>
      </dl>
    </div>
  );
}
