import axios, { AxiosError } from 'axios';
import localStorageService from './localStorageService';

interface FailedRequestQueue {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
}

let isRefreshing = false;
let failedRequestQueue: FailedRequestQueue[] = [];

function api() {
  const apiClient = axios.create({
    baseURL: '/mirage',
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorageService().getToken;

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
          const refreshToken = localStorageService().getRefreshToken;

          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            apiClient
              .post('/refresh', {
                refreshToken,
              })
              .then((response) => {
                const { token, refreshToken: newRefreshToken } = response.data;

                localStorageService().signIn({ token, refreshToken: newRefreshToken });

                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                failedRequestQueue.forEach((request) => request.onSuccess(token));

                failedRequestQueue = [];
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err));

                failedRequestQueue = [];

                localStorageService().signOut();
                location.href = '/';
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
