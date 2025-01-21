export function SettingsHeader({ className, ...props }: React.ComponentPropsWithoutRef<'header'>) {
  return (
    <header className={`mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`} {...props}>
      <h2 className="text-foreground text-xl font-semibold md:text-2xl">Settings</h2>
    </header>
  );
}
