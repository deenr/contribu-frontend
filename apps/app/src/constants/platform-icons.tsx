import { Bitbucket } from '@/components/common/icons/bitbucket';
import { GitHub } from '@/components/common/icons/github';
import { GitLab } from '@/components/common/icons/gitlab';
import { GitPlatform } from '@/types/git-models';

export const PLATFORM_ICONS: Record<GitPlatform, React.ReactNode> = {
  [GitPlatform.GITHUB]: <GitHub className="size-4" />,
  [GitPlatform.GITLAB]: <GitLab className="size-4" />,
  [GitPlatform.BITBUCKET]: <Bitbucket className="size-4" />
};
