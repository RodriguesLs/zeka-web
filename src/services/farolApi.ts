import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_FAROL_URL });

export default api;
