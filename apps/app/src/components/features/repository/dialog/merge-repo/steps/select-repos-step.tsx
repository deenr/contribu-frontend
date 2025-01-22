import { RepositoryList } from '@/components/features/repository/repository-list';
import { RepositorySelects } from '@/components/features/repository/repository-selects';
import axiosInstance from '@/services/axios-instance';
import { GitRepositoryInfo, GitRepositoryInfoSchema } from '@/types/git-models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type SelectReposStepProps = {
  repositories: GitRepositoryInfo[];
  onSubmitRepositories: (repos: GitRepositoryInfo[]) => void;
};

export function SelectReposStep({ repositories, onSubmitRepositories }: SelectReposStepProps) {
  const [repos, setRepos] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [contributors, setContributors] = useState<string[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
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
          const { data } = await axiosInstance.get<string[]>(`provider/${value.platform}/repositories`);
          setRepos(data);
        } finally {
          setIsLoadingRepos(false);
        }
      }

      if (name === 'repository' && value.repository && value.platform) {
        setIsLoadingBranches(true);
        setIsLoadingContributors(true);

        try {
          const branchesResponse = await axiosInstance.get<string[]>(`provider/${value.platform}/${value.repository}/branches`);
          setBranches(branchesResponse.data);

          const contributorsResponse = await axiosInstance.get<string[]>(`provider/${value.platform}/${value.repository}/contributors`);
          setContributors(contributorsResponse.data);
        } finally {
          setIsLoadingBranches(false);
          setIsLoadingContributors(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  async function onSubmit(data: GitRepositoryInfo) {
    await axiosInstance.get(`/provider/${data.platform.toLowerCase()}/${data.repository}/${data.branch}/${data.contributor}/commits`);
    onSubmitRepositories([...repositories, data]);
    reset();
    setContributors([]);
    setBranches([]);
  }

  function removeRepo(index: number) {
    onSubmitRepositories(repositories.filter((_, i) => i !== index));
  }

  return (
    <>
      <RepositorySelects
        form={form}
        repos={repos}
        branches={branches}
        contributors={contributors}
        isLoadingRepos={isLoadingRepos}
        isLoadingBranches={isLoadingBranches}
        isLoadingContributors={isLoadingContributors}
        onSubmit={onSubmit}
      />
      <RepositoryList repositories={repositories} onRemove={removeRepo} />
    </>
  );
}
