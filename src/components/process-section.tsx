import { Combine, Link, Lock, Share2 } from 'lucide-react';
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
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-xs sm:text-sm text-muted-foreground">Process</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <p className="flex-1 text-2xl sm:text-3xl font-semibold">A Secure Way to Keep Your Contributions</p>
            <p className="flex-1 text-sm sm:text-base font-normal text-muted-foreground">Contribu enables you to transfer commit logs from private repositories while ensuring privacy and control.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <ProcessStep key={index} number={index + 1} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
