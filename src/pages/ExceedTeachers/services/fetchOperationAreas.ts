import apiClient from '@/services/apiClient';

const fetchExceeds = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/exceeds');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchExceeds;
