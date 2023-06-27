import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_PAYMENT_API_URL });

export default api;
