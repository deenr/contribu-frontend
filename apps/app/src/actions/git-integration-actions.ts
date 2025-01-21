import { API_ROUTES } from '@/config/api-config';
import axiosInstance from '@/services/axios-instance';
import { GitIntegrationStatus } from '@/types/git-models';
import { AxiosResponse } from 'axios';

export const gitIntegrationAPI = {
  getStatuses(): Promise<AxiosResponse<GitIntegrationStatus[], any>> {
    return axiosInstance.get<GitIntegrationStatus[]>(API_ROUTES.GIT.INTEGRATION_STATUSES);
  },

  getAuthorizationUrl(provider: string): Promise<AxiosResponse<string, any>> {
    return axiosInstance.get<string>(API_ROUTES.OAUTH.AUTHORIZATION_URL(provider));
  },

  deauthorizeProvider(provider: string): Promise<AxiosResponse<void, any>> {
    return axiosInstance.post<void>(API_ROUTES.OAUTH.DEAUTHORIZE(provider));
  }
};
