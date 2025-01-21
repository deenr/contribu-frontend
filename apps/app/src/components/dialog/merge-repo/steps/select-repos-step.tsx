import { RepositoryList } from '@/components/repository/repository-list';
import { RepositorySelects } from '@/components/repository/repository-selects';
import axiosInstance from '@/services/axios-instance';
import { Author, Repository, RepositoryInfo, RepositoryInfoSchema } from '@/types/repository';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type SelectReposStepProps = {
  repositories: RepositoryInfo[];
  onSubmitRepositories: (repos: RepositoryInfo[]) => void;
};

export function SelectReposStep({ repositories, onSubmitRepositories }: SelectReposStepProps) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(false);

  const form = useForm<RepositoryInfo>({
    resolver: zodResolver(RepositoryInfoSchema),
    defaultValues: { platform: undefined, repository: undefined, author: undefined }
  });

  const { watch, reset } = form;

  useEffect(() => {
    const subscription = watch(async (value, { name }) => {
      if (name === 'platform' && value.platform) {
        setIsLoadingRepos(true);
        try {
          const { data } = await axiosInstance.get<Repository[]>(`provider/${value.platform}/repositories`);
          setRepos(data);
        } finally {
          setIsLoadingRepos(false);
        }
      }

      if (name === 'repository' && value.repository && value.platform) {
        setIsLoadingAuthors(true);
        try {
          const { data } = await axiosInstance.get<Author[]>(`provider/${value.platform}/${value.repository.name}/contributors`);
          setAuthors(data);
        } finally {
          setIsLoadingAuthors(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  function onSubmit(data: RepositoryInfo) {
    onSubmitRepositories([...repositories, data]);
    reset();
    setAuthors([]);
  }

  function removeRepo(index: number) {
    onSubmitRepositories(repositories.filter((_, i) => i !== index));
  }

  return (
    <>
      <RepositorySelects form={form} repos={repos} authors={authors} isLoadingRepos={isLoadingRepos} isLoadingAuthors={isLoadingAuthors} onSubmit={onSubmit} />
      <RepositoryList repositories={repositories} onRemove={removeRepo} />
    </>
  );
}
