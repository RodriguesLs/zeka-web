import apiClient from '@/services/apiClient';

const fetchData = async (): Promise<any> => {
  try {
    const guid = '3c972310-0abe-4657-b7c6-95f4e28cc0c5';
    const { data } = await apiClient.get(`/student_summary/${guid}`);

    return data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchData;
