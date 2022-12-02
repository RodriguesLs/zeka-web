import apiClient from '@/services/apiClient';

export const createExceed = (data: any) => apiClient.post('exceeds', { exceed: data });
