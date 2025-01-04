import { ProgressStep, StepKey } from '@/types/progress-steps';
import { NewRepositoryConfig, RepositoryInfo } from '@/types/repository';
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Combine, Eye, FolderPlus, GitMerge, RotateCw } from 'lucide-react';
import { useState } from 'react';
import { ProgressSteps } from './progress-steps';
import { ConfigureRepoStep } from './steps/configure-repo-step';
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
  const [newRepositoryConfig, setNewRepositoryConfig] = useState<NewRepositoryConfig>();

  const getCurrentStep = () => STEPS[currentStep];

  function renderStep() {
    switch (getCurrentStep().key) {
      case 'select':
        return <SelectReposStep repositories={repositories} onSubmitRepositories={(repos) => setRepositories(repos)} />;
      case 'configure':
        return <ConfigureRepoStep config={newRepositoryConfig} onConfigChange={setNewRepositoryConfig} />;
      default:
        return null;
    }
  }

  function nextStep() {
    setCurrentStep((prevStep) => prevStep + 1);
  }

  function currentStepValid() {
    switch (getCurrentStep().key) {
      case 'select':
        return repositories.length > 0;
      case 'configure':
        if (newRepositoryConfig === undefined) return false;
        const { platform, name } = newRepositoryConfig;
        return platform !== undefined && name !== undefined && name !== '';
      default:
        return false;
    }
  }

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
          <ProgressSteps className="mr-6 w-1/3 md:w-full" steps={STEPS} currentStep={getCurrentStep()} />
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
          {currentStep < 2 && (
            <Button disabled={!currentStepValid()} type="button" onClick={nextStep}>
              Continue
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
