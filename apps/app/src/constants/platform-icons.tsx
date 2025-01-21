import { Bitbucket } from '@/components/icons/bitbucket';
import { GitHub } from '@/components/icons/github';
import { GitLab } from '@/components/icons/gitlab';
import { RepositoryPlatform } from '@/types/repository';

export const PLATFORM_ICONS: Record<RepositoryPlatform, React.ReactNode> = {
  github: <GitHub className="size-4" />,
  gitlab: <GitLab className="size-4" />,
  bitbucket: <Bitbucket className="size-4" />
};
