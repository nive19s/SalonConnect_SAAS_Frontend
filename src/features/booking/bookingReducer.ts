import type { BookingDetails, Service, Stylist, Appointment } from '@/types/domain';

export const STEPS = ['Service', 'Stylist', 'Time', 'Details'] as const;

export interface BookingState {
  step: number;
  service: Service | null;
  stylist: Stylist | null;
  date: string | null;
  time: string | null;
  details: BookingDetails;
  booking: Appointment | null; // set once the booking is confirmed
}

export const initialState: BookingState = {
  step: 0,
  service: null,
  stylist: null,
  date: null,
  time: null,
  details: { name: '', phone: '', email: '', notes: '' },
  booking: null,
};

export type BookingAction =
  | { type: 'selectService'; service: Service }
  | { type: 'selectStylist'; stylist: Stylist }
  | { type: 'selectDate'; date: string }
  | { type: 'selectTime'; time: string }
  | { type: 'setDetails'; patch: Partial<BookingDetails> }
  | { type: 'prefillDetails'; patch: Pick<BookingDetails, 'name' | 'email' | 'phone'> }
  | { type: 'goTo'; step: number }
  | { type: 'next' }
  | { type: 'confirmed'; booking: Appointment }
  | { type: 'reset' };

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'selectService':
      return { ...state, service: action.service, date: null, time: null, step: 1 };
    case 'selectStylist':
      return { ...state, stylist: action.stylist, date: null, time: null, step: 2 };
    case 'selectDate':
      return { ...state, date: action.date, time: null };
    case 'selectTime':
      return { ...state, time: action.time };
    case 'setDetails':
      return { ...state, details: { ...state.details, ...action.patch } };
    case 'prefillDetails': {
      const d = state.details;
      return { ...state, details: { name: d.name || action.patch.name, email: d.email || action.patch.email, phone: d.phone || action.patch.phone, notes: d.notes } };
    }
    case 'goTo':
      return { ...state, step: Math.max(0, Math.min(action.step, STEPS.length - 1)) };
    case 'next':
      return { ...state, step: Math.min(state.step + 1, STEPS.length - 1) };
    case 'confirmed':
      return { ...state, booking: action.booking };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}
