import { useEffect, useState } from 'react';
import { Contribu } from './icons/Contribu';
import { Button } from './ui/button';

export function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed z-50 left-1/2 translate-x-[-50%] 
        px-4 sm:px-6 md:px-8 lg:px-12 
        transition-all duration-300 ease-in-out
        ${isSticky ? 'w-full sm:w-3/4 md:w-2/3 xl:w-1/2 py-4' : 'w-full py-2 '}
      `}
    >
      <div
        className={`
          p-2.5 pl-5 flex flex-row justify-between items-center mx-auto max-w-7xl gap-6 sm:gap-8 md:gap-12 
          transition-all duration-300 ease-in-out
          ${isSticky ? 'bg-background/85 rounded-full backdrop-blur-lg border shadow-sm' : ''}
        `}
      >
        <Contribu className="text-xl text-primary h-5 w-fit" />

        <div className="flex flex-row gap-3">
          <Button variant="outline">Sign in</Button>
          <Button>Get started</Button>
        </div>
      </div>
    </header>
  );
}
