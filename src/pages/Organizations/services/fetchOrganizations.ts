import apiClient from '@/services/apiClient';

const fetchOrganizations = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/organizations');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchOrganizations;
