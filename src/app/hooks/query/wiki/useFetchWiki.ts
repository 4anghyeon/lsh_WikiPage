import { useQuery } from '@tanstack/react-query';
import { wikiApi } from '@/app/shared/axios';
import { WikiType } from '@/app/types/data';

export const WIKI_KEY = 'wiki';

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
    queryKey: [WIKI_KEY],
    queryFn: async () => findAllWikiList(),
  });

  return data;
};

export const useFindWikiByIdQuery = (id: string) => {
  const { data: wikiData } = useQuery<WikiType | null>({
    queryKey: [WIKI_KEY, id],
    queryFn: async () => findWikiById(id),
  });

  return wikiData;
};
