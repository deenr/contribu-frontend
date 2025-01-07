import { RepositoryListCard } from '@/components/repository-list-card';
import { RepositoryListHeader } from '@/components/repository-list-header';

export function RepositoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-4">
      <RepositoryListHeader className="w-full" />
      <section className="grid w-full grid-cols-3 gap-3">
        <RepositoryListCard />
      </section>
    </div>
  );
}
