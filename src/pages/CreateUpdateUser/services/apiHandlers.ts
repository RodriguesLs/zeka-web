import apiClient from '@/services/apiClient';
import { UserFormData } from '..';

export const fetchUserById = (userId: number | string) => {
  return apiClient.get(`students/${userId}`);
};

export const createUser = (data: UserFormData) => {
  return apiClient.post('students', {
    data,
  });
};

export const updateUser = (userId: number | string, data: UserFormData) => {
  return apiClient.put(`students/${userId}`, {
    data,
  });
};
