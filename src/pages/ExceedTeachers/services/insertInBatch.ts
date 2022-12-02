import apiClient from '@/services/apiClient';

const insertInBatch = async departments => {
	try {
		const response = await apiClient.post('/operation_areas/in_batch', { departments });

		return response.data;
	} catch (err) {
		throw new Error(err);
	}
}

export default insertInBatch;
