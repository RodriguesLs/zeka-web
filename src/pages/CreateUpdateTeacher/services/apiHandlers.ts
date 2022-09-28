import apiClient from '@/services/apiClient';
import { UserZekaFormData } from '..';

export const fetchTeacherById = (userId: number | string) => {
  return apiClient.get(`teachers/${userId}`);
};

export const createTeacher = (data: UserZekaFormData) => {
  return apiClient.post('teachers', {
    teacher: { name: data.name },
    user: { email: data.email, password: data.password }
  });
};

export const updateTeacher = (userId: number | string, data: any) => {
  return apiClient.put(`teachers/${userId}`, {
    teacher: { name: data.name, active: data.active },
  });
};
