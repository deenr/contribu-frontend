import { SettingsContent } from '@/components/settings-content';
import { SettingsHeader } from '@/components/settings-header';

export function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-4">
      <SettingsHeader className="w-full" />
      <SettingsContent />
    </div>
  );
}
