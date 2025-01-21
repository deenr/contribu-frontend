import { PLATFORM_ICONS } from '@/constants/platform-icons';
import { GitRepositoryInfo } from '@/types/git-models';
import { ChevronRight, X } from 'lucide-react';

type RepositoryListProps = {
  repositories: GitRepositoryInfo[];
  onRemove: (index: number) => void;
};

export function RepositoryList({ repositories, onRemove }: RepositoryListProps) {
  return (
    <>
      {repositories.map(({ platform, repository, contributor }, index) => (
        <div key={`${platform}-${repository.id}-${contributor}`} className="bg-muted rounded-md px-4 py-2">
          <div className="flex flex-row items-center gap-1">
            {PLATFORM_ICONS[platform]}
            <p className="ml-1 text-sm">{repository.name}</p>
            <ChevronRight className="text-muted-foreground size-4" />
            <p className="text-sm">{contributor.name}</p>
            <X className="ml-auto size-4 cursor-pointer" onClick={() => onRemove(index)} />
          </div>
        </div>
      ))}
    </>
  );
}
