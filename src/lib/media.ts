// All photos are Unsplash photo ids (see src/data/media.js). To use your own
// images later, change only this file: photoUrl() / photoSrcSet().
const BASE = 'https://images.unsplash.com';

export const photoUrl = (id: string, width = 800) => `${BASE}/${id}?auto=format&fit=crop&w=${width}&q=75`;

export const photoSrcSet = (id: string, widths: number[] = [400, 800, 1200, 1600]) =>
  widths.map((w) => `${photoUrl(id, w)} ${w}w`).join(', ');
