import axiosInstance from '@/services/axios-instance';
import { Author, Repository, RepositoryPlatform } from '@/types/repository';

export async function fetchRepositories(platform: RepositoryPlatform): Promise<Repository[]> {
  const { data } = await axiosInstance.get<Repository[]>(`provider/${platform}/repositories`);
  return data;
}

export async function fetchContributors(platform: RepositoryPlatform, repositoryName: string): Promise<Author[]> {
  const { data } = await axiosInstance.get<Author[]>(`provider/${platform}/${repositoryName}/contributors`);
  return data;
}
