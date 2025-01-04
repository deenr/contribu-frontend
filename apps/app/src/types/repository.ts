export type RepositoryPlatform = 'github' | 'gitlab' | 'bitbucket';

export interface RepositoryInfo {
  platform: RepositoryPlatform;
  repository: string;
  email: string;
}

export interface NewRepositoryConfig {
  platform: RepositoryPlatform;
  name: string;
}
