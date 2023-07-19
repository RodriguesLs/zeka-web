import apiClient from '@/services/apiClient';
import { UserFormData } from '..';

export const fetchUserById = (userId: number | string) => {
  return apiClient.get(`students/${userId}`);
};

export const createUser = (data: UserFormData) => {
  return apiClient.post('students', {
    student: data,
  });
};

export const updateUser = (userId: number | string, data: UserFormData) => {
  return apiClient.put(`students/${userId}`, {
    student: data,
  });
};

export const fetchDepartments = () => apiClient.get('operation_areas');

export const fetchOrganizations = () => apiClient.get('organizations');
