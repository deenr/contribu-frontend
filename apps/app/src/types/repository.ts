export type RepositoryService = 'github' | 'gitlab' | 'bitbucket';

export interface RepositoryInfo {
  service: RepositoryService;
  repository: string;
  email: string;
}
