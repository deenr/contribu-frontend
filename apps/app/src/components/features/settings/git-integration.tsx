import { gitIntegrationAPI } from '@/actions/git-integration-actions';
import { Bitbucket } from '@/components/common/icons/bitbucket';
import { GitHub } from '@/components/common/icons/github';
import { GitLab } from '@/components/common/icons/gitlab';
import { GitIntegrationStatus, GitPlatform } from '@/types/git-models';
import { Card, CardContent, CardHeader } from '@repo/ui/components/ui/card';
import { Switch } from '@repo/ui/components/ui/switch';
import { useCallback, useState } from 'react';
import { TokenStatus } from './token-status';

type GitIntegrationProps = {
  gitIntegrationStatus: GitIntegrationStatus;
  refreshStatuses: () => Promise<void>;
};

export function GitIntegration({ gitIntegrationStatus, refreshStatuses }: GitIntegrationProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const providerInfo = getGitIntegrationInfo(gitIntegrationStatus.provider as GitPlatform);

  const openOAuthWindow = useCallback(
    async (url: string) => {
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const authWindow = window.open(url, 'OAuth Authorization', `width=${width},height=${height},left=${left},top=${top}`);

      if (authWindow) {
        const checkWindow = setInterval(() => {
          if (authWindow.closed) {
            clearInterval(checkWindow);
            setIsAuthenticating(false);
            refreshStatuses();
          }
        }, 500);
      }
    },
    [refreshStatuses]
  );

  const handleSwitchClick = async () => {
    try {
      if (!gitIntegrationStatus.authorized) {
        setIsAuthenticating(true);
        const { data } = await gitIntegrationAPI.getAuthorizationUrl(gitIntegrationStatus.provider);
        await openOAuthWindow(data);
      } else {
        await gitIntegrationAPI.deauthorizeProvider(gitIntegrationStatus.provider);
        await refreshStatuses();
      }
    } catch (error) {
      console.error('Error handling integration switch:', error);
      setIsAuthenticating(false);
    }
  };

  const handleTokenRefresh = async () => {
    try {
      setIsAuthenticating(true);
      const { data } = await gitIntegrationAPI.getAuthorizationUrl(gitIntegrationStatus.provider);
      await openOAuthWindow(data);
    } catch (error) {
      console.error('Error refreshing token:', error);
      setIsAuthenticating(false);
    }
  };

  return (
    <Card className="flex flex-col gap-6 p-6">
      <CardHeader className="flex flex-row items-center gap-1.5 space-y-0 p-0">
        {providerInfo.icon}
        <h3 className="text-foreground truncate text-base font-semibold">{providerInfo.name}</h3>
        <Switch className="ml-auto" onClick={handleSwitchClick} checked={gitIntegrationStatus.authorized} disabled={isAuthenticating} />
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 p-0">
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-xs font-medium">Token</span>
            <TokenStatus isAuthorized={gitIntegrationStatus.authorized} isTokenValid={gitIntegrationStatus.tokenValid} isAuthenticating={isAuthenticating} onRefresh={handleTokenRefresh} />
          </div>
          {gitIntegrationStatus.authorized && (
            <div className="flex flex-col space-y-1">
              <span className="text-muted-foreground text-xs font-medium">Last synced</span>
              <span className="flex items-center text-sm">{new Date(gitIntegrationStatus.syncedAt!).toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getGitIntegrationInfo(platform: GitPlatform): {
  name: string;
  icon: React.ReactNode;
} {
  const icons = {
    [GitPlatform.GITHUB]: <GitHub className="text-muted-foreground size-5" />,
    [GitPlatform.GITLAB]: <GitLab className="text-muted-foreground size-5" />,
    [GitPlatform.BITBUCKET]: <Bitbucket className="text-muted-foreground size-5" />
  };

  const names = {
    [GitPlatform.GITHUB]: 'GitHub',
    [GitPlatform.GITLAB]: 'GitLab',
    [GitPlatform.BITBUCKET]: 'Bitbucket'
  };

  return {
    icon: icons[platform as keyof typeof icons],
    name: names[platform as keyof typeof names]
  };
}
