import apiClient from '@/services/apiClient';

const fetchUsersZeka = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/admin_users');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchUsersZeka;
