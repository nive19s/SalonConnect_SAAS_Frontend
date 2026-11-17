import type { SalonRole } from '@/api/types';

// Mirror of identity/SalonRole.java. For showing or hiding UI only;
// the server re-checks every request against the database.
export type SalonPermission =
  | 'VIEW_BUSINESS' | 'MANAGE_BUSINESS' | 'MANAGE_BRANCHES' | 'MANAGE_MEMBERS' | 'MANAGE_CATALOGUE'
  | 'MANAGE_STAFF_SCHEDULES' | 'MANAGE_BOOKINGS' | 'VIEW_ALL_BOOKINGS' | 'VIEW_OWN_SCHEDULE' | 'VIEW_REPORTS';

const ALL: SalonPermission[] = [
  'VIEW_BUSINESS', 'MANAGE_BUSINESS', 'MANAGE_BRANCHES', 'MANAGE_MEMBERS', 'MANAGE_CATALOGUE',
  'MANAGE_STAFF_SCHEDULES', 'MANAGE_BOOKINGS', 'VIEW_ALL_BOOKINGS', 'VIEW_OWN_SCHEDULE', 'VIEW_REPORTS',
];

const MATRIX: Record<SalonRole, SalonPermission[]> = {
  OWNER: ALL,
  MANAGER: ['VIEW_BUSINESS', 'MANAGE_CATALOGUE', 'MANAGE_STAFF_SCHEDULES', 'MANAGE_BOOKINGS', 'VIEW_ALL_BOOKINGS', 'VIEW_OWN_SCHEDULE', 'VIEW_REPORTS'],
  RECEPTIONIST: ['VIEW_BUSINESS', 'MANAGE_BOOKINGS', 'VIEW_ALL_BOOKINGS'],
  STAFF: ['VIEW_BUSINESS', 'VIEW_OWN_SCHEDULE'],
};

export const roleCan = (role: SalonRole, permission: SalonPermission): boolean => MATRIX[role].includes(permission);
