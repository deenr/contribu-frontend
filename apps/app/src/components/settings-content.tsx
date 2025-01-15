import { Tabs } from '@/components/ui/tabs';
import { Tab } from '@/types/tabs';
import { useState } from 'react';
import { SettingsIntegrations } from './settings-integrations';

export function SettingsContent() {
  const tabs: Tab[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'integrations', label: 'Integrations' }
  ];

  const [activeTab, setActiveTab] = useState<Tab>(tabs[1]);
  const onTabChange = (id: string) => {
    setActiveTab(tabs.find((tab) => tab.id === id)!);
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
      <section className="flex flex-col gap-4">{activeTab.id === 'profile' ? <>Profile</> : <SettingsIntegrations />}</section>
    </div>
  );
}
