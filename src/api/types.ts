// Mirrors the Spring Boot DTOs (identity/web/AuthDtos, salon/web/SalonDtos).
// Run `npm run gen:api` against a running backend to produce src/api/schema.d.ts
// and migrate these hand-written types to the generated ones.

export type PlatformRole = 'CUSTOMER' | 'PLATFORM_ADMIN' | 'PLATFORM_SUPPORT' | 'PLATFORM_FINANCE';
export type SalonRole = 'OWNER' | 'MANAGER' | 'RECEPTIONIST' | 'STAFF';
export type SalonBusinessStatus =
  | 'PENDING_APPROVAL'
  | 'CHANGES_REQUESTED'
  | 'ACTIVE'
  | 'REJECTED'
  | 'SUSPENDED'
  | 'DEACTIVATED';

export interface UserSummary {
  id: string;
  fullName: string;
  email: string;
  roles: PlatformRole[];
}

export interface TokenResponse {
  accessToken: string;
  tokenType: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  user: UserSummary;
}

export interface MembershipView {
  salonBusinessId: string;
  role: SalonRole;
  branchIds: string[];
}

export interface MeResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  preferredLanguage: string;
  emailVerified: boolean;
  roles: PlatformRole[];
  memberships: MembershipView[];
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterSalonBusinessRequest {
  legalName: string;
  displayName: string;
  description?: string;
  contactEmail: string;
  contactPhone: string;
  countryCode: string;
  defaultCurrency: string;
}

export interface SalonBusiness {
  id: string;
  legalName: string;
  displayName: string;
  slug: string;
  description: string | null;
  contactEmail: string;
  contactPhone: string;
  countryCode: string;
  defaultCurrency: string;
  status: SalonBusinessStatus;
  version: number;
}

export interface CreateBranchRequest {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode?: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  timezone: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface Branch {
  id: string;
  salonBusinessId: string;
  name: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  postalCode: string | null;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  timezone: string;
  contactPhone: string | null;
  contactEmail: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  published: boolean;
}
