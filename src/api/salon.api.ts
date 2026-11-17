import { request } from './client';
import type { Branch, CreateBranchRequest, RegisterSalonBusinessRequest, SalonBusiness } from './types';

export const salonApi = {
  register: (body: RegisterSalonBusinessRequest, idempotencyKey: string) =>
    request<SalonBusiness>('/api/v1/salon-businesses', { method: 'POST', body, idempotencyKey }),
  get: (id: string) => request<SalonBusiness>(`/api/v1/salon-businesses/${id}`),
  listBranches: (id: string) => request<Branch[]>(`/api/v1/salon-businesses/${id}/branches`),
  addBranch: (id: string, body: CreateBranchRequest) =>
    request<Branch>(`/api/v1/salon-businesses/${id}/branches`, { method: 'POST', body }),
};
