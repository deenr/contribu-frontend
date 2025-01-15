import { NavHeader } from '@/components/nav-header';
import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <>
      <NavHeader />
      <main className="h-full min-h-svh w-full pb-12 pt-[88px]">
        <Outlet />
      </main>
    </>
  );
}
