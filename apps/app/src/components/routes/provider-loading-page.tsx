import { oauthAPI } from '@/actions/oauth-actions';
import { Bitbucket } from '@/components/common/icons/bitbucket';
import { GitHub } from '@/components/common/icons/github';
import { GitLab } from '@/components/common/icons/gitlab';
import { Badge } from '@repo/ui/components/ui/badge';
import { Card, CardContent, CardHeader } from '@repo/ui/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function ProviderLoadingPage() {
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider')!;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const authorize = async () => {
      const code = searchParams.get('code');

      if (code) {
        try {
          const response = await oauthAPI.authorize(provider, code);
          if (response.status === 200) {
            setIsLoading(false);
          } else {
          }
        } catch {
        } finally {
          setTimeout(() => window?.close(), 1000);
        }
      }
    };

    authorize();
  }, []);

  function getIcon(provider: string) {
    switch (provider) {
      case 'github':
        return <GitHub className="text-muted-foreground size-5" />;
      case 'gitlab':
        return <GitLab className="text-muted-foreground size-5" />;
      case 'bitbucket':
        return <Bitbucket className="text-muted-foreground size-5" />;
    }
  }

  function getName(provider: string) {
    switch (provider) {
      case 'github':
        return 'GitHub';
      case 'gitlab':
        return 'GitLab';
      case 'bitbucket':
        return 'Bitbucket';
    }
  }

  return (
    <div className="bg-muted grid min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4 p-6 md:p-10">
        <Card className="flex w-[400px] flex-col gap-6 p-6">
          {provider && (
            <CardHeader className="flex flex-row items-center gap-1.5 space-y-0 p-0">
              {getIcon(provider)}
              <h3 className="text-foreground truncate text-base font-semibold">{getName(provider)} Authentication</h3>
            </CardHeader>
          )}

          <CardContent className="flex flex-row items-center gap-3 p-0">
            <div className="flex flex-col space-y-1">
              <span className="text-muted-foreground text-xs font-medium">Status</span>
              {isLoading ? (
                <Badge variant="outline" className="bg-background flex w-fit items-center justify-center gap-2 pl-2 pr-1.5">
                  <div className="bg-muted-foreground h-1.5 w-1.5 animate-pulse rounded-full"></div>
                  <span>Connecting</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-background pl-2 pr-1.5">
                  <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  Valid
                </Badge>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-muted-foreground text-xs font-medium">Time</span>
              <span className="flex items-center text-sm">{new Date().toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
