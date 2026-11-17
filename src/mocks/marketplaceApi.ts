import { salons, stylists } from '@/data/salons';
import { services } from '@/data/services';
import { reviewPool } from '@/data/reviews';
import { generateSlots } from '@/lib/slots';
import { nextDays } from '@/lib/dates';
import type { Appointment, BookingPayload, Review, Salon, Service, Slot, Stylist } from '@/types/domain';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * MOCK. The marketplace, catalogue, scheduling and booking modules are not built in the backend yet.
 * Every function returns a Promise, so replacing these with real requests changes no component.
 */
export async function getSalons(): Promise<Salon[]> {
  await wait(250);
  return salons;
}

export async function getSalon(id: string): Promise<Salon | null> {
  await wait(150);
  return salons.find((s) => s.id === id) ?? null;
}

export async function getServices(salonId: string): Promise<Service[]> {
  await wait(150);
  const salon = salons.find((s) => s.id === salonId);
  return salon ? services.filter((svc) => salon.categories.includes(svc.categoryId)) : [];
}

export async function getStylists(): Promise<Stylist[]> {
  await wait(100);
  return stylists;
}

export async function getReviews(salonId: string): Promise<Review[]> {
  await wait(200);
  const start = Math.max(0, salons.findIndex((s) => s.id === salonId));
  return Array.from({ length: 5 }, (_, i) => reviewPool[(start + i) % reviewPool.length]);
}

export async function getSlots(params: { date: string; stylistId: string; durationMinutes: number }): Promise<Slot[]> {
  await wait(250);
  return generateSlots(params);
}

// ---- appointments (in memory; resets on reload) ---------------------------------------------

const [soon] = nextDays(3).slice(2);
const appointments: Appointment[] = [
  {
    id: 'GLM-DEMO01', salonId: 'lumen-studio', salonName: 'Lumen Studio',
    service: services[0], stylist: stylists[1], date: soon, time: '10:30', status: 'CONFIRMED',
    details: { name: '', phone: '', email: '', notes: '' },
  },
  {
    id: 'GLM-DEMO02', salonId: 'the-loft-salon', salonName: 'The Loft Salon',
    service: services[3], stylist: stylists[2], date: '2026-10-02', time: '14:00', status: 'COMPLETED',
    details: { name: '', phone: '', email: '', notes: '' },
  },
];

export async function createBooking(payload: BookingPayload): Promise<Appointment> {
  await wait(700);
  const salon = salons.find((s) => s.id === payload.salonId);
  const booking: Appointment = {
    id: `GLM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    salonId: payload.salonId,
    salonName: salon?.name ?? 'Salon',
    service: payload.service,
    stylist: payload.stylist,
    date: payload.date,
    time: payload.time,
    status: 'CONFIRMED',
    details: payload.details,
  };
  appointments.unshift(booking);
  return booking;
}

export async function getMyAppointments(): Promise<Appointment[]> {
  await wait(250);
  return [...appointments];
}

export async function getMyAppointment(id: string): Promise<Appointment | null> {
  await wait(150);
  return appointments.find((a) => a.id === id) ?? null;
}

export async function cancelMyAppointment(id: string): Promise<Appointment | null> {
  await wait(400);
  const found = appointments.find((a) => a.id === id);
  if (found && found.status === 'CONFIRMED') found.status = 'CANCELLED';
  return found ?? null;
}
