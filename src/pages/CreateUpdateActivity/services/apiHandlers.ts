import apiClient from '@/services/apiClient';
import { ActivityFormData } from '..';

export const fetchActivityById = (activityId: number | string) => {
  return apiClient.get(`activities/${activityId}`);
};

export const createActivity = (data: any) => {
  return apiClient.post('activities', {
    activity: data,
  });
};

export const fetchTeachers = () => apiClient.get('teachers');

export const updateActivity = (activityId: number | string, data: ActivityFormData) => {
  return apiClient.put(`activities/${activityId}`, {
    data,
  });
};
