import axios, { AxiosError } from 'axios';

import signOutAxios from './signOutAxios';

let isRefreshing = false;
let failedRequestQueue: any[] = [];

function api() {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_CLIENT_BASE_URL,
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('@Zeka:token');

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          const refreshToken = localStorage.getItem('@Zeka:refreshToken');

          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            apiClient
              .post('/refresh', {
                refreshToken,
              })
              .then((response) => {
                const { token, refreshToken: newRefreshToken } = response.data;

                localStorage.setItem('@Zeka:token', token);

                localStorage.setItem('@Zeka:refreshToken', newRefreshToken);

                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                failedRequestQueue.forEach((request) => request.onSuccess(token));

                failedRequestQueue = [];
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err));

                failedRequestQueue = [];

                signOutAxios();
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`;

                resolve(apiClient(originalConfig));
              },

              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        }
      }

      return Promise.reject(error);
    },
  );

  return apiClient;
}

const apiClient = api();

export default apiClient;
