import { z } from 'zod';
import type { CreateBranchRequest, RegisterSalonBusinessRequest } from '@/api/types';
import { isValidPhone, normalizePhone } from '@/lib/phone';

// Limits mirror salon/web/SalonDtos.java.
const phone = z.string().trim().refine(isValidPhone, 'Enter a valid phone number, like 077 123 4567.');
const optionalPhone = z.string().trim().refine((v) => v === '' || isValidPhone(v), 'Enter a valid phone number.');
const optionalEmail = z.string().trim().max(254).refine((v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email address.');
const optionalCoordinate = (min: number, max: number) =>
  z.string().trim().refine((v) => v === '' || (!Number.isNaN(Number(v)) && Number(v) >= min && Number(v) <= max), `Enter a number from ${min} to ${max}.`);

export const businessSchema = z.object({
  legalName: z.string().trim().min(1, 'Enter the registered business name.').max(200),
  displayName: z.string().trim().min(1, 'Enter the name customers will see.').max(150),
  description: z.string().trim().max(2000, 'Keep the description under 2000 characters.'),
  contactEmail: z.string().trim().min(1, 'Enter a contact email.').email('Enter a valid email address.').max(254),
  contactPhone: phone,
  countryCode: z.string().regex(/^[A-Z]{2}$/),
  defaultCurrency: z.string().regex(/^[A-Z]{3}$/),
});
export type BusinessValues = z.infer<typeof businessSchema>;

export const branchSchema = z.object({
  name: z.string().trim().min(1, 'Enter a branch name.').max(150),
  addressLine1: z.string().trim().min(1, 'Enter the street address.').max(200),
  addressLine2: z.string().trim().max(200),
  city: z.string().trim().min(1, 'Enter the city.').max(100),
  postalCode: z.string().trim().max(20),
  countryCode: z.string().regex(/^[A-Z]{2}$/),
  latitude: optionalCoordinate(-90, 90),
  longitude: optionalCoordinate(-180, 180),
  timezone: z.string().trim().min(1, 'Enter a time zone, like Asia/Colombo.').max(64),
  contactPhone: optionalPhone,
  contactEmail: optionalEmail,
});
export type BranchValues = z.infer<typeof branchSchema>;

export const BUSINESS_FIELDS = ['legalName', 'displayName', 'description', 'contactEmail', 'contactPhone', 'countryCode', 'defaultCurrency'] as const;
export const BRANCH_FIELDS = ['name', 'addressLine1', 'addressLine2', 'city', 'postalCode', 'countryCode', 'latitude', 'longitude', 'timezone', 'contactPhone', 'contactEmail'] as const;

export const businessDefaults: BusinessValues = {
  legalName: '', displayName: '', description: '', contactEmail: '', contactPhone: '', countryCode: 'LK', defaultCurrency: 'LKR',
};
export const branchDefaults: BranchValues = {
  name: 'Main branch', addressLine1: '', addressLine2: '', city: '', postalCode: '', countryCode: 'LK',
  latitude: '', longitude: '', timezone: 'Asia/Colombo', contactPhone: '', contactEmail: '',
};

const blankToUndefined = (v: string): string | undefined => (v.trim() === '' ? undefined : v.trim());

export function businessToRequest(v: BusinessValues): RegisterSalonBusinessRequest {
  return {
    legalName: v.legalName.trim(),
    displayName: v.displayName.trim(),
    description: blankToUndefined(v.description),
    contactEmail: v.contactEmail.trim(),
    contactPhone: normalizePhone(v.contactPhone),
    countryCode: v.countryCode,
    defaultCurrency: v.defaultCurrency,
  };
}

export function branchToRequest(v: BranchValues): CreateBranchRequest {
  return {
    name: v.name.trim(),
    addressLine1: v.addressLine1.trim(),
    addressLine2: blankToUndefined(v.addressLine2),
    city: v.city.trim(),
    postalCode: blankToUndefined(v.postalCode),
    countryCode: v.countryCode,
    latitude: v.latitude.trim() === '' ? undefined : Number(v.latitude),
    longitude: v.longitude.trim() === '' ? undefined : Number(v.longitude),
    timezone: v.timezone.trim(),
    contactPhone: v.contactPhone.trim() === '' ? undefined : normalizePhone(v.contactPhone),
    contactEmail: blankToUndefined(v.contactEmail),
  };
}
