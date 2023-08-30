import apiClient from '@/services/apiClient';

const fetchData = async (guid: string): Promise<any> => {
  try {
    // const guid = 'a4029dff-40be-4758-b325-2ee66f003e00';
    const { data } = await apiClient.get(`/student_summary/${guid}`);

    return data;
  } catch (e) {
    throw new Error();
  }
};

export default fetchData;
