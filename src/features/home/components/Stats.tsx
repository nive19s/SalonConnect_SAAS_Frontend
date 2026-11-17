import { stats } from '@/data/content';
import { gsap } from '@/lib/scrollTrigger';
import { useGsap } from '@/hooks/useGsap';
import Section from '@/components/ui/Section';

export default function Stats() {
  const root = useGsap<HTMLDListElement>(() => {
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? '';
      const counter = { v: 0 };
      el.textContent = `0${suffix}`;
      gsap.to(counter, {
        v: end,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = `${Math.round(counter.v).toLocaleString('en-US')}${suffix}`; },
      });
    });
  }, []);

  return (
    <Section>
      <dl ref={root} className="grid gap-12 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="border-t border-ink pt-6">
            <dd className="font-display text-6xl md:text-7xl" data-count={s.value} data-suffix={s.suffix}>
              {s.value.toLocaleString('en-US')}{s.suffix}
            </dd>
            <dt className="mt-3 text-ash">{s.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}
