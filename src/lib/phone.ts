/**
 * The API accepts +?[0-9]{7,15}. Visitors type "077 123 4567", so strip formatting
 * and convert Sri Lankan local numbers (07XXXXXXXX) to +94 format.
 */
export function normalizePhone(input: string): string {
  const cleaned = input.replace(/[\s\-().]/g, '');
  if (/^0\d{9}$/.test(cleaned)) return `+94${cleaned.slice(1)}`;
  return cleaned;
}

export const isValidPhone = (input: string): boolean => /^\+?[0-9]{7,15}$/.test(normalizePhone(input));
