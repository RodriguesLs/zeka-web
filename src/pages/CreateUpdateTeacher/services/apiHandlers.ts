import apiClient from '@/services/apiClient';
import { UserZekaFormData } from '..';

export const fetchTeacherById = (userId: number | string) => {
  return apiClient.get(`teachers/${userId}`);
};

export const createTeacher = (
    { name, discipline, address, cellphone, email, password, document_number, level }: any
  ) => {
  return apiClient.post('teachers', {
    teacher: { name, discipline, address, cellphone, document_number, level },
    user: { email, password }
  });
};

export const updateTeacher = (userId: number | string, { name, active, discipline, address, cellphone, level }: any) => {
  return apiClient.put(`teachers/${userId}`, {
    teacher: { name, active, discipline, address, cellphone, level },
  });
};
