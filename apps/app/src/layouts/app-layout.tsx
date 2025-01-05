import { Header } from '@/components/header';
import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <>
      <Header />
      <main className="h-full min-h-svh w-full pb-12 pt-[88px]">
        <Outlet />
      </main>
    </>
  );
}
