import apiClient from '@/services/apiClient';

export const createLicense = (data: any) => {
  return apiClient.post('operation_areas', {
    operation_area: data,
  });
};
