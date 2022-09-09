import apiClient from '@/services/apiClient';

const fetchLicenses = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/licenses');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchLicenses;
