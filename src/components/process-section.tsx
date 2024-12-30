import { motion, useInView } from 'framer-motion';
import { Combine, Link, Lock, Share2 } from 'lucide-react';
import { useRef } from 'react';
import { ProcessStep } from './process-step';

const steps = [
  { title: 'Connect Your Repositories', description: 'Log in and link the private repositories from GitHub, Bitbucket, GitLab, or other sources.', icon: <Link className="w-full h-full" /> },
  { title: 'Export Commit Logs', description: 'Extract commit messages, authorship, and timestamps while leaving the code untouched.', icon: <Combine className="w-full h-full" /> },
  {
    title: 'Encrypt and Store',
    description: 'Encrypt commit messages for added security, making them accessible only through your Contribu.me account.',
    icon: <Lock className="w-full h-full" />
  },
  {
    title: 'Share or Publish',
    description: 'Push the encrypted logs to a private or public repository on GitHub, allowing you to showcase contributions with full control.',
    icon: <Share2 className="w-full h-full" />
  }
];

export function ProcessSection() {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const stepsRef = useRef(steps.map(() => useRef(null)));

  const isHeaderInView = useInView(headerRef, { once: true });
  const isTitleInView = useInView(titleRef, { once: true });
  const isDescriptionInView = useInView(descriptionRef, { once: true });
  const areStepsInView = stepsRef.current.map((ref) => useInView(ref, { once: true }));

  const springTransition = {
    type: 'spring',
    damping: 30,
    stiffness: 400,
    mass: 1
  };

  const headerAnimation = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { ...springTransition, delay: 0.1 }
  };

  const stepAnimation = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { ...springTransition, delay: 0.2 }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <motion.h2
            ref={headerRef}
            initial={headerAnimation.initial}
            animate={isHeaderInView ? headerAnimation.animate : {}}
            transition={headerAnimation.transition}
            className="font-medium text-xs sm:text-sm text-muted-foreground"
          >
            Process
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-4">
            <motion.p
              ref={titleRef}
              initial={headerAnimation.initial}
              animate={isTitleInView ? headerAnimation.animate : {}}
              transition={{ ...headerAnimation.transition, delay: 0.2 }}
              className="flex-1 text-2xl sm:text-3xl font-semibold"
            >
              A Secure Way to Keep Your Contributions
            </motion.p>
            <motion.p
              ref={descriptionRef}
              initial={headerAnimation.initial}
              animate={isDescriptionInView ? headerAnimation.animate : {}}
              transition={{ ...headerAnimation.transition, delay: 0.3 }}
              className="flex-1 text-sm sm:text-base font-normal text-muted-foreground"
            >
              Contribu enables you to transfer commit logs from private repositories while ensuring privacy and control.
            </motion.p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              ref={stepsRef.current[index]}
              initial={stepAnimation.initial}
              animate={areStepsInView[index] ? stepAnimation.animate : {}}
              transition={{ ...stepAnimation.transition, delay: 0.1 * (index + 1) }}
            >
              <ProcessStep number={index + 1} {...step} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
