// src/services/advisorService.ts
import axios from 'axios';

// Use absolute backend URL to avoid relative origin issues
const BASE_URL = 'http://127.0.0.1:8000/api/clustering/advisors/';

export interface AdvisorPayload {
  advisor_id: string;
  name: string;
  email: string;
}

export interface AdvisorRecord extends AdvisorPayload {
  id: number;
}

/**
 * Fetch all advisors
 */
export const fetchAdvisors = () => axios.get<AdvisorRecord[]>(BASE_URL);

/**
 * Fetch a single advisor by ID
 */
export const fetchAdvisor = (id: number) =>
  axios.get<AdvisorRecord>(`${BASE_URL}${id}/`);

/**
 * Create a new advisor
 */
export const createAdvisor = (data: AdvisorPayload) =>
  axios.post<AdvisorRecord>(BASE_URL, data);

/**
 * Update an existing advisor
 */
export const updateAdvisor = (id: number, data: AdvisorPayload) =>
  axios.put<AdvisorRecord>(`${BASE_URL}${id}/`, data);

/**
 * Delete an advisor
 */
export const deleteAdvisor = (id: number) =>
  axios.delete<void>(`${BASE_URL}${id}/`);
