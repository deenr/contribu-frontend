import { RepositoryDetail } from '@/components/repository-detail';
import { RepositoryDetailHeader } from '@/components/repository-detail-header';
import { useParams } from 'react-router';

export function RepositoryDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="mx-auto max-w-7xl px-8 py-4">
      <RepositoryDetailHeader className="w-full" name="repo-1-backend" />
      <RepositoryDetail />
    </div>
  );
}
