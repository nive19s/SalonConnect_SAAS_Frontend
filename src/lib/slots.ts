import type { Slot } from '@/types/domain';

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const toHHMM = (mins: number) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

// Small deterministic hash so mock "taken" slots are stable between renders.
const hash = (str: string) => [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

/**
 * Mock availability. The real implementation lives on the server
 * (working hours - time off - existing bookings).
 */
interface SlotParams { date: string; stylistId: string; durationMinutes: number; open?: string; close?: string; step?: number }

export function generateSlots({ date, stylistId, durationMinutes, open = '09:00', close = '18:00', step = 30 }: SlotParams): Slot[] {
  const slots: Slot[] = [];
  for (let t = toMinutes(open); t + durationMinutes <= toMinutes(close); t += step) {
    const time = toHHMM(t);
    slots.push({ time, available: hash(`${stylistId}|${date}|${time}`) % 4 !== 0 });
  }
  return slots;
}
