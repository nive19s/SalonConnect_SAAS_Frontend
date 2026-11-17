import { ownerPoints } from '@/data/content';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { Check } from '@/components/ui/Icons';

export default function ForSalons() {
  return (
    <Section id="for-salons" tone="dark">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            tone="dark"
            title="Run your salon from one calendar."
            text="Glamora gives owners and stylists a simple booking system that fills chairs and keeps the day on schedule."
          />
          <Button to="/register-salon" variant="inverse" size="lg" className="mt-10">List your salon</Button>
        </div>
        <ul className="space-y-5">
          {ownerPoints.map((p) => (
            <li key={p} className="flex items-start gap-4 border-b border-paper/20 pb-5 text-lg">
              <Check className="mt-1 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
