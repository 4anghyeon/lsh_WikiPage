import { create } from 'zustand';
import { WikiType } from '@/app/types/data';

interface WikiState {
  wikiList: WikiType[];
}

const useWikiState = create<WikiState>()(() => ({
  wikiList: [],
}));

export const setWikiList = (wikiList: WikiType[]) => {
  useWikiState.setState(() => ({ wikiList }));
};

export default useWikiState;
