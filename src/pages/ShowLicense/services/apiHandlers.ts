import apiClient from '@/services/apiClient';

export const fetchLicense = async () => await apiClient.get(`licenses/my-license`);
