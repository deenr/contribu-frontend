import { z } from 'zod';

export type RepositoryPlatform = 'github' | 'gitlab' | 'bitbucket';

export type Repository = {
  id: string;
  name: string;
};

export type Author = {
  id: string;
  login: string;
};

export const RepositoryInfoSchema = z.object({
  platform: z.enum(['github', 'gitlab', 'bitbucket']),
  repository: z.object({
    id: z.string(),
    name: z.string()
  }),
  author: z.object({
    id: z.string(),
    name: z.string()
  })
});

export type RepositoryInfo = z.infer<typeof RepositoryInfoSchema>;
