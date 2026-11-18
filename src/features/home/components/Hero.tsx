
import { gsap } from '@/lib/gsap';
import { useGsap } from '@/hooks/useGsap';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { ArrowRight } from '@/components/ui/Icons';
import HeroMedia from './HeroMedia';

const lines = ['Beauty,', 'booked in', 'a minute.'];

export default function Hero() {
  const root = useGsap(() => {
    const intro = gsap.timeline({
      defaults: { ease: 'power4.out' },
    });

    intro
      .from('[data-line]', {
        yPercent: 110,
        duration: 1,
        stagger: 0.12,
      })
      .from(
        '[data-fade]',
        {
          autoAlpha: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.1,
        },
        '-=0.5'
      )
      .from(
        '[data-service-card]',
        {
          autoAlpha: 0,
          y: 35,
          scale: 0.9,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        },
        0.2
      );
  }, []);

  return (
    <section ref={root} className="overflow-hidden">
      <Container className="grid items-center gap-8 py-12 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 xl:gap-12">

        {/* LEFT - CONTENT */}
        <div className="order-1 relative z-10 max-w-xl">
          <span
            data-fade
            className="mb-6 inline-flex items-center rounded-full border border-black/15 px-4 py-2 text-sm"
          >
            ✦ Your Beauty, Our Priority
          </span>

          <h1 className="font-display text-[clamp(3.5rem,5.5vw,6rem)] leading-[0.96] tracking-[-0.045em]">
  {lines.map((line, index) => (
    <span
      key={line}
      className="block overflow-hidden pb-[0.06em]"
    >
      <span
        data-line
        className={`block ${
          index === 2 ? 'italic text-[#b8792b]' : ''
        }`}
      >
        {line}
      </span>
    </span>
  ))}
</h1>

          <p
            data-fade
            className="mt-7 max-w-md text-base leading-relaxed text-ash md:text-lg"
          >
            Find a salon, choose your stylist and lock in a time
            that suits you. No calls, no waiting for replies.
          </p>

          <div data-fade className="mt-8 flex flex-wrap gap-3">
            <Button to="/salons" size="lg">
              Find a salon <ArrowRight />
            </Button>

            <Button to="/register-salon" variant="outline" size="lg">
              List your salon
            </Button>
          </div>
        </div>

        {/* RIGHT - IMAGE COLLAGE */}
        <div className="order-2 min-w-0 w-full">
          <HeroMedia />
        </div>

      </Container>
    </section>
  );
}
