import { FolderGit2, Home, LogOut } from 'lucide-react';
import { NavLink } from 'react-router';
import { Contribu } from '../icons/contribu';

export function Sidebar({ className, ...props }: React.ComponentPropsWithoutRef<'aside'>) {
  const topItems = [
    { icon: <Home className="h-5 w-5" />, title: 'Dashboard', link: '/' },
    { icon: <FolderGit2 className="h-5 w-5" />, title: 'Repositories', link: '/repository' }
  ];
  const bottomItems = [{ icon: <LogOut className="h-5 w-5" />, title: 'Sign out', link: '/logout' }];

  return (
    <aside className={`bg-background flex flex-col gap-6 border-r py-5 ${className}`} {...props}>
      <Contribu className="text-primary h-6 w-fit px-5" />
      <div className="flex flex-col gap-1 px-4">
        {topItems.map(({ title, icon, link }) => (
          <NavLink className="text-muted-foreground hover:bg-muted aria-[current=page]:bg-muted aria-[current=page]:text-foreground flex flex-row items-center gap-3 rounded-md px-3 py-2" to={link}>
            {icon}
            <p className="text-base font-medium">{title}</p>
          </NavLink>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-1 px-4">
        {bottomItems.map(({ title, icon, link }) => (
          <NavLink className="text-muted-foreground hover:bg-muted aria-[current=page]:bg-muted aria-[current=page]:text-foreground flex flex-row items-center gap-3 rounded-md px-3 py-2" to={link}>
            {icon}
            <p className="text-base font-medium">{title}</p>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
