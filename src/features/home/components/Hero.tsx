import { gsap } from '@/lib/gsap';
import { useGsap } from '@/hooks/useGsap';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { ArrowRight } from '@/components/ui/Icons';
import HeroMedia from './HeroMedia';

const lines = ['Beauty,', 'booked in', 'a minute.'];

export default function Hero() {
  const root = useGsap(() => {
    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    intro
      .from('[data-line]', { yPercent: 110, duration: 1.1, stagger: 0.12 })
      .from('[data-fade]', { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.1 }, '-=0.5')
      // The photo is revealed by a wipe while it settles from a slight zoom.
      .from('[data-hero-media]', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut' }, 0.1)
      .from('[data-hero-media] img', { scale: 1.25, duration: 1.8 }, 0.1);
  }, []);

  return (
    <section ref={root} className="overflow-hidden">
      <Container className="grid items-center gap-12 py-12 md:py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <h1 className="font-display text-hero">
            {lines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span data-line className="block">{line}</span>
              </span>
            ))}
          </h1>
          <p data-fade className="mt-8 max-w-md text-lg leading-relaxed text-ash">
            Find a salon, choose your stylist and lock in a time that suits you. No calls, no waiting for replies.
          </p>
          <div data-fade className="mt-10 flex flex-wrap gap-3">
            <Button to="/salons" size="lg">Find a salon <ArrowRight /></Button>
            <Button to="/register-salon" variant="outline" size="lg">List your salon</Button>
          </div>
        </div>
        <div data-hero-media className="mx-auto w-full max-w-md lg:max-w-none">
          <HeroMedia />
        </div>
      </Container>
    </section>
  );
}
