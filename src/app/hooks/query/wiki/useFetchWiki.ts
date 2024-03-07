import { useQuery } from '@tanstack/react-query';
import { wikiApi } from '@/app/shared/axios';

export const findAllWikiList = async () => {
  const { data } = await wikiApi.get(`/wikiList`);
  return data as WikiType[];
};

export const findWikiById = async (id: string) => {
  const { data } = await wikiApi.get(`/wikiList/${id}`);
  return data as WikiType | null;
};

export const useFindAllWikiQuery = () => {
  const { data } = useQuery<WikiType[]>({
    queryKey: ['wiki'],
    queryFn: async () => findAllWikiList(),
  });

  return data;
};

export const useFindWikiByIdQuery = (id: string) => {
  const { data } = useQuery<WikiType | null>({
    queryKey: ['wiki', id],
    queryFn: async () => findWikiById(id),
  });

  return data;
};
