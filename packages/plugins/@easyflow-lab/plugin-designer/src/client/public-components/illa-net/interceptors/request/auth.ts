import { getAuthToken } from '../../../utils/auth';
import { AxiosRequestConfig } from 'axios';

export const authInterceptor = (config: AxiosRequestConfig) => {
  const token = getAuthToken();
  if (typeof token === 'string') {
    config.headers.Authorization = token;
  }
  return config;
};
