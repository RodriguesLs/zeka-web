import apiClient from '@/services/apiClient';

const fetchActivities = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/activities');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchActivities;
