import { Tab, Tabs } from '@/components/common/tabs';
import { SettingsHeader } from '@/components/features/settings/settings-header';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

type SettingsTab = 'profile' | 'integrations';

const SETTINGS_TABS: Tab<SettingsTab>[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'integrations', label: 'Integrations' }
] as const;

const getActiveTab = (pathname: string): Tab<SettingsTab> => {
  const tabId = pathname.split('/').pop() as SettingsTab;
  return SETTINGS_TABS.find((tab) => tab.id === tabId) ?? SETTINGS_TABS[0];
};

export function SettingsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    return getActiveTab(location.pathname);
  }, [location.pathname]);

  const handleTabChange = (tabId: string) => {
    const path = tabId === 'profile' ? '' : tabId;
    navigate(path, { replace: true });
  };

  return (
    <div className="container mx-auto max-w-7xl px-8 py-6">
      <SettingsHeader className="w-full" />
      <main className="flex flex-col gap-6">
        <Tabs tabs={SETTINGS_TABS} activeTab={activeTab} onChange={handleTabChange} />
        <section className="flex min-h-[400px] flex-col gap-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
