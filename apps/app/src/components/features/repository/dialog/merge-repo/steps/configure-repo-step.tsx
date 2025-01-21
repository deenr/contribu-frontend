import { Bitbucket } from '@/components/common/icons/bitbucket';
import { GitHub } from '@/components/common/icons/github';
import { GitLab } from '@/components/common/icons/gitlab';
import { NewGitRepository, NewGitRepositorySchema } from '@/types/git-models';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type ConfigureRepoProps = {
  config?: NewGitRepository;
  onConfigChange: (config: NewGitRepository) => void;
};

export function ConfigureRepoStep({ config, onConfigChange }: ConfigureRepoProps) {
  const form = useForm<NewGitRepository>({
    resolver: zodResolver(NewGitRepositorySchema),
    defaultValues: config ? { ...config } : { platform: undefined, name: '' }
  });

  useEffect(() => {
    onConfigChange({ ...form.getValues() });
  }, [form.watch('platform'), form.watch('name')]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <Select value={field.value} onValueChange={field.onChange} aria-label="Select repository platform">
                <FormLabel>Platform</FormLabel>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name of the new repository" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
