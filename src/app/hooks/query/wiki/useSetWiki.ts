import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wikiApi } from '@/app/shared/axios';

export const insertWiki = async (data: Omit<WikiType, 'id'>) => {
  await wikiApi.post(`/wikiList/`, data);
};

export const useInsertWiki = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addWiki,
    isPending: isAddPending,
    isSuccess: isAddSuccess,
  } = useMutation({
    mutationFn: insertWiki,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wiki'] });
    },
  });

  return { addWiki, isAddPending, isAddSuccess };
};
