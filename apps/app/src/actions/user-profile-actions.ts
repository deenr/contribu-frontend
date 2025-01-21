import { API_ROUTES } from '@/config/api-config';
import axiosInstance from '@/services/axios-instance';
import { MyProfile } from '@/types/profile';
import { AxiosResponse } from 'axios';

export const userProfileAPI = {
  getProfile(): Promise<AxiosResponse<MyProfile, any>> {
    return axiosInstance.get<MyProfile>(API_ROUTES.USER.PROFILE);
  },

  updateProfile(profile: MyProfile): Promise<AxiosResponse<any, any>> {
    return axiosInstance.put(API_ROUTES.USER.PROFILE, { ...profile });
  }
};
