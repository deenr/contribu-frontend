import { Button } from '@repo/ui/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Contribu } from './icons/Contribu';

export function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    if (window.scrollY) {
      setIsSticky(true);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const springTransition = {
    type: 'spring',
    damping: 30,
    stiffness: 400,
    mass: 1
  };

  const headerAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springTransition, delay: 0.1 }
  };

  return (
    <motion.div ref={headerRef} initial={headerAnimation.initial} animate={headerAnimation.animate} transition={headerAnimation.transition}>
      <header
        className={`fixed left-1/2 z-50 translate-x-[-50%] px-4 transition-all duration-300 ease-in-out sm:px-6 md:px-8 lg:px-12 ${isSticky ? 'w-full py-4 sm:w-3/4 md:w-2/3 xl:w-1/2' : 'w-full py-2'} `}
      >
        <div
          className={`mx-auto flex max-w-7xl flex-row items-center justify-between gap-6 py-2.5 transition-all duration-300 ease-in-out sm:gap-8 md:gap-12 ${isSticky ? 'bg-background/85 rounded-full border p-2.5 shadow-sm backdrop-blur-lg' : ''} `}
        >
          <Contribu className="text-primary h-5 min-h-5 w-28 min-w-28 text-xl" />

          <div className="flex flex-row gap-3">
            <a className="xs:block hidden" href="https://app.contribu.me/signin">
              <Button variant="outline" className="rounded-full">
                Sign in
              </Button>
            </a>
            <a href="https://app.contribu.me/signup">
              <Button className="rounded-full">Get started</Button>
            </a>
          </div>
        </div>
      </header>
    </motion.div>
  );
}
