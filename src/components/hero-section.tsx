import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-48 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 dark:bg-muted/30 bg-muted">
      <div className="flex flex-col mx-auto max-w-7xl gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col gap-4 items-start">
          <Badge variant="outline" className="flex flex-row pl-1 py-1 gap-2 font-medium text-xs sm:text-sm text-muted-foreground bg-background">
            <Badge variant="outline" className="font-medium text-xs sm:text-sm text-muted-foreground">
              What's new?
            </Badge>
            <span className="hidden sm:inline">Automatically sync private commits</span>
            <span className="sm:hidden">Auto-sync commits</span>
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            Unlock the power of <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">private contributions</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-muted-foreground max-w-2xl">Transfer commit logs from private repositories to your profile</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            Learn more
          </Button>
          <Button className="w-full sm:w-auto">
            Get Started
            <ArrowRight />
          </Button>
        </div>
        <p className="text-xs sm:text-sm font-light text-muted-foreground max-w-2xl">Repository access required for commit log synchronization. Your code stays private and secure.</p>
      </div>
    </section>
  );
}
