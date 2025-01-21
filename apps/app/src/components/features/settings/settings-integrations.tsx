import { gitIntegrationAPI } from '@/actions/git-integration-actions';
import { GitIntegrationStatus } from '@/types/git-models';
import { useEffect, useState } from 'react';
import { GitIntegration } from './git-integration';
import { GitIntegrationSkeleton } from './git-integration-skeleton';

export function SettingsIntegrations() {
  const [gitIntegrationStatuses, setGitIntegrationStatuses] = useState<GitIntegrationStatus[]>([]);

  useEffect(() => {
    fetchGitIntegrationStatuses();
  }, []);

  const fetchGitIntegrationStatuses = async () => {
    const { data } = await gitIntegrationAPI.getStatuses();
    setGitIntegrationStatuses(data);
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-foreground text-lg font-semibold">Integrations</h3>
        <p className="text-muted-foreground text-sm font-normal">Manage your integrations here</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {gitIntegrationStatuses.length > 0
          ? gitIntegrationStatuses.map((gitIntegrationStatus) => (
              <GitIntegration key={gitIntegrationStatus.provider} gitIntegrationStatus={gitIntegrationStatus} refreshStatuses={fetchGitIntegrationStatuses} />
            ))
          : Array(3)
              .fill(null)
              .map((_, index) => <GitIntegrationSkeleton key={index} />)}
      </div>
    </section>
  );
}
