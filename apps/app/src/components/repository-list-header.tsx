import { Button } from '@repo/ui/components/ui/button';
import { GitMerge } from 'lucide-react';

export function RepositoryListHeader({ className, ...props }: React.ComponentPropsWithoutRef<'header'>) {
  return (
    <header className={`mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`} {...props}>
      <h2 className="text-foreground text-xl font-semibold md:text-2xl">Repositories</h2>
      <Button>
        <GitMerge className="h-4 w-4" />
        Merge new repositories
      </Button>
    </header>
  );
}
