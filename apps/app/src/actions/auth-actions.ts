import { API_ROUTES } from '@/config/api-config';
import axiosInstance from '@/services/axios-instance';
import { AxiosResponse } from 'axios';

export const authAPI = {
  logout(): Promise<AxiosResponse<any, any>> {
    return axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
  },

  register(data: { firstName: string; lastName: string; email: string; password: string }): Promise<AxiosResponse<any, any>> {
    return axiosInstance.post(API_ROUTES.AUTH.REGISTER, { ...data });
  },

  login(data: { email: string; password: string }): Promise<AxiosResponse<any, any>> {
    return axiosInstance.post(API_ROUTES.AUTH.LOGIN, { ...data });
  },

  refresh(): Promise<AxiosResponse<any, any>> {
    return axiosInstance.get(API_ROUTES.AUTH.REFRESH_TOKEN);
  }
};
