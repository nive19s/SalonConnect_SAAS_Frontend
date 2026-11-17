import type { Review } from '@/types/domain';

// Mock review pool. getReviews() in services/api.js hands each salon a rotating slice.
export const reviewPool: Review[] = [
  { id: 'r1', name: 'Anushka R.', rating: 5, date: '2026-10-21', service: 'Haircut and blow dry', text: 'Exactly the cut I showed in my photo. Ishara listened first, then started. Easy to book and they were on time.' },
  { id: 'r2', name: 'Meera S.', rating: 5, date: '2026-10-14', service: 'Full colour', text: 'My colour looks natural and even after three weeks. They explained the aftercare clearly.' },
  { id: 'r3', name: 'Tharindu W.', rating: 4, date: '2026-10-09', service: 'Gel manicure', text: 'Clean, careful work and a calm room. I waited ten minutes past my slot, but they apologised and it was worth it.' },
  { id: 'r4', name: 'Kavya N.', rating: 5, date: '2026-09-30', service: 'Deep cleansing facial', text: 'The best facial I have had in Sri Lanka. My skin felt clear for days.' },
  { id: 'r5', name: 'Sachini D.', rating: 5, date: '2026-09-22', service: 'Bridal makeup', text: 'They did my trial and the wedding morning. The makeup lasted all day, even in the heat.' },
  { id: 'r6', name: 'Rohan P.', rating: 5, date: '2026-09-18', service: 'Cut and beard trim', text: 'Sharp lines and no fuss. Booking online meant no waiting around.' },
  { id: 'r7', name: 'Dilini F.', rating: 4, date: '2026-09-05', service: 'Aromatherapy massage', text: 'Very relaxing. The room could be a little warmer, but the therapist was excellent.' },
  { id: 'r8', name: 'Priya K.', rating: 5, date: '2026-08-28', service: 'Spa pedicure', text: 'Spotless tools and a lovely finish. I rebooked before I left.' },
];

// Shape of the rating bars (mock). Real data comes from the reviews API.
export const ratingBreakdown = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 2 },
  { stars: 1, percent: 1 },
];
