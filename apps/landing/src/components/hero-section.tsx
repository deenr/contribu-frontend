import { Badge } from '@repo/ui/badge';
import { Button } from '@repo/ui/button';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export function HeroSection() {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const learnMoreButtonRef = useRef(null);
  const getStartedButtonRef = useRef(null);
  const disclaimerRef = useRef(null);

  const isBadgeInView = useInView(badgeRef, { once: true });
  const isTitleInView = useInView(titleRef, { once: true });
  const isDescriptionInView = useInView(descriptionRef, { once: true });
  const isLearnMoreButtonRefInView = useInView(learnMoreButtonRef, { once: true });
  const isGetStartedButtonRefInView = useInView(getStartedButtonRef, { once: true });
  const isDisclaimerInView = useInView(disclaimerRef, { once: true });

  const springTransition = {
    type: 'spring',
    damping: 30,
    stiffness: 400,
    mass: 1
  };

  return (
    <section className="dark:bg-muted/30 bg-muted px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 md:pb-24 md:pt-48 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-4">
          <motion.div ref={badgeRef} initial={{ opacity: 0, y: 20 }} animate={isBadgeInView ? { opacity: 1, y: 0 } : {}} transition={{ ...springTransition, delay: 0.1 }}>
            <Badge variant="outline" className="text-muted-foreground bg-background flex flex-row gap-2 py-1 pl-1 text-xs font-medium sm:text-sm">
              <Badge variant="outline" className="text-muted-foreground text-xs font-medium sm:text-sm">
                <div className="relative mr-1.5 h-1.5 w-1.5">
                  <div className="bg-primary absolute h-full w-full animate-ping rounded-full"></div>
                  <div className="bg-primary absolute h-full w-full rounded-full"></div>
                </div>
                What's new?
              </Badge>
              <span className="hidden sm:inline">Automatically sync private commits</span>
              <span className="sm:hidden">Auto-sync commits</span>
            </Badge>
          </motion.div>
          <motion.h1
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springTransition, delay: 0.3 }}
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Unlock the power of <br />
            <span className="text-primary">private contributions</span>
          </motion.h1>
          <motion.p
            ref={descriptionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isDescriptionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springTransition, delay: 0.5 }}
            className="text-muted-foreground max-w-2xl text-sm font-normal sm:text-base md:text-lg lg:text-xl"
          >
            Transfer commit logs from private repositories to your profile
          </motion.p>
        </div>
        <div className="xs:flex-row flex w-full flex-col gap-3 sm:w-auto">
          <motion.div ref={learnMoreButtonRef} initial={{ opacity: 0, y: 20 }} animate={isLearnMoreButtonRefInView ? { opacity: 1, y: 0 } : {}} transition={{ ...springTransition, delay: 0.7 }}>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn more
            </Button>
          </motion.div>
          <motion.div ref={getStartedButtonRef} initial={{ opacity: 0, y: 20 }} animate={isGetStartedButtonRefInView ? { opacity: 1, y: 0 } : {}} transition={{ ...springTransition, delay: 0.9 }}>
            <a href="https://app.contribu.me/signup">
              <Button className="w-full sm:w-auto">
                Get Started
                <ArrowRight />
              </Button>
            </a>
          </motion.div>
        </div>
        <motion.p
          ref={disclaimerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isDisclaimerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springTransition, delay: 1.1 }}
          className="text-muted-foreground max-w-2xl text-xs font-light sm:text-sm"
        >
          Repository access required for commit log synchronization. Your code stays private and secure.
        </motion.p>
      </div>
    </section>
  );
}
