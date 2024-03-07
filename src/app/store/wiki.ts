import { create } from 'zustand';

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
