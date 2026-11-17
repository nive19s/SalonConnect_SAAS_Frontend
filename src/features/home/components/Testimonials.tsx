import { testimonials } from '@/data/content';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Testimonials() {
  return (
    <Section>
      <SectionHeading title="What people say after their first booking." />
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.quote} className="flex flex-col justify-between border-t border-ink pt-6">
            <blockquote className="font-display text-2xl leading-snug">“{t.quote}”</blockquote>
            <figcaption className="mt-8 text-sm text-ash">{t.name}, {t.place}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
