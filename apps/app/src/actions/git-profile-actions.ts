import { API_ROUTES } from '@/config/api-config';
import axiosInstance from '@/services/axios-instance';
import { GitContributor, GitPlatform, GitRepository } from '@/types/git-models';
import { AxiosResponse } from 'axios';

export const gitProfileAPI = {
  getRepositories(platform: GitPlatform): Promise<AxiosResponse<GitRepository[], any>> {
    return axiosInstance.get<GitRepository[]>(API_ROUTES.GIT.REPOSITORIES(platform.toLowerCase()));
  },

  getContributors(platform: GitPlatform, repository: string): Promise<AxiosResponse<GitContributor[], any>> {
    return axiosInstance.get<GitContributor[]>(API_ROUTES.GIT.CONTRIBUTORS(platform.toLowerCase(), repository));
  }
};
