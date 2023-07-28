import apiClient from '@/services/apiClient';
import farolApi from '@/services/farolApi';

const fetchData = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/student_summary');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export const downloadCSV = async (): Promise<any> => {
  try {
    const response = await farolApi.get('/download-students');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchData;
