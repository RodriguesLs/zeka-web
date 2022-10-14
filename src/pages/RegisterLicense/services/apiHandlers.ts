import apiClient from '@/services/apiClient';

export const fetchLicenses = () => apiClient.get(`licenses/selectable`);

export const fetchStudents = () => apiClient.get(`licenses/students`);

export const registerLicense = (data: any) => {
  return apiClient.post('licenses/register-student', {
    data,
  });
};
