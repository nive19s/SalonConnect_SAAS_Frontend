import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

export default function FinalCta() {
  return (
    <Section className="border-t border-ink text-center">
      <h2 className="mx-auto max-w-3xl font-display text-display">Your next appointment is one tap away.</h2>
      <Button to="/salons" size="lg" className="mt-10">Book now</Button>
    </Section>
  );
}
