// Marketplace types. The marketplace, catalogue, scheduling and booking modules do not exist in the
// backend yet, so these are served by src/mocks/marketplaceApi.ts. Replace with API types as modules ship.

export interface Category { id: string; name: string; blurb: string }

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  durationMinutes: number;
  price: number;
}

export interface Salon {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviews: number;
  categories: string[];
  address: string;
  phone: string;
  hours: string;
  about: string;
  cover: string;
  gallery: string[];
}

export interface Stylist { id: string; name: string; role: string }

export interface Review { id: string; name: string; rating: number; date: string; service: string; text: string }

export interface Slot { time: string; available: boolean }

export interface BookingDetails { name: string; phone: string; email: string; notes: string }

export type AppointmentStatus = 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  salonId: string;
  salonName: string;
  service: Service;
  stylist: Stylist;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  details: BookingDetails;
}

export interface BookingPayload {
  salonId: string;
  service: Service;
  stylist: Stylist;
  date: string;
  time: string;
  details: BookingDetails;
}
