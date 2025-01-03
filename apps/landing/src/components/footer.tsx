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
    <footer className="dark:bg-muted/30 bg-muted px-4 py-8 pt-16 sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col justify-between gap-12 sm:flex-row md:gap-16">
          <div className="flex flex-col gap-6 md:gap-8">
            <Contribu className="text-primary h-fit w-28 min-w-28" />
            <p className="text-muted-foreground text-base font-normal">Unlock the power of private contributions</p>
          </div>
          <div className="grid grid-cols-2 flex-row gap-8 sm:flex">
            {links.map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-4 md:min-w-28">
                <div className="text-muted-foreground text-sm font-normal">{title}</div>
                <div className="flex flex-col gap-3">
                  {links.map((link) => (
                    <a key={link.title} className="text-muted-foreground text-base font-medium">
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-border mt-4 h-[1px]"></div>
        <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row md:items-center">
          <p className="text-muted-foreground flex-1 text-xs sm:text-sm">&#169; {new Date().getFullYear()} Contribu. All rights reserved.</p>
          <p className="text-muted-foreground inline-flex flex-1 items-center justify-end gap-1 text-xs sm:text-sm">
            Made with <HeartHandshake className="text-primary h-4 w-4" />
            by
            <a href="https://github.com/deenr" aria-label="GitHub of deenr" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline transition-colors">
              Dean Reymen
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
