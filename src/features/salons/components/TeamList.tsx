import type { Stylist } from '@/types/domain';

export default function TeamList({ team }: { team: Stylist[] }) {
  return (
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
      {team.filter((t) => t.id !== 'any').map((t) => (
        <li key={t.id}>
          <span className="flex aspect-square items-center justify-center bg-bone font-display text-5xl" aria-hidden>
            {t.name[0]}
          </span>
          <p className="mt-3 font-medium">{t.name}</p>
          <p className="text-sm text-ash">{t.role}</p>
        </li>
      ))}
    </ul>
  );
}
