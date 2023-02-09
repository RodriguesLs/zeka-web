import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_PAGARME_API_URL,
  headers: {
    Authorization: 'Basic c2tfV2FubEU5ODNVNHM3ZVJnNjo='
  }
});

export default api;
