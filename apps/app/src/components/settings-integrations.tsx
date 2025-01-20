import axiosInstance from '@/services/axios-instance';
import { GitProviderStatus } from '@/types/git-provider-status';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardHeader } from '@repo/ui/components/ui/card';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { Switch } from '@repo/ui/components/ui/switch';
import { RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Bitbucket } from './icons/bitbucket';
import { GitHub } from './icons/github';
import { GitLab } from './icons/gitlab';

export function SettingsIntegrations() {
  const [gitProviderStatuses, setGitProviderStatuses] = useState<GitProviderStatus[]>([]);

  useEffect(() => {
    getProviderStatuses();
  }, []);

  const getProviderStatuses = async () => {
    const { data } = await axiosInstance.get<GitProviderStatus[]>('/providers/status');
    setGitProviderStatuses(data);
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-foreground text-lg font-semibold">Integrations</h3>
        <p className="text-muted-foreground text-sm font-normal">Manage your integrations here</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {gitProviderStatuses.length > 0
          ? gitProviderStatuses.map((gitProviderStatus) => <Integration key={gitProviderStatus.provider} gitProviderStatus={gitProviderStatus} refreshStatuses={getProviderStatuses} />)
          : Array(3)
              .fill(null)
              .map((_, index) => <IntegrationSkeleton key={index} />)}
      </div>
    </section>
  );
}

function Integration({ gitProviderStatus, refreshStatuses }: { gitProviderStatus: GitProviderStatus; refreshStatuses: () => Promise<void> }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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

  function getIcon(provider: string) {
    switch (provider) {
      case 'GITHUB':
        return <GitHub className="text-muted-foreground size-5" />;
      case 'GITLAB':
        return <GitLab className="text-muted-foreground size-5" />;
      case 'BITBUCKET':
        return <Bitbucket className="text-muted-foreground size-5" />;
    }
  }

  function getName(provider: string) {
    switch (provider) {
      case 'GITHUB':
        return 'GitHub';
      case 'GITLAB':
        return 'GitLab';
      case 'BITBUCKET':
        return 'Bitbucket';
    }
  }

  const handleSwitchClick = async () => {
    try {
      if (!gitProviderStatus.authorized) {
        setIsAuthenticating(true);
        const { data } = await axiosInstance.get<string>(`/oauth/${gitProviderStatus.provider.toLowerCase()}/authorize`);
        await openOAuthWindow(data);
      } else {
        await axiosInstance.post<void>(`/oauth/${gitProviderStatus.provider.toLowerCase()}/deauthorize`);
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
      const { data } = await axiosInstance.get<string>(`/oauth/${gitProviderStatus.provider.toLowerCase()}/authorize`);
      await openOAuthWindow(data);
    } catch (error) {
      console.error('Error refreshing token:', error);
      setIsAuthenticating(false);
    }
  };

  return (
    <Card className="flex flex-col gap-6 p-6">
      <CardHeader className="flex flex-row items-center gap-1.5 space-y-0 p-0">
        {getIcon(gitProviderStatus.provider)}
        <h3 className="text-foreground truncate text-base font-semibold">{getName(gitProviderStatus.provider)}</h3>
        <Switch className="ml-auto" onClick={handleSwitchClick} checked={gitProviderStatus.authorized} disabled={isAuthenticating} />
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 p-0">
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-xs font-medium">Token</span>
            <div className="flex flex-row items-center gap-1">
              <Badge variant="outline" className={`bg-background pl-2 ${!gitProviderStatus.tokenValid && gitProviderStatus.authorized && 'pr-1.5'}`}>
                <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${!gitProviderStatus.authorized ? 'bg-muted-foreground' : gitProviderStatus.tokenValid ? 'bg-green-500' : 'bg-destructive'}`}></div>
                {!gitProviderStatus.authorized ? 'Not authorized' : gitProviderStatus.tokenValid ? 'Valid' : 'Expired'}
                {!gitProviderStatus.tokenValid && gitProviderStatus.authorized && (
                  <Button variant="ghost" size="sm" className="ml-1.5 h-4 w-4 rounded-full p-0" onClick={handleTokenRefresh} disabled={isAuthenticating}>
                    <RefreshCw className={`text-muted-foreground hover:text-foreground h-4 w-4 transition-colors ${isAuthenticating ? 'animate-spin' : ''}`} />
                    <span className="sr-only">Refresh Token</span>
                  </Button>
                )}
              </Badge>
            </div>
          </div>
          {gitProviderStatus.authorized && (
            <div className="flex flex-col space-y-1">
              <span className="text-muted-foreground text-xs font-medium">Last synced</span>
              <span className="flex items-center text-sm">{new Date(gitProviderStatus.syncedAt!).toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
function IntegrationSkeleton() {
  return (
    <Card className="flex flex-col gap-6 p-6">
      <CardHeader className="flex flex-row items-center gap-1.5 space-y-0 p-0">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="ml-auto h-6 w-10 rounded-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 p-0">
        <div className="flex w-2/3 flex-row items-center gap-3">
          <div className="flex flex-1 flex-col space-y-1">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="flex flex-1 flex-col space-y-1">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
