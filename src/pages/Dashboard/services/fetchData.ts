import apiClient from '@/services/apiClient';

const fetchData = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/student_summary');
    console.log({response})
    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchData;
