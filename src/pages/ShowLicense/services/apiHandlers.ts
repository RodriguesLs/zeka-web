import apiClient from '@/services/apiClient';

export const fetchLicense = () => apiClient.get(`licenses/my-license`);
