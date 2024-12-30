import { Badge } from './ui/badge';

export function ProcessStep({ className, number, title, description, icon }: { className?: string; number: number; title: string; description: string; icon: JSX.Element }) {
  return (
    <article className={`relative border rounded-3xl p-6 sm:p-8 overflow-hidden bg-background ${className}`}>
      <Badge className="absolute right-3 top-3">Step {number}</Badge>

      <div className="flex justify-center items-center p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div className="flex flex-col gap-2 mt-6 sm:mt-8">
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        <p className="text-sm sm:text-md font-normal text-muted-foreground">{description}</p>
      </div>
      <div className="absolute bottom-[-30px] right-[-50px] h-[133px] w-[168px] opacity-5 text-primary">{icon}</div>
    </article>
  );
}
