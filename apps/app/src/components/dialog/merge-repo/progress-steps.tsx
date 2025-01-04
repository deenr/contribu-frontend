import { ProgressStep as ProgressStepInterface } from '@/types/progress-steps';
import { Badge } from '@repo/ui/components/ui/badge';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import { Check, ChevronRight } from 'lucide-react';

export function ProgressSteps<T>({ steps, currentStep, className, ...props }: { steps: ProgressStepInterface<T>[]; currentStep: ProgressStepInterface<T> } & React.ComponentPropsWithoutRef<'div'>) {
  const isMobile = useIsMobile();

  function getState(step: ProgressStepInterface<T>): 'done' | 'progress' | 'todo' {
    const currentStepIndex = steps.findIndex((s) => s.title === currentStep.title);
    const stepIndex = steps.findIndex((s) => s.title === step.title);

    if (currentStepIndex === stepIndex) return 'progress';
    else if (currentStepIndex > stepIndex) return 'done';
    else return 'todo';
  }

  return (
    <div className={`flex flex-1 flex-row gap-2 ${className}`} {...props}>
      {steps.map((step, index) => (
        <div key={step.key as string} className="flex flex-1 flex-row items-center gap-2">
          <ProgressStep state={getState(step)} active={currentStep.title === step.title} title={step.title} icon={step.icon} />
          {index !== steps.length - 1 && !isMobile ? <ChevronRight className="text-muted-foreground size-4" /> : null}
        </div>
      ))}
    </div>
  );
}

function ProgressStep({ state, active, title, icon }: { state: 'done' | 'progress' | 'todo'; active: boolean; title: string; icon: JSX.Element }) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <div className={`h-1 w-full rounded-full ${state === 'todo' ? 'bg-muted' : 'bg-primary'}`} data-active={active}></div>
  ) : (
    <Badge
      variant="outline"
      className="bg-background ring-offset-muted text-muted-foreground data-[active=true]:text-foreground group data-[active=true]:border-none data-[active=true]:outline-none data-[active=true]:ring-2"
      data-active={active}
    >
      {state === 'done' ? <Check className="text-primary mr-1.5 size-4" /> : <div className="group-data-[active=true]:text-primary mr-1.5 size-4">{icon}</div>}
      <span className="text-nowrap text-sm font-medium">{title}</span>
    </Badge>
  );
}
