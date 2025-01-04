import { MergeRepoDialog } from './dialog/merge-repo/merge-repo-dialog';

export function RepositoryListHeader({ className, ...props }: React.ComponentPropsWithoutRef<'header'>) {
  return (
    <header className={`mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`} {...props}>
      <h2 className="text-foreground text-xl font-semibold md:text-2xl">Repositories</h2>
      <MergeRepoDialog />
    </header>
  );
}
