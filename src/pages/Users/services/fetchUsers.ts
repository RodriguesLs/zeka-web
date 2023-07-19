import apiClient from '@/services/apiClient';

const fetchUsers = async (role = '', organizationId = 0): Promise<any> => {
  try {
    const path = role === 'sysadmin' ? '/students' : `/students?organization_id=${organizationId}`;
    const response = await apiClient.get(path);

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
