import apiClient from '@/services/apiClient';

const fetchTeachers = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/teachers');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchTeachers;
