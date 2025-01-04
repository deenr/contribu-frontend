import { Badge } from '@repo/ui/components/ui/badge';
import { Check, Frown, Smile, X } from 'lucide-react';

export function BenefitItem({ className, positive, negative }: { className?: string; positive: { title: string; description: string }; negative: { title: string; description: string } }) {
  return (
    <article className={`md:bg-background flex flex-col gap-8 md:flex-row md:gap-12 md:overflow-hidden md:rounded-3xl md:border md:p-8 ${className}`}>
      <div className="bg-background relative flex-1 rounded-3xl border p-6 sm:p-8 md:rounded-none md:border-none md:bg-none md:p-0">
        <Check className="bg-primary text-background rounded-full p-1" />
        <div className="mt-8 flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{positive.title}</h3>
          <p className="text-md text-muted-foreground font-normal">{positive.description}</p>
        </div>
        <Badge variant="outline" className="bg-background absolute right-[29px] top-[-16px] z-10 overflow-hidden rounded-full border-none p-0 md:hidden">
          <div className="bg-primary/10 flex flex-row items-center gap-1 py-1.5 pl-2 pr-3">
            <Smile className="text-primary h-5 w-5" />
            <p className="sm:text-md text-primary text-sm font-medium">With Contribu</p>
          </div>
        </Badge>
      </div>
      <div className="bg-border hidden w-[1px] md:block"></div>
      <div className="bg-background relative flex-1 rounded-3xl border p-6 sm:p-8 md:rounded-none md:border-none md:bg-none md:p-0">
        <X className="bg-destructive text-background rounded-full p-1" />
        <div className="mt-8 flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{negative.title}</h3>
          <p className="text-md text-muted-foreground font-normal">{negative.description}</p>
        </div>

        <Badge variant="outline" className="bg-background absolute right-[29px] top-[-16px] z-10 overflow-hidden rounded-full border-none p-0 md:hidden">
          <div className="bg-destructive/10 flex flex-row items-center gap-1 py-1.5 pl-2 pr-3">
            <Frown className="text-destructive h-5 w-5" />
            <p className="sm:text-md text-destructive text-sm font-medium">Without Contribu</p>
          </div>
        </Badge>
      </div>
    </article>
  );
}
