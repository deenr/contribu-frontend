import { RepositoryCard } from '@/components/repository-card';
import { RepositoryListHeader } from '@/components/repository-list-header';

export function RepositoryPage() {
  return (
    <>
      <RepositoryListHeader className="w-full px-6" />
      <section className="grid w-full grid-cols-3 gap-3 px-6">
        <RepositoryCard />
      </section>
    </>
  );
}
