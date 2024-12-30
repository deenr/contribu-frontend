import { HeartHandshake } from 'lucide-react';
import { Contribu } from './icons/Contribu';

export function Footer() {
  const links = [
    // {
    //   title: 'Product',
    //   links: [{ title: 'Steps' }, { title: 'Benefits' }]
    // },
    {
      title: 'Socials',
      links: [{ title: 'Github' }, { title: 'LinkedIn' }]
    },
    {
      title: 'Legal',
      links: [{ title: 'Terms' }, { title: 'Privacy' }, { title: 'Cookies' }]
    }
  ];
  return (
    <footer className="py-8 pt-16 px-4 sm:px-6 md:px-8 lg:px-12 dark:bg-muted/30 bg-muted">
      <div className="flex flex-col mx-auto max-w-7xl gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col gap-12 md:gap-16 sm:flex-row justify-between">
          <div className="flex flex-col gap-6 md:gap-8">
            <Contribu className="h-fit min-w-28 w-28 text-primary" />
            <p className="text-base text-muted-foreground font-normal">Unlock the power of private contributions</p>
          </div>
          <div className="grid grid-cols-2 sm:flex flex-row gap-8">
            {links.map(({ title, links }) => (
              <div className="md:min-w-28 flex flex-col gap-4">
                <div className="text-sm text-muted-foreground font-normal">{title}</div>
                <div className="flex flex-col gap-3">
                  {links.map((link) => (
                    <a className="text-base text-muted-foreground font-medium">{link.title}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[1px] bg-border mt-4"></div>
        <div className="flex flex-col-reverse sm:flex-row gap-6 justify-between items-start md:items-center">
          <p className="flex-1 text-xs sm:text-sm text-muted-foreground">&#169; {new Date().getFullYear()} Contribu. All rights reserved.</p>
          <p className="flex-1 inline-flex items-center justify-end gap-1 text-xs sm:text-sm text-muted-foreground">
            Made with <HeartHandshake className="w-4 h-4 text-primary" />
            by
            <a href="https://github.com/deenr" aria-label="GitHub of deenr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">
              Dean Reymen
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
