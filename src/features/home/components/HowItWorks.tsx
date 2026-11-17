import { steps } from '@/data/content';
import { gsap } from '@/lib/scrollTrigger';
import { useGsap } from '@/hooks/useGsap';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

export default function HowItWorks() {
  const root = useGsap(() => {
    // The rail fills as the visitor scrolls through the three steps.
    gsap.fromTo(
      '[data-rail-fill]',
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '[data-steps]', start: 'top 60%', end: 'bottom 70%', scrub: true } },
    );
    gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
      gsap.fromTo(step, { opacity: 0.25 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: step, start: 'top 75%', end: 'top 50%', scrub: true } });
    });
  }, []);

  return (
    <Section id="how-it-works" className="bg-bone">
      <div ref={root}>
        <SectionHeading title="Three steps from “I need a trim” to “see you Saturday”." />
        <div data-steps className="relative mt-16 md:ml-4">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-line md:left-[19px]" aria-hidden>
            <div data-rail-fill className="h-full w-full bg-ink" />
          </div>
          <ol className="space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <li key={s.title} data-step className="relative pl-14 md:pl-20">
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm text-paper md:h-10 md:w-10">
                  {i + 1}
                </span>
                <h3 className="font-display text-3xl md:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-lg text-lg leading-relaxed text-ash">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
