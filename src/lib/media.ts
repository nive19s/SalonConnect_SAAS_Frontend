// All photos are Unsplash photo ids (see src/data/media.js). To use your own
// images later, change only this file: photoUrl() / photoSrcSet().
const BASE = 'https://images.unsplash.com';

const isLocalPhoto = (photo: string) => photo.startsWith('/') || photo.startsWith('./');

export const photoUrl = (id: string, width = 800) =>
  isLocalPhoto(id) ? id : `${BASE}/${id}?auto=format&fit=crop&w=${width}&q=75`;

export const photoSrcSet = (id: string, widths: number[] = [400, 800, 1200, 1600]) =>
  isLocalPhoto(id) ? id : widths.map((w) => `${photoUrl(id, w)} ${w}w`).join(', ');
