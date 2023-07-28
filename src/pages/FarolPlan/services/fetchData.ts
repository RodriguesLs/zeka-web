import farolApi from '@/services/farolApi';

export const downloadCSV = async (): Promise<any> => {
  try {
    const response = await farolApi.get('/farol-plan');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};
