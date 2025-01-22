import { PLATFORM_ICONS } from '@/constants/platform-icons';
import { GitContributor, GitRepository, GitRepositoryInfo } from '@/types/git-models';
import { Button } from '@repo/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@repo/ui/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Loader2, Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

type RepositorySelectsProps = {
  form: UseFormReturn<GitRepositoryInfo>;
  repos: GitRepository[];
  branches: string[];
  contributors: GitContributor[];
  isLoadingRepos: boolean;
  isLoadingBranches: boolean;
  isLoadingContributors: boolean;
  onSubmit: (data: GitRepositoryInfo) => void;
};

export function RepositorySelects({ form, repos, branches, contributors, isLoadingRepos, isLoadingBranches, isLoadingContributors, onSubmit }: RepositorySelectsProps) {
  const { control, handleSubmit, watch } = form;
  const selectedPlatform = watch('platform');
  const selectedRepo = watch('repository');

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex grid-cols-2 grid-rows-3 flex-col gap-4 md:grid">
        <FormField
          control={control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger aria-label="Select repository platform">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(PLATFORM_ICONS).map(([platform, icon]) => (
                      <SelectItem key={platform} value={platform}>
                        <div className="flex items-center">
                          {icon}
                          <span className="ml-2">{platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase()}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="repository"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value?.id || ''}
                onValueChange={(selectedId) => {
                  const selectedRepo = repos.find((repo) => repo.id === selectedId);
                  if (selectedRepo) {
                    field.onChange({
                      id: selectedRepo.id.toString(),
                      name: selectedRepo.name
                    });
                  }
                }}
                disabled={!selectedPlatform || isLoadingRepos}
              >
                <FormControl>
                  <SelectTrigger aria-label="Select repository" disabled={repos.length === 0}>
                    <div className="flex flex-row items-center gap-2">
                      {isLoadingRepos && <Loader2 className="size-4 animate-spin" />}
                      <SelectValue placeholder={isLoadingRepos ? 'Loading repositories...' : 'Select a repository'}>{field.value?.name}</SelectValue>
                    </div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {repos.map((repo) => (
                      <SelectItem key={repo.id} value={repo.id}>
                        {repo.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <Select value={field.value} onValueChange={field.onChange} disabled={!selectedRepo || isLoadingBranches}>
                <FormControl>
                  <SelectTrigger aria-label="Select branch" disabled={branches.length === 0}>
                    <div className="flex flex-row items-center gap-2">
                      {isLoadingBranches && <Loader2 className="size-4 animate-spin" />}
                      <SelectValue placeholder={isLoadingBranches ? 'Loading branches...' : 'Select a branch'} />
                    </div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="contributor"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value?.id || ''}
                onValueChange={(selectedId) => {
                  const selectedContributor = contributors.find((contributor) => contributor.id === selectedId);
                  if (selectedContributor) {
                    field.onChange({
                      id: selectedContributor.id.toString(),
                      name: selectedContributor.login
                    });
                  }
                }}
                disabled={!selectedPlatform || isLoadingContributors}
              >
                <FormControl>
                  <SelectTrigger aria-label="Select contributor" disabled={contributors.length === 0}>
                    <div className="flex flex-row items-center gap-2">
                      {isLoadingContributors && <Loader2 className="size-4 animate-spin" />}
                      <SelectValue placeholder={isLoadingContributors ? 'Loading contributors...' : 'Select an contributor'}>{field.value?.name}</SelectValue>
                    </div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {contributors.map((contributor) => (
                      <SelectItem key={contributor.id} value={contributor.id}>
                        {contributor.login}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit" className="col-span-2 w-full border-dashed" disabled={!selectedRepo || !selectedPlatform || isLoadingRepos || isLoadingContributors}>
          <Plus className="mr-2 size-4" />
          Add another repository
        </Button>
      </form>
    </Form>
  );
}
