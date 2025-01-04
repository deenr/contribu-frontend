import { ProgressStep, StepKey } from '@/types/progress-steps';
import { RepositoryInfo } from '@/types/repository';
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Combine, Eye, FolderPlus, GitMerge, RotateCw } from 'lucide-react';
import { useRef, useState } from 'react';
import { ProgressSteps } from './progress-steps';
import { SelectReposStep } from './steps/select-repos-step';

const STEPS: ProgressStep<StepKey>[] = [
  { key: 'select', title: 'Select', icon: <Combine className="h-full w-full" /> },
  { key: 'configure', title: 'Configure', icon: <FolderPlus className="h-full w-full" /> },
  { key: 'processing', title: 'Processing', icon: <RotateCw className="h-full w-full" /> },
  { key: 'results', title: 'Results', icon: <Eye className="h-full w-full" /> }
];

const TITLES = new Map<StepKey, string>([
  ['select', 'Select repositories'],
  ['configure', 'Configure repository'],
  ['processing', 'Processing'],
  ['results', 'Merge completed successfully']
]);

const DESCRIPTIONS = new Map<StepKey, string>([
  ['select', "Select all the repositories you want to merge. Click continue when you're done."],
  ['configure', "Configure your new repository. Click continue when you're done."],
  ['processing', 'The request is being processed.'],
  ['results', 'Check the details of your new repo below.']
]);

export function MergeRepoDialog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [repositories, setRepositories] = useState<RepositoryInfo[]>([]);
  const formSubmitRef = useRef<() => void>();

  const getCurrentStep = () => STEPS[currentStep];

  const renderStep = () => {
    switch (getCurrentStep().key) {
      case 'select':
        return (
          <SelectReposStep
            repositories={repositories}
            onSubmitRef={formSubmitRef}
            onSubmitRepositories={(repos) => {
              setRepositories(repos);
              setCurrentStep((prev) => prev + 1);
            }}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmitForm = () => {
    if (formSubmitRef.current) {
      formSubmitRef.current();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <GitMerge className="h-4 w-4" />
          Merge new repositories
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-fit sm:max-w-none">
        <DialogHeader>
          <ProgressSteps className="mr-6" steps={STEPS} currentStep={getCurrentStep()} />
          <DialogTitle className="!mt-4">{TITLES.get(getCurrentStep().key)}</DialogTitle>
          <DialogDescription>{DESCRIPTIONS.get(getCurrentStep().key)}</DialogDescription>
        </DialogHeader>
        {renderStep()}
        <DialogFooter>
          {currentStep > 0 && currentStep < 2 && (
            <Button variant="outline" onClick={() => setCurrentStep((prev) => prev - 1)}>
              Back
            </Button>
          )}
          <Button onClick={handleSubmitForm} type="button">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
