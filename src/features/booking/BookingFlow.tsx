import { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { createBooking, getSalon, getServices } from '@/mocks/marketplaceApi';
import { useAsync } from '@/hooks/useAsync';
import { useAuth } from '@/features/auth/AuthProvider';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { bookingReducer, initialState } from './bookingReducer';
import Stepper from './components/Stepper';
import ServiceStep from './components/ServiceStep';
import StylistStep from './components/StylistStep';
import TimeStep from './components/TimeStep';
import DetailsStep from './components/DetailsStep';
import Summary from './components/Summary';
import Confirmation from './components/Confirmation';

const TITLES = ['Choose a service', 'Choose a stylist', 'Pick a day and time', 'Your details'];

export default function BookingFlow() {
  const { salonId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const presetServiceId = searchParams.get('service');

  const { data: salon, loading } = useAsync(() => getSalon(salonId), [salonId]);
  const { data: salonServices } = useAsync(() => getServices(salonId), [salonId]);
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const [submitting, setSubmitting] = useState(false);
  const { me } = useAuth();

  // Signed-in customers do not retype their details.
  useEffect(() => {
    if (me) dispatch({ type: 'prefillDetails', patch: { name: me.fullName, email: me.email, phone: me.phone ?? '' } });
  }, [me]);

  // Arriving from a salon page with ?service=... skips straight to choosing a stylist.
  const presetApplied = useRef(false);
  useEffect(() => {
    if (presetApplied.current || !salonServices) return;
    presetApplied.current = true;
    const service = salonServices.find((s) => s.id === presetServiceId);
    if (service) dispatch({ type: 'selectService', service });
  }, [salonServices, presetServiceId]);

  // Each step change is a small, user-triggered transition.
  const panel = useGsap(() => {
    gsap.fromTo('[data-panel]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' });
  }, [state.step, state.booking, !!salon]);

  if (loading) return <Container><Spinner label="Loading salon" /></Container>;
  if (!salon) {
    return (
      <Container className="py-24">
        <h1 className="font-display text-display">Salon not found</h1>
        <Button to="/salons" className="mt-8">Browse salons</Button>
      </Container>
    );
  }

  const confirm = async () => {
    if (!state.service || !state.stylist || !state.date || !state.time) return;
    setSubmitting(true);
    const booking = await createBooking({
      salonId: salon.id,
      service: state.service,
      stylist: state.stylist,
      date: state.date,
      time: state.time,
      details: state.details,
    });
    setSubmitting(false);
    dispatch({ type: 'confirmed', booking });
  };

  if (state.booking) {
    return (
      <Container className="py-16 md:py-24">
        <div ref={panel}>
          <div data-panel>
            <Confirmation booking={state.booking} salon={salon} onReset={() => dispatch({ type: 'reset' })} />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 md:py-16">
      <Link to={`/salons/${salon.id}`} className="link-underline text-sm">Back to {salon.name}</Link>
      <h1 className="mt-6 font-display text-display">Book at {salon.name}</h1>
      <div className="mt-10"><Stepper current={state.step} onNavigate={(step) => dispatch({ type: 'goTo', step })} /></div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div ref={panel}>
          <div data-panel>
            <h2 className="mb-6 font-display text-3xl">{TITLES[state.step]}</h2>

            {state.step === 0 && (
              <ServiceStep salonId={salon.id} selected={state.service} onSelect={(service) => dispatch({ type: 'selectService', service })} />
            )}
            {state.step === 1 && (
              <StylistStep selected={state.stylist} onSelect={(stylist) => dispatch({ type: 'selectStylist', stylist })} />
            )}
            {state.step === 2 && state.service && state.stylist && (
              <>
                <TimeStep
                  service={state.service}
                  stylist={state.stylist}
                  date={state.date}
                  time={state.time}
                  onDate={(date) => dispatch({ type: 'selectDate', date })}
                  onTime={(time) => dispatch({ type: 'selectTime', time })}
                />
                <Button size="lg" className="mt-10 w-full sm:w-auto" disabled={!state.date || !state.time} onClick={() => dispatch({ type: 'next' })}>
                  Continue
                </Button>
              </>
            )}
            {state.step === 3 && (
              <DetailsStep details={state.details} onChange={(patch) => dispatch({ type: 'setDetails', patch })} onSubmit={confirm} submitting={submitting} />
            )}
          </div>
        </div>
        <Summary salon={salon} state={state} />
      </div>
    </Container>
  );
}
