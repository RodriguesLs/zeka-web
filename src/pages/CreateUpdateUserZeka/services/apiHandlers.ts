import apiClient from '@/services/apiClient';
import { UserZekaFormData } from '..';

export const fetchUserById = (userId: number | string) => {
  return apiClient.get(`admin_users/${userId}`);
};

export const createUser = (data: UserZekaFormData) => {
  return apiClient.post('admin_users', {
    admin_user: { name: data.name, role: data.role, active: true },
    user: { email: data.email, password: data.password }
  });
};

export const updateUser = (userId: number | string, data: UserZekaFormData) => {
  return apiClient.put(`admin_users/${userId}`, {
    data,
  });
};
