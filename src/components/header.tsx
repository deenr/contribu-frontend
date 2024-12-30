import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Contribu } from './icons/Contribu';
import { Button } from './ui/button';

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
        className={`
        fixed z-50 left-1/2 translate-x-[-50%] 
        px-4 sm:px-6 md:px-8 lg:px-12 
        transition-all duration-300 ease-in-out
        ${isSticky ? 'w-full sm:w-3/4 md:w-2/3 xl:w-1/2 py-4' : 'w-full py-2 '}
      `}
      >
        <div
          className={`
          py-2.5 flex flex-row justify-between items-center mx-auto max-w-7xl gap-6 sm:gap-8 md:gap-12 
          transition-all duration-300 ease-in-out
          ${isSticky ? 'p-2.5 bg-background/85 rounded-full backdrop-blur-lg border shadow-sm' : ''}
        `}
        >
          <Contribu className="text-xl text-primary min-h-5 h-5 min-w-28 w-28" />

          <div className="flex flex-row gap-3">
            <a className="hidden xs:block" href="https://app.contribu.me/signin">
              <Button variant="outline">Sign in</Button>
            </a>
            <a href="https://app.contribu.me/signup">
              <Button>Get started</Button>
            </a>
          </div>
        </div>
      </header>
    </motion.div>
  );
}
