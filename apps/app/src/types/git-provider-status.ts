export enum GitProvider {
  GITHUB,
  GITLAB,
  BITBUCKET
}

export interface GitProviderStatus {
  authorized: boolean;
  provider: string;
  syncedAt: Date | null;
  tokenValid: boolean;
}
