import { useAuth } from '@/components/features/auth/auth-provider';
import { Outlet } from 'react-router';
import { NavHeader } from './nav-header';

export function AppLayout() {
  const { token } = useAuth();

  return (
    <>
      <NavHeader loading={token === null} />
      {token !== null ? (
        <main className="h-full min-h-svh w-full pb-12 pt-[88px]">
          <Outlet />
        </main>
      ) : null}
    </>
  );
}
