import type { Category, Service } from '@/types/domain';

export const categories: Category[] = [
  { id: 'hair', name: 'Hair', blurb: 'Cuts, colour, treatments and styling' },
  { id: 'nails', name: 'Nails', blurb: 'Manicures, pedicures and nail art' },
  { id: 'skin', name: 'Skin and facials', blurb: 'Cleanups, facials and skin care' },
  { id: 'bridal', name: 'Bridal', blurb: 'Makeup, saree draping and full packages' },
  { id: 'barber', name: 'Barber', blurb: 'Haircuts, beard trims and shaves' },
  { id: 'spa', name: 'Spa and massage', blurb: 'Relaxing treatments and body care' },
];

export const services: Service[] = [
  { id: 'svc-cut', categoryId: 'hair', name: 'Haircut and blow dry', durationMinutes: 45, price: 3500 },
  { id: 'svc-colour', categoryId: 'hair', name: 'Full colour', durationMinutes: 120, price: 12000 },
  { id: 'svc-treat', categoryId: 'hair', name: 'Keratin treatment', durationMinutes: 150, price: 18000 },
  { id: 'svc-mani', categoryId: 'nails', name: 'Gel manicure', durationMinutes: 60, price: 3000 },
  { id: 'svc-pedi', categoryId: 'nails', name: 'Spa pedicure', durationMinutes: 60, price: 3500 },
  { id: 'svc-facial', categoryId: 'skin', name: 'Deep cleansing facial', durationMinutes: 60, price: 6500 },
  { id: 'svc-bridal', categoryId: 'bridal', name: 'Bridal makeup', durationMinutes: 120, price: 35000 },
  { id: 'svc-beard', categoryId: 'barber', name: 'Cut and beard trim', durationMinutes: 45, price: 2500 },
  { id: 'svc-massage', categoryId: 'spa', name: 'Aromatherapy massage', durationMinutes: 60, price: 7500 },
];
