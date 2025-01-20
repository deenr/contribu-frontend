import { Contribu } from '@/components/icons/contribu';
import { API_ROUTES } from '@/config/api-config';
import axiosInstance from '@/services/axios-instance';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { UserNavigation } from './nav-user';

export function NavHeader({ className, ...props }: React.ComponentPropsWithoutRef<'aside'>) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const navItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Repositories', link: '/repository' }
  ];

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axiosInstance.get<{ firstName: string; lastName: string; email: string }>('user/me');
      setProfile({ name: `${data.firstName} ${data.lastName}`, email: data.email });
    };

    getProfile();
  }, []);

  async function logout() {
    try {
      await axiosInstance.post(API_ROUTES.LOGOUT);
      navigate('/login');
    } catch {}
  }

  return (
    <header className={`bg-background fixed top-0 h-16 w-full border-b ${className}`} {...props}>
      <div className={`mx-auto flex h-full max-w-7xl flex-row items-center gap-6 px-8 py-4 ${className}`}>
        <Contribu className="text-primary h-6 w-fit" />
        <div className="flex flex-row gap-1">
          {navItems.map(({ title, link }) => (
            <NavLink
              key={title}
              className="text-muted-foreground hover:bg-muted aria-[current=page]:bg-muted aria-[current=page]:text-foreground flex flex-row items-center gap-3 rounded-md px-3 py-2 text-base font-medium"
              to={link}
            >
              {title}
            </NavLink>
          ))}
        </div>
        <div className="ml-auto flex flex-row items-center gap-2">
          <NavLink className="text-muted-foreground hover:bg-muted flex flex-row items-center gap-3 rounded-md text-base font-medium" to={'/settings'}>
            <Settings className="text-muted-foreground h-9 w-9 p-2" />
          </NavLink>
          {profile ? (
            <UserNavigation
              user={{
                avatar: '',
                ...profile
              }}
              logout={logout}
            />
          ) : (
            <Skeleton className="size-9 rounded-full" />
          )}
        </div>
      </div>
    </header>
  );
}
