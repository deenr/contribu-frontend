import { ConnectionStatus, GitProviderStatus } from '@/types/git-provider-status';
import { RepositoryPlatform } from '@/types/repository';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardHeader } from '@repo/ui/components/ui/card';
import { Switch } from '@repo/ui/components/ui/switch';
import { RefreshCw } from 'lucide-react';
import { Bitbucket } from './icons/bitbucket';
import { GitHub } from './icons/github';
import { GitLab } from './icons/gitlab';

export function SettingsIntegrations() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-foreground text-lg font-semibold">Integrations</h3>
        <p className="text-muted-foreground text-sm font-normal">Manage your integrations here</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Integration integration={{ provider: 'github', status: 'valid' }} />
        <Integration integration={{ provider: 'gitlab', status: 'not_authorized' }} />
        <Integration integration={{ provider: 'bitbucket', status: 'expired' }} />
      </div>
    </section>
  );
}

function Integration({ integration }: { integration: GitProviderStatus }) {
  function getIcon(provider: RepositoryPlatform) {
    switch (provider) {
      case 'github':
        return <GitHub className="text-muted-foreground size-5" />;
      case 'gitlab':
        return <GitLab className="text-muted-foreground size-5" />;
      case 'bitbucket':
        return <Bitbucket className="text-muted-foreground size-5" />;
    }
  }

  function getName(provider: RepositoryPlatform) {
    switch (provider) {
      case 'github':
        return 'GitHub';
      case 'gitlab':
        return 'GitLab';
      case 'bitbucket':
        return 'Bitbucket';
    }
  }

  const getStatusColor = (status: ConnectionStatus) => {
    switch (status) {
      case 'valid':
        return 'bg-green-500';
      case 'not_authorized':
        return 'bg-muted-foreground';
      case 'expired':
        return 'bg-destructive';
    }
  };

  const getStatusText = (status: ConnectionStatus) => {
    switch (status) {
      case 'valid':
        return 'Valid';
      case 'not_authorized':
        return 'Not authorized';
      case 'expired':
        return 'Expired';
    }
  };

  return (
    <Card className="flex flex-col gap-6 p-6">
      {/* <div className="grid grid-cols-[48px_auto_auto] gap-3">
        <GitHub className="text-muted-foreground shadow-xs bg-background h-12 w-12 rounded-lg border p-3" />
        <h3 className="text-foreground self-center truncate text-base font-semibold">GitHub</h3>
        <Switch className="justify-self-end" />
      </div> */}
      <CardHeader className="flex flex-row items-center gap-1.5 space-y-0 p-0">
        {getIcon(integration.provider)}
        <h3 className="text-foreground truncate text-base font-semibold">{getName(integration.provider)}</h3>
        <Switch className="ml-auto" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 p-0">
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs font-medium">Token</span>

            <div className="flex flex-row items-center gap-1">
              <Badge variant="outline" className={`bg-background pl-2 ${integration.status === 'expired' && 'pr-1.5'}`}>
                <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${getStatusColor(integration.status)}`}></div>
                {getStatusText(integration.status)}
                {integration.status === 'expired' && (
                  <Button variant="ghost" size="sm" className="ml-1.5 h-4 w-4 rounded-full p-0">
                    <RefreshCw className="text-muted-foreground hover:text-foreground h-4 w-4 transition-colors" />
                    <span className="sr-only">Refresh Token</span>
                  </Button>
                )}
              </Badge>
            </div>
          </div>
          {integration.status !== 'not_authorized' && (
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium">Last synced</span>
              <span className="flex items-center text-sm">{new Date().toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
