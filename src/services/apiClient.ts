import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_CLIENT_BASE_URL,
});

apiClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('@Zeka:token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== '/sessions' && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshTokenLocal = localStorage.getItem('@Zeka:refreshToken');

          const responseRefreshToken = await apiClient.post('/refresh_token', {
            refreshToken: refreshTokenLocal,
          });
          const { refreshToken } = responseRefreshToken.data;

          localStorage.setItem('@Zeka:refreshToken', refreshToken);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
