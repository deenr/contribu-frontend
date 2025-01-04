import { Badge } from '@repo/ui/components/ui/badge';

export function ProcessStep({ className, number, title, description, icon }: { className?: string; number: number; title: string; description: string; icon: JSX.Element }) {
  return (
    <article className={`bg-background relative overflow-hidden rounded-3xl border p-6 sm:p-8 ${className}`}>
      <Badge className="absolute right-3 top-3 rounded-full">Step {number}</Badge>

      <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg p-2 sm:h-12 sm:w-12 sm:p-3">{icon}</div>
      <div className="mt-6 flex flex-col gap-2 sm:mt-8">
        <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
        <p className="sm:text-md text-muted-foreground text-sm font-normal">{description}</p>
      </div>
      <div className="text-primary absolute bottom-[-30px] right-[-50px] h-[133px] w-[168px] opacity-5">{icon}</div>
    </article>
  );
}
