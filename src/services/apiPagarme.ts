import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_PAGARME_API_URL,
  headers: {
    Authorization: 'Basic c2tfdGVzdF9SOUpEejBuY1hJUmVQeXFnOg=='
  }
});

export default api;
