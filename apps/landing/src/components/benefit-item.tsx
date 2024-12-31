import { Badge } from '@repo/ui/badge';
import { Check, Frown, Smile, X } from 'lucide-react';

export function BenefitItem({ className, positive, negative }: { className?: string; positive: { title: string; description: string }; negative: { title: string; description: string } }) {
  return (
    <article className={`flex flex-col md:flex-row md:border md:rounded-3xl md:p-8 gap-8 md:gap-12 md:overflow-hidden md:bg-background ${className}`}>
      <div className="relative flex-1 p-6 sm:p-8 md:p-0 border md:border-none rounded-3xl md:rounded-none bg-background md:bg-none ">
        <Check className="bg-primary text-background p-1 rounded-full" />
        <div className="flex flex-col gap-2 mt-8">
          <h3 className="text-xl font-semibold">{positive.title}</h3>
          <p className="text-md font-normal text-muted-foreground">{positive.description}</p>
        </div>
        <Badge variant="outline" className="md:hidden p-0 overflow-hidden border-none z-10 bg-background absolute top-[-16px] right-[29px]">
          <div className="flex flex-row gap-1 items-center bg-primary/10 pl-2 pr-3 py-1.5 ">
            <Smile className="text-primary w-5 h-5" />
            <p className="text-sm sm:text-md font-medium text-primary">With Contribu</p>
          </div>
        </Badge>
      </div>
      <div className="hidden md:block w-[1px] bg-border"></div>
      <div className="relative flex-1 p-6 sm:p-8 md:p-0 border md:border-none rounded-3xl md:rounded-none bg-background md:bg-none ">
        <X className="bg-destructive text-background p-1 rounded-full " />
        <div className="flex flex-col gap-2 mt-8">
          <h3 className="text-xl font-semibold">{negative.title}</h3>
          <p className="text-md font-normal text-muted-foreground">{negative.description}</p>
        </div>

        <Badge variant="outline" className="md:hidden p-0 overflow-hidden border-none z-10 bg-background absolute top-[-16px] right-[29px]">
          <div className="flex flex-row gap-1 items-center bg-destructive/10 pl-2 pr-3 py-1.5 ">
            <Frown className="text-destructive w-5 h-5" />
            <p className="text-sm sm:text-md font-medium text-destructive">Without Contribu</p>
          </div>
        </Badge>
      </div>
    </article>
  );
}
