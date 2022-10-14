import apiClient from '@/services/apiClient';

const fetchOperationAreas = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/operation_areas');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchOperationAreas;
