import apiClient from '@/services/apiClient';

const insertInBatch = async students => {
	try {
		const response = await apiClient.post('/student_summary', { students });

		return response.data;
	} catch (err) {
		throw new Error(err);
	}
}

export default insertInBatch;
