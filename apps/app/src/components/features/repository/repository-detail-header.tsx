import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export function RepositoryDetailHeader({ name, className, ...props }: { name: string } & React.ComponentPropsWithoutRef<'header'>) {
  return (
    <header className={`mb-6 flex flex-col gap-4 ${className}`} {...props}>
      <Link className="text-primary inline-flex gap-1.5 text-sm font-semibold" to={'/repository'}>
        <ArrowLeft className="size-5" />
        Back to repositories
      </Link>
      <h2 className="text-foreground text-xl font-semibold md:text-2xl">{name}</h2>
    </header>
  );
}
