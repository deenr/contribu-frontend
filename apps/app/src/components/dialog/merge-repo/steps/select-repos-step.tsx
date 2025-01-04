import { Bitbucket } from '@/components/icons/bitbucket';
import { GitHub } from '@/components/icons/github';
import { GitLab } from '@/components/icons/gitlab';
import { RepositoryInfo, RepositoryPlatform } from '@/types/repository';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@repo/ui/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { ChevronRight, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type SelectReposStepProps = {
  repositories: RepositoryInfo[];
  onSubmitRepositories: (repos: RepositoryInfo[]) => void;
};

export const RepositoryInfoSchema = z.object({
  platform: z.enum(['github', 'gitlab', 'bitbucket']),
  repository: z.string(),
  email: z.string().email()
});

type FormValues = z.infer<typeof RepositoryInfoSchema>;

export function SelectReposStep({ repositories, onSubmitRepositories }: SelectReposStepProps) {
  const [repos, setRepos] = useState<RepositoryInfo[]>(repositories);

  useEffect(() => {
    onSubmitRepositories(repos);
  }, [repos]);

  const form = useForm<FormValues>({
    resolver: zodResolver(RepositoryInfoSchema),
    defaultValues: { platform: undefined, repository: undefined, email: undefined }
  });

  function onSubmit(data: z.infer<typeof RepositoryInfoSchema>) {
    setRepos((prevRepos) => [...prevRepos, data]);
    form.reset({ platform: 'github', repository: '', email: '' }, { keepValues: false });
  }

  function removeRepo(index: number) {
    setRepos((prevRepos) => prevRepos.filter((_, i) => i !== index));
  }

  function getIcon(platform: RepositoryPlatform) {
    switch (platform) {
      case 'github':
        return <GitHub className="size-4" />;
      case 'gitlab':
        return <GitLab className="size-4" />;
      case 'bitbucket':
        return <Bitbucket className="size-4" />;
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex grid-cols-2 grid-rows-3 flex-col gap-4 md:grid">
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={field.onChange} aria-label="Select repository platform">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="github">
                        <div className="flex items-center">
                          <GitHub className="mr-2 size-4" />
                          GitHub
                        </div>
                      </SelectItem>
                      <SelectItem value="gitlab">
                        <div className="flex items-center">
                          <GitLab className="mr-2 size-4" />
                          GitLab
                        </div>
                      </SelectItem>
                      <SelectItem value="bitbucket">
                        <div className="flex items-center">
                          <Bitbucket className="mr-2 size-4" />
                          Bitbucket
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repository"
            render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={field.onChange} aria-label="Select repository">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a repository" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Repository 1">Repository 1</SelectItem>
                      <SelectItem value="Repository 2">Repository 2</SelectItem>
                      <SelectItem value="Repository 3">Repository 3</SelectItem>
                      <SelectItem value="Repository 4">Repository 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Select value={field.value} onValueChange={field.onChange} aria-label="Select email">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select email" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="deanreymen@outlook.be">deanreymen@outlook.be</SelectItem>
                      <SelectItem value="iamdeanreymen@gmail.com">iamdeanreymen@gmail.com</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit" className="col-span-2 w-full border-dashed">
            <Plus className="mr-2 size-4" />
            Add another repository
          </Button>
        </form>
      </Form>
      {repos.map(({ platform, repository, email }, index) => (
        <div key={`${platform}${repository}${email}`} className="bg-muted rounded-md px-4 py-2">
          <div className="flex flex-row items-center gap-1">
            {getIcon(platform)}
            <p className="ml-1 text-sm">{repository}</p>
            <ChevronRight className="text-muted-foreground size-4" />
            <p className="text-sm">{email}</p>
            <X className="ml-auto size-4 cursor-pointer" onClick={() => removeRepo(index)} />
          </div>
        </div>
      ))}
    </>
  );
}
