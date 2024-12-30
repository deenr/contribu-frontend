import { Contribu } from './icons/Contribu';
import { GitHub } from './icons/GitHub';
import { X } from './icons/X';

export function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 md:px-8 lg:px-12 border-t dark:bg-muted/30 bg-muted">
      <div className="flex flex-row justify-between items-center mx-auto max-w-7xl gap-6 sm:gap-8 md:gap-12">
        <div className="flex-1 flex flex-row gap-6 order-2 sm:order-1">
          <a href="https://github.com/contribu" aria-label="GitHub" className="hover:text-primary transition-colors">
            <GitHub className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
          </a>
          <a href="https://twitter.com/contribu" aria-label="X (formerly Twitter)" className="hover:text-primary transition-colors">
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
          </a>
        </div>
        <p className="flex-1 inline-flex items-end justify-end text-xs sm:text-sm text-muted-foreground order-3">
          <span className="h-fit leading-none">&#169; {new Date().getFullYear()} </span>
          <Contribu className="text-lg sm:text-xl text-muted-foreground h-3.5 sm:h-4 w-fit ml-0.5 mb-[.5px]" />
          <span className="h-fit leading-none">. All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
