import { ProfileForm } from './forms/profile-form';

export function SettingsProfile() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-foreground text-lg font-semibold">Profile</h3>
        <p className="text-muted-foreground text-sm font-normal">Manage your profile here</p>
      </div>

      <div className="w-full md:w-2/3">
        <ProfileForm className="w-full" />
      </div>
    </section>
  );
}
