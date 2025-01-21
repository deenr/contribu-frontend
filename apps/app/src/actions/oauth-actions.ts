import { API_ROUTES } from '@/config/api-config';
import axiosInstance from '@/services/axios-instance';
import { AxiosResponse } from 'axios';

export const oauthAPI = {
  authorize(provider: string, code: string): Promise<AxiosResponse<any, any>> {
    return axiosInstance.post(API_ROUTES.OAUTH.AUTHORIZE(provider, code));
  }
};
