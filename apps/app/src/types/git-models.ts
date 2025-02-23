import { z } from 'zod';

export enum GitPlatform {
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB',
  BITBUCKET = 'BITBUCKET'
}

export type GitIntegrationStatus = {
  provider: GitPlatform;
  authorized: boolean;
  tokenValid: boolean;
  syncedAt?: string;
};

export const GitRepositoryInfoSchema = z.object({
  platform: z.enum([GitPlatform.GITHUB, GitPlatform.GITLAB, GitPlatform.BITBUCKET]),
  repository: z.string(),
  branch: z.string(),
  contributor: z.string()
});

export type GitRepositoryInfo = z.infer<typeof GitRepositoryInfoSchema>;

export const NewGitRepositorySchema = z.object({
  platform: z.enum(['github', 'gitlab', 'bitbucket']),
  name: z.string()
});

export type NewGitRepository = z.infer<typeof NewGitRepositorySchema>;
