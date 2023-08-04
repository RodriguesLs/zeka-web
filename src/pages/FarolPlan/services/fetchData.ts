import farolApi from '@/services/farolApi';

export const downloadCSV = async (): Promise<any> => {
  try {
    const response = await farolApi.get('/plan/farol');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export const downloadLatestCSV = async (): Promise<any> => {
  try {
    const response = await farolApi.get('/plan/latest-activities');

    return response.data;
  } catch (e) {
    throw new Error();
  }
};
