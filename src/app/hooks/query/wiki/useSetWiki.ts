import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wikiApi } from '@/app/shared/axios';
import { WikiType } from '@/app/types/data';
import { WIKI_KEY } from '@/app/hooks/query/wiki/useFetchWiki';

const insertWiki = async (data: Omit<WikiType, 'id'>) => {
  await wikiApi.post(`/wikiList/`, data);
};

const updateWiki = async (data: WikiType) => {
  await wikiApi.put(`/wikiList/${data.id}`, data);
  return data;
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
      queryClient.invalidateQueries({ queryKey: [WIKI_KEY] });
    },
  });

  return { addWiki, isAddPending, isAddSuccess };
};

export const useUpdateWiki = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editWiki,
    isPending: isEditPending,
    isSuccess: isEditSuccess,
  } = useMutation({
    mutationFn: updateWiki,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [WIKI_KEY, res.id.toString()] });
    },
  });

  return { editWiki, isEditPending, isEditSuccess };
};
