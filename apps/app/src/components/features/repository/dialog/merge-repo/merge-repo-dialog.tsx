import { GitRepositoryInfo, NewGitRepository } from '@/types/git-models';
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Combine, Eye, FolderPlus, GitMerge, RotateCw } from 'lucide-react';
import { useState } from 'react';
import { ProgressSteps } from './progress-steps';
import { ConfigureRepoStep } from './steps/configure-repo-step';
import { SelectReposStep } from './steps/select-repos-step';

export enum MergeDialogStep {
  SELECT,
  CONFIGURE,
  PROCESSING,
  RESULTS
}

const STEPS = [
  { key: MergeDialogStep.SELECT, title: 'Select', icon: <Combine className="h-full w-full" /> },
  { key: MergeDialogStep.CONFIGURE, title: 'Configure', icon: <FolderPlus className="h-full w-full" /> },
  { key: MergeDialogStep.PROCESSING, title: 'Processing', icon: <RotateCw className="h-full w-full" /> },
  { key: MergeDialogStep.RESULTS, title: 'Results', icon: <Eye className="h-full w-full" /> }
];

const TITLES = new Map<MergeDialogStep, string>([
  [MergeDialogStep.SELECT, 'Select repositories'],
  [MergeDialogStep.CONFIGURE, 'Configure repository'],
  [MergeDialogStep.PROCESSING, 'Processing'],
  [MergeDialogStep.RESULTS, 'Merge completed successfully']
]);

const DESCRIPTIONS = new Map<MergeDialogStep, string>([
  [MergeDialogStep.SELECT, "Select all the repositories you want to merge. Click continue when you're done."],
  [MergeDialogStep.CONFIGURE, "Configure your new repository. Click continue when you're done."],
  [MergeDialogStep.PROCESSING, 'The request is being processed.'],
  [MergeDialogStep.RESULTS, 'Check the details of your new repo below.']
]);

export function MergeRepoDialog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [repositories, setRepositories] = useState<GitRepositoryInfo[]>([]);
  const [newRepositoryConfig, setNewRepositoryConfig] = useState<NewGitRepository>();

  const getCurrentStep = () => STEPS[currentStep];

  function renderStep() {
    switch (getCurrentStep().key) {
      case MergeDialogStep.SELECT:
        return <SelectReposStep repositories={repositories} onSubmitRepositories={(repos) => setRepositories(repos)} />;
      case MergeDialogStep.CONFIGURE:
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
      case MergeDialogStep.SELECT:
        return repositories.length > 0;
      case MergeDialogStep.CONFIGURE:
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
