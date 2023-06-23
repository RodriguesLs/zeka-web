import apiClient from '@/services/apiClient';

const fetchUsers = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/students?organization_id=1');

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const insertInBatch = async (users): Promise<any> => {
  try {
    const response = await apiClient.post('/students/in_batch', { users });

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export default fetchUsers;
