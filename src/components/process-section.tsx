import { Combine, Link, Lock, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
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
  const headerAnimation = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 400,
      delay: 0.3,
      mass: 1
    }
  };

  const stepAnimation = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 127,
      delay: 0.1,
      mass: 1
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 dark:bg-muted/30 bg-muted">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <motion.h2 {...headerAnimation} className="font-medium text-xs sm:text-sm text-muted-foreground">
            Process
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-4">
            <motion.p {...headerAnimation} className="flex-1 text-2xl sm:text-3xl font-semibold">
              A Secure Way to Keep Your Contributions
            </motion.p>
            <motion.p {...headerAnimation} className="flex-1 text-sm sm:text-base font-normal text-muted-foreground">
              Contribu enables you to transfer commit logs from private repositories while ensuring privacy and control.
            </motion.p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <motion.div key={index} {...stepAnimation}>
              <ProcessStep number={index + 1} {...step} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
