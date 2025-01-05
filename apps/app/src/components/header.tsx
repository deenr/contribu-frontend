import { Contribu } from '@/components/icons/contribu';
import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router';

export function Header({ className, ...props }: React.ComponentPropsWithoutRef<'aside'>) {
  const navItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Repositories', link: '/repository' }
  ];

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
        <NavLink
          className="text-muted-foreground hover:bg-muted aria-[current=page]:bg-muted aria-[current=page]:text-foreground ml-auto flex flex-row items-center gap-3 rounded-md px-2 py-2 text-base font-medium"
          to={'/logout'}
        >
          <LogOut className="h-5 w-5" />
        </NavLink>
      </div>
    </header>
  );
}
