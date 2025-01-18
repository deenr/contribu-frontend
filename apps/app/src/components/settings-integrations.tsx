import axiosInstance from '@/services/axios-instance';
import { GitProviderStatus } from '@/types/git-provider-status';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardHeader } from '@repo/ui/components/ui/card';
import { Switch } from '@repo/ui/components/ui/switch';
import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Bitbucket } from './icons/bitbucket';
import { GitHub } from './icons/github';
import { GitLab } from './icons/gitlab';

export function SettingsIntegrations() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [gitProviderStatuses, setGitProviderStatuses] = useState<GitProviderStatus[]>([]);

  useEffect(() => {
    const authorize = async () => {
      const code = searchParams.get('code');
      const provider = searchParams.get('provider');

      if (code) {
        try {
          const response = await axiosInstance.post(`/oauth/${provider}/callback?code=${code}`);

          if (response.status) {
          } else {
          }
        } catch {}
        navigate('/settings/integrations', { replace: true });
      }
    };
    authorize();

    const getProviderStatuses = async () => {
      const { data } = await axiosInstance.get<GitProviderStatus[]>('/providers/status');
      setGitProviderStatuses(data);
    };

    getProviderStatuses();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-foreground text-lg font-semibold">Integrations</h3>
        <p className="text-muted-foreground text-sm font-normal">Manage your integrations here</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {gitProviderStatuses.map((gitProviderStatus) => (
          <Integration key={gitProviderStatus.provider} gitProviderStatus={gitProviderStatus} />
        ))}
      </div>
    </section>
  );
}

function Integration({ gitProviderStatus }: { gitProviderStatus: GitProviderStatus }) {
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

  const getStatusColor = (authorized: boolean, tokenValid: boolean) => {
    if (!authorized) {
      return 'bg-muted-foreground';
    } else {
      if (tokenValid) {
        return 'bg-green-500';
      } else {
        return 'bg-destructive';
      }
    }
  };

  const getStatusText = (authorized: boolean, tokenValid: boolean) => {
    if (!authorized) {
      return 'Not authorized';
    } else {
      if (tokenValid) {
        return 'Valid';
      } else {
        return 'Expired';
      }
    }
  };

  return (
    <Card className="flex flex-col gap-6 p-6">
      <CardHeader className="flex flex-row items-center gap-1.5 space-y-0 p-0">
        {getIcon(gitProviderStatus.provider)}
        <h3 className="text-foreground truncate text-base font-semibold">{getName(gitProviderStatus.provider)}</h3>
        <Switch
          className="ml-auto"
          onClick={async () => {
            if (!gitProviderStatus.authorized) {
              const { data } = await axiosInstance.get<string>(`/oauth/${gitProviderStatus.provider.toLowerCase()}/authorize`);
              window.location.replace(data);
            } else {
            }
          }}
          checked={gitProviderStatus.authorized}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 p-0">
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground text-xs font-medium">Token</span>

            <div className="flex flex-row items-center gap-1">
              <Badge variant="outline" className={`bg-background pl-2 ${!gitProviderStatus.tokenValid && gitProviderStatus.authorized && 'pr-1.5'}`}>
                <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${getStatusColor(gitProviderStatus.authorized, gitProviderStatus.tokenValid)}`}></div>
                {getStatusText(gitProviderStatus.authorized, gitProviderStatus.tokenValid)}
                {!gitProviderStatus.tokenValid && gitProviderStatus.authorized && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1.5 h-4 w-4 rounded-full p-0"
                    onClick={async () => {
                      const { data } = await axiosInstance.get<string>(`/oauth/${gitProviderStatus.provider.toLowerCase()}/authorize`);
                      window.location.replace(data);
                    }}
                  >
                    <RefreshCw className="text-muted-foreground hover:text-foreground h-4 w-4 transition-colors" />
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
