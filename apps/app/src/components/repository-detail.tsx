import { Tab } from '@/types/tabs';
import { RepositoryDetailItem } from './repository-detail-item';
import { Tabs } from './ui/tabs';

export function RepositoryDetail() {
  const tabs: Tab<number>[] = [
    { id: 0, label: 'All' },
    { id: 1, label: 'repo-1' },
    { id: 2, label: 'repo-2' },
    { id: 3, label: 'repo-3' }
  ];
  return (
    <div className="flex flex-col gap-6">
      <Tabs tabs={tabs} />
      <section className="flex w-2/3 flex-col gap-4">
        <RepositoryDetailItem />
        <RepositoryDetailItem />
        <RepositoryDetailItem />
        <RepositoryDetailItem />
        <RepositoryDetailItem />
      </section>
    </div>
  );
}
