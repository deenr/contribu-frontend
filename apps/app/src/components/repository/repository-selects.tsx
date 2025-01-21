import { PLATFORM_ICONS } from '@/constants/platform-icons';
import { Author, Repository, RepositoryInfo } from '@/types/repository';
import { Button } from '@repo/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@repo/ui/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Loader2, Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

type RepositorySelectsProps = {
  form: UseFormReturn<RepositoryInfo>;
  repos: Repository[];
  authors: Author[];
  isLoadingRepos: boolean;
  isLoadingAuthors: boolean;
  onSubmit: (data: RepositoryInfo) => void;
};

export function RepositorySelects({ form, repos, authors, isLoadingRepos, isLoadingAuthors, onSubmit }: RepositorySelectsProps) {
  const { control, handleSubmit, watch } = form;
  const selectedPlatform = watch('platform');
  const selectedRepo = watch('repository');

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex grid-cols-2 grid-rows-3 flex-col gap-4 md:grid">
        {/* Platform Select */}
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
                          <span className="ml-2">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Repository Select */}
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

        {/* Author Select */}
        <FormField
          control={control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value?.id || ''}
                onValueChange={(selectedId) => {
                  const selectedAuthor = authors.find((author) => author.id === selectedId);
                  if (selectedAuthor) {
                    field.onChange({
                      id: selectedAuthor.id.toString(),
                      name: selectedAuthor.login
                    });
                  }
                }}
                disabled={!selectedPlatform || isLoadingAuthors}
              >
                <FormControl>
                  <SelectTrigger aria-label="Select author" disabled={authors.length === 0}>
                    <div className="flex flex-row items-center gap-2">
                      {isLoadingAuthors && <Loader2 className="size-4 animate-spin" />}
                      <SelectValue placeholder={isLoadingAuthors ? 'Loading authors...' : 'Select an author'}>{field.value?.name}</SelectValue>
                    </div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>
                        {author.login}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit" className="col-span-2 w-full border-dashed" disabled={!selectedRepo || !selectedPlatform || isLoadingRepos || isLoadingAuthors}>
          <Plus className="mr-2 size-4" />
          Add another repository
        </Button>
      </form>
    </Form>
  );
}
