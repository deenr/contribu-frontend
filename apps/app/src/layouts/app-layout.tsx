import { NavHeader } from '@/components/nav-header';
import { useAuth } from '@/components/providers/auth-provider';
import { Outlet } from 'react-router';

export function AppLayout() {
  const { token } = useAuth();

  return (
    <>
      <NavHeader />
      {token !== null ? (
        <main className="h-full min-h-svh w-full pb-12 pt-[88px]">
          <Outlet />
        </main>
      ) : null}
    </>
  );
}
