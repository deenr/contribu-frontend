import { API_TIMEOUT } from '@/config/api-config';
import { envConfig } from '@/config/env-config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: envConfig.BASE_URL,
  timeout: API_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
