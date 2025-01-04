import { Bitbucket } from '@/components/icons/bitbucket';
import { GitHub } from '@/components/icons/github';
import { GitLab } from '@/components/icons/gitlab';
import { RepositoryInfo } from '@/types/repository';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@repo/ui/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Separator } from '@repo/ui/components/ui/separator';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash } from 'lucide-react';
import { MutableRefObject, useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

type SelectReposStepProps = {
  repositories: RepositoryInfo[];
  onSubmitRef: MutableRefObject<(() => void) | undefined>;
  onSubmitRepositories: (repos: RepositoryInfo[]) => void;
};

export const SelectReposSchema = z.object({
  repositories: z.array(
    z
      .object({
        service: z.enum(['github', 'gitlab', 'bitbucket'], { required_error: 'Please select a service.' }).optional(),
        repository: z.string({ required_error: 'Please select a valid repository.' }).optional(),
        email: z.string({ required_error: 'Please select an email to fetch the correct commits.' }).email().optional()
      })
      .refine((data) => Object.values(data).every((value) => value !== undefined), { message: 'All fields must be filled', path: ['service'] })
  )
});

type FormValues = z.infer<typeof SelectReposSchema>;

export function SelectReposStep({ repositories, onSubmitRef, onSubmitRepositories }: SelectReposStepProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(SelectReposSchema),
    defaultValues: {
      repositories: repositories && repositories.length > 0 ? repositories : [{ service: undefined, repository: undefined, email: undefined }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'repositories'
  });

  const addRepoInput = () => {
    append({ service: undefined, repository: undefined, email: undefined });
  };

  const removeRepoInput = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = form.handleSubmit((data) => {
        const filteredRepos = data.repositories.filter((repo) => repo.service !== undefined && repo.repository !== undefined && repo.email !== undefined);
        onSubmitRepositories(filteredRepos as RepositoryInfo[]);
      });
    }
  }, [onSubmitRef, form]);

  return (
    <FormProvider {...form}>
      <form className="flex flex-col">
        <AnimatePresence mode="sync">
          {fields.map((item, index) => (
            <div id={item.id} key={item.id}>
              <div className="grid grid-cols-[1fr_1fr_36px] gap-3">
                <FormField
                  control={form.control}
                  name={`repositories.${index}.service`}
                  render={({ field }) => (
                    <FormItem>
                      <Select value={field.value} onValueChange={field.onChange} aria-label="Select repository service">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="github">
                              <div className="flex items-center">
                                <GitHub className="mr-2 h-4 w-4" />
                                GitHub
                              </div>
                            </SelectItem>
                            <SelectItem value="gitlab">
                              <div className="flex items-center">
                                <GitLab className="mr-2 h-4 w-4" />
                                GitLab
                              </div>
                            </SelectItem>
                            <SelectItem value="bitbucket">
                              <div className="flex items-center">
                                <Bitbucket className="mr-2 h-4 w-4" />
                                Bitbucket
                              </div>
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="outline" size="icon" aria-label="Remove repository" onClick={() => removeRepoInput(index)} type="button">
                  <Trash className="h-4 w-4" />
                </Button>

                {form.watch(`repositories.${index}.service`) && (
                  <FormField
                    control={form.control}
                    name={`repositories.${index}.repository`}
                    render={({ field }) => (
                      <FormItem className="col-start-2 row-start-1">
                        <motion.div initial={{ opacity: 0, width: 0, x: -10 }} animate={{ opacity: 1, width: 'auto', x: 0 }}>
                          <Select value={field.value} onValueChange={field.onChange} aria-label="Select repository">
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a repository" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="repo-1">Repository 1</SelectItem>
                                <SelectItem value="repo-2">Repository 2</SelectItem>
                                <SelectItem value="repo-3">Repository 3</SelectItem>
                                <SelectItem value="repo-4">Repository 4</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </motion.div>
                      </FormItem>
                    )}
                  />
                )}

                {form.watch(`repositories.${index}.repository`) && (
                  <FormField
                    control={form.control}
                    name={`repositories.${index}.email`}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
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
                          <FormMessage />
                        </motion.div>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </AnimatePresence>

        <Button variant="outline" disabled={!form.formState.isValid} onClick={addRepoInput} type="button" className="w-full border-dashed">
          <Plus className="mr-2 h-4 w-4" />
          Add another repository
        </Button>
      </form>
    </FormProvider>
  );
}
