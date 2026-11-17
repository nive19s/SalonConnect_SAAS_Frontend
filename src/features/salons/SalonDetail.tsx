import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getReviews, getSalon, getServices, getStylists } from '@/mocks/marketplaceApi';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import Stars from '@/components/ui/Stars';
import SalonGallery from './components/SalonGallery';
import SectionNav from './components/SectionNav';
import ServiceMenu from './components/ServiceMenu';
import TeamList from './components/TeamList';
import ReviewList from './components/ReviewList';
import SalonInfo from './components/SalonInfo';

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-36 py-12 md:py-16">
      <h2 className="mb-8 font-display text-3xl md:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

export default function SalonDetail() {
  const { salonId = '' } = useParams();
  const salon = useAsync(() => getSalon(salonId), [salonId]);
  const services = useAsync(() => getServices(salonId), [salonId]);
  const team = useAsync(getStylists, []);
  const reviews = useAsync(() => getReviews(salonId), [salonId]);

  useDocumentTitle(salon.data?.name);

  if (salon.loading) return <Container><Spinner label="Loading salon" /></Container>;
  if (!salon.data) {
    return (
      <Container className="py-24">
        <h1 className="font-display text-display">Salon not found</h1>
        <Button to="/salons" className="mt-8">Browse salons</Button>
      </Container>
    );
  }

  const s = salon.data;

  return (
    <Container className="py-8 md:py-12">
      <Link to="/salons" className="link-underline text-sm">Back to all salons</Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-display">{s.name}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-ash">
            <span className="flex items-center gap-2 text-ink"><Stars value={s.rating} /> {s.rating} ({s.reviews} reviews)</span>
            <span>{s.area}</span>
          </p>
        </div>
        <Button href="#services" size="lg">Choose a service</Button>
      </div>

      <div className="mt-8"><SalonGallery salon={s} /></div>

      <div className="mt-10 grid gap-x-16 lg:grid-cols-[1fr_20rem]">
        <div>
          <SectionNav />
          <Block id="services" title="Services">
            <ServiceMenu salonId={s.id} services={services.data ?? []} loading={services.loading} />
          </Block>
          <Block id="team" title="Team">
            {team.loading || !team.data ? <Spinner label="Loading team" /> : <TeamList team={team.data} />}
          </Block>
          <Block id="reviews" title="Reviews">
            <ReviewList salon={s} reviews={reviews.data} loading={reviews.loading} />
          </Block>
          <Block id="about" title="About"><SalonInfo salon={s} /></Block>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-32 mt-16 border border-ink p-6">
            <p className="font-display text-2xl">Book at {s.name}</p>
            <p className="mt-3 text-sm text-ash">{s.hours}</p>
            <p className="mt-1 text-sm text-ash">{s.address}</p>
            <Button href="#services" className="mt-6 w-full">Choose a service</Button>
          </div>
        </aside>
      </div>
    </Container>
  );
}
