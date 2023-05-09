import apiClient from '@/services/apiClient';

export const fetchProfileByUserId = async (userId: number | string) => {
  const profile = await apiClient.get(`profile/${userId}`);

  return profile;
};

export const update = (userId: number | string, data: any) => {
  return apiClient.put(`profile/${userId}`, {
    profile: data,
  });
};
