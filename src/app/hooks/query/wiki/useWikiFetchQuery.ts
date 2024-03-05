import {useQuery} from "@tanstack/react-query";
import {wikiApi} from "@/app/shared/axios";

export const findAllWikiList = async () => {
  const {data} = await wikiApi.get(`/wikiList`);
  return data as Wiki[];
}

export const useWikiFetchQuery = () => {
  const {data} = useQuery<Wiki[]>({
    queryKey: ["wiki"],
    queryFn: async () => findAllWikiList()
  });

  return data;
}
