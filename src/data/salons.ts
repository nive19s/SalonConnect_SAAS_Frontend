import type { Salon, Stylist } from '@/types/domain';
import { salonPhotos } from './media';

const base: Omit<Salon, 'cover' | 'gallery'>[] = [
  {
    id: 'lumen-studio', name: 'Lumen Studio', area: 'Colombo 03', rating: 4.9, reviews: 212,
    categories: ['hair', 'skin', 'bridal'],
    address: '42 Galle Road, Colombo 03', phone: '+94 11 234 5678', hours: '9:00 am – 6:00 pm, Monday to Saturday',
    about: 'A calm, light-filled studio known for precision cuts, natural colour and bridal makeup. Every stylist trains in-house, so the standard is the same whoever you book.',
  },
  {
    id: 'the-loft-salon', name: 'The Loft Salon', area: 'Colombo 07', rating: 4.8, reviews: 164,
    categories: ['hair', 'nails'],
    address: '15 Independence Avenue, Colombo 07', phone: '+94 11 269 1122', hours: '10:00 am – 7:00 pm, every day',
    about: 'A relaxed loft space for hair and nails. Walk-ins are welcome, but booking guarantees your preferred stylist.',
  },
  {
    id: 'hill-country-beauty', name: 'Hill Country Beauty', area: 'Kandy', rating: 4.7, reviews: 98,
    categories: ['hair', 'skin', 'spa'],
    address: '8 Peradeniya Road, Kandy', phone: '+94 81 222 3344', hours: '9:00 am – 6:00 pm, Tuesday to Sunday',
    about: 'Hair, skin and spa treatments in a quiet space with views of the hills. Popular for facial packages and long massage sessions.',
  },
  {
    id: 'fort-barber-co', name: 'Fort Barber Co.', area: 'Galle', rating: 4.8, reviews: 131,
    categories: ['barber'],
    address: '21 Church Street, Galle Fort', phone: '+94 91 223 4455', hours: '9:00 am – 8:00 pm, Monday to Saturday',
    about: 'A classic barber shop inside the Fort. Sharp cuts, hot-towel shaves and beard shaping, with no rush.',
  },
  {
    id: 'nila-nails', name: 'Nila Nails', area: 'Jaffna', rating: 4.9, reviews: 76,
    categories: ['nails', 'skin'],
    address: '5 Hospital Road, Jaffna', phone: '+94 21 222 6677', hours: '9:00 am – 6:00 pm, Monday to Saturday',
    about: 'Gel, acrylic and nail art by a small team that cares about detail, plus simple skin treatments to match.',
  },
  {
    id: 'serene-spa', name: 'Serene Spa and Salon', area: 'Negombo', rating: 4.6, reviews: 87,
    categories: ['spa', 'hair', 'bridal'],
    address: '30 Lewis Place, Negombo', phone: '+94 31 222 8899', hours: '9:00 am – 7:00 pm, every day',
    about: 'A beachside spa and salon offering massage, hair and bridal packages for the whole wedding party.',
  },
];

export const salons: Salon[] = base.map((s) => ({ ...s, ...salonPhotos[s.id as keyof typeof salonPhotos] }));

export const stylists: Stylist[] = [
  { id: 'any', name: 'Any available stylist', role: 'First available' },
  { id: 'sty-ishara', name: 'Ishara Perera', role: 'Senior stylist' },
  { id: 'sty-nila', name: 'Nila Kumar', role: 'Colour specialist' },
  { id: 'sty-dilan', name: 'Dilan Fernando', role: 'Stylist' },
];
