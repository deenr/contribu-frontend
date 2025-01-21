import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { RefreshCw } from 'lucide-react';

type TokenStatusProps = {
  isAuthorized: boolean;
  isTokenValid: boolean;
  isAuthenticating: boolean;
  onRefresh: () => void;
};

export function TokenStatus({ isAuthorized, isTokenValid, isAuthenticating, onRefresh }: TokenStatusProps) {
  return (
    <Badge variant="outline" className={`bg-background pl-2 ${!isTokenValid && isAuthorized && 'pr-1.5'}`}>
      <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${!isAuthorized ? 'bg-muted-foreground' : isTokenValid ? 'bg-green-500' : 'bg-destructive'}`} />
      {!isAuthorized ? 'Not authorized' : isTokenValid ? 'Valid' : 'Expired'}
      {!isTokenValid && isAuthorized && (
        <Button variant="ghost" size="sm" className="ml-1.5 h-4 w-4 rounded-full p-0" onClick={onRefresh} disabled={isAuthenticating}>
          <RefreshCw className={`text-muted-foreground hover:text-foreground h-4 w-4 transition-colors ${isAuthenticating ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh Token</span>
        </Button>
      )}
    </Badge>
  );
}
