import apiClient from '@/services/apiClient';

const fetchUsers = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/students');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchUsers;
