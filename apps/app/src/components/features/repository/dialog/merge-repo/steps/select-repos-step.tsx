import { RepositoryList } from '@/components/features/repository/repository-list';
import { RepositorySelects } from '@/components/features/repository/repository-selects';
import axiosInstance from '@/services/axios-instance';
import { GitContributor, GitRepository, GitRepositoryInfo, GitRepositoryInfoSchema } from '@/types/git-models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type SelectReposStepProps = {
  repositories: GitRepositoryInfo[];
  onSubmitRepositories: (repos: GitRepositoryInfo[]) => void;
};

export function SelectReposStep({ repositories, onSubmitRepositories }: SelectReposStepProps) {
  const [repos, setRepos] = useState<GitRepository[]>([]);
  const [contributors, setContributors] = useState<GitContributor[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [isLoadingContributors, setIsLoadingContributors] = useState(false);

  const form = useForm<GitRepositoryInfo>({
    resolver: zodResolver(GitRepositoryInfoSchema),
    defaultValues: { platform: undefined, repository: undefined, contributor: undefined }
  });

  const { watch, reset } = form;

  useEffect(() => {
    const subscription = watch(async (value, { name }) => {
      if (name === 'platform' && value.platform) {
        setIsLoadingRepos(true);
        try {
          const { data } = await axiosInstance.get<GitRepository[]>(`provider/${value.platform}/repositories`);
          setRepos(data);
        } finally {
          setIsLoadingRepos(false);
        }
      }

      if (name === 'repository' && value.repository && value.platform) {
        setIsLoadingContributors(true);
        try {
          const { data } = await axiosInstance.get<GitContributor[]>(`provider/${value.platform}/${value.repository.name}/contributors`);
          setContributors(data);
        } finally {
          setIsLoadingContributors(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  function onSubmit(data: GitRepositoryInfo) {
    onSubmitRepositories([...repositories, data]);
    reset();
    setContributors([]);
  }

  function removeRepo(index: number) {
    onSubmitRepositories(repositories.filter((_, i) => i !== index));
  }

  return (
    <>
      <RepositorySelects form={form} repos={repos} contributors={contributors} isLoadingRepos={isLoadingRepos} isLoadingContributors={isLoadingContributors} onSubmit={onSubmit} />
      <RepositoryList repositories={repositories} onRemove={removeRepo} />
    </>
  );
}
