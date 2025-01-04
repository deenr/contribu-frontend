import { Sidebar } from '@/components/sidebar/sidebar';
import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <div className="bg-muted flex min-h-svh">
      <Sidebar className="fixed h-full w-72" />
      <main className="ml-72 pb-12 pt-6">
        <Outlet />
      </main>
    </div>
  );
}
