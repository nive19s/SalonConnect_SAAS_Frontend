import { Notice } from '@/components/ui/Form';

interface Props {
  title: string;
  description: string;
  /** What the backend must ship before this page can work. */
  needs: string;
  planned?: string[];
}

/** Honest placeholder for journeys whose backend module does not exist yet. */
export default function ComingSoon({ title, description, needs, planned = [] }: Props) {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl">{title}</h1>
      <p className="mt-4 text-lg text-ash">{description}</p>
      <div className="mt-8"><Notice tone="info">Not available yet. Waiting for: {needs}</Notice></div>
      {planned.length > 0 && (
        <>
          <h2 className="mt-10 text-sm font-medium">Planned</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ash">
            {planned.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}
