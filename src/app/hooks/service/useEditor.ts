import { setModalContent } from '@/app/store/modal';
import { getCursorPosition, manageRange } from '@/app/lib/utils';
import React, { RefObject, useRef, useState } from 'react';
import { useFindAllWikiQuery } from '@/app/hooks/query/wiki/useFetchWiki';
import { WikiType } from '@/app/types/data';

interface PropsType {
  contentRef: RefObject<HTMLDivElement>;
}
const MAX_SEARCH_RESULT_LENGTH = 4;

export const useEditor = ({ contentRef }: PropsType) => {
  const wikiList = useFindAllWikiQuery();
  const atPositionRef = useRef<number>(0);
  const currentLineRef = useRef<Node | null>(null);
  const searchWordRef = useRef<string>('');
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(0);
  const [filteredTitleList, setFilteredTitleList] = useState<WikiType[]>([]);
  const [showTitleList, setShowTitleList] = useState(false);

  const handleClickCancel = () => {
    setModalContent(null);
  };

  const handleSelectTitle = (index: number) => {
    const innerHTML = contentRef.current!.innerHTML ?? '';
    const { saveRange, restoreRange } = manageRange();

    saveRange();
    const matchedWikiData = filteredTitleList[index];
    contentRef.current!.innerHTML = innerHTML.replace(
      `@${searchWordRef.current}`,
      `<button id='link-${matchedWikiData.id}' class="text-blue-400 ml-0.5">${matchedWikiData.title}</button>&nbsp;`,
    );
    restoreRange(contentRef.current!);

    setShowTitleList(false);
  };

  /**
   * editor 키 이벤트
   */
  const handleKeydown = (e: React.KeyboardEvent<HTMLElement>) => {
    const cursorInfo = getCursorPosition(contentRef.current!);

    switch (e.key) {
      case '@':
        if (!showTitleList) {
          currentLineRef.current = cursorInfo.currentLine;
          atPositionRef.current = cursorInfo.position;
        }
        setShowTitleList(true);
        return;
      case 'Backspace':
        if (cursorInfo.currentLine) {
          const textContent = cursorInfo.currentLine.textContent;
          if (textContent?.endsWith('@')) {
            setShowTitleList(false);
          }
          if (cursorInfo.currentLine.tagName === 'BUTTON') {
            document.getElementById(cursorInfo.currentLine.id)!.remove();
          }
        }

        return;
      case 'Escape':
        setShowTitleList(false);
        return;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (showTitleList) {
          e.preventDefault();
          setSelectedTitleIndex(prev => Math.max(--prev, 0));
        }
        return;
      case 'ArrowDown':
      case 'ArrowRight':
        if (showTitleList) {
          e.preventDefault();
          setSelectedTitleIndex(prev => Math.min(++prev, MAX_SEARCH_RESULT_LENGTH - 1));
        }
        return;
      case 'Enter':
        if (showTitleList) {
          e.preventDefault();
        }
        return;
      default:
        return;
    }
  };

  /**
   * @를 이용하여 강의 목록 검색시 이벤트
   */
  const handleKeyup = (e: React.KeyboardEvent<HTMLElement>) => {
    const textContent = currentLineRef.current?.textContent ?? '';
    searchWordRef.current = textContent.slice(atPositionRef.current + 1);

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowDown':
      case 'ArrowRight':
        return;
      case 'Enter':
        if (showTitleList) {
          e.preventDefault();
          handleSelectTitle(selectedTitleIndex);
        }
        return;
    }

    if (showTitleList) {
      if (wikiList) {
        setFilteredTitleList(
          wikiList.filter(wiki => wiki.title.includes(searchWordRef.current)).slice(0, MAX_SEARCH_RESULT_LENGTH),
        );
        setSelectedTitleIndex(0);
      }
    }
  };

  return {
    handleClickCancel,
    showTitleList,
    handleKeyup,
    handleKeydown,
    handleSelectTitle,
    filteredTitleList,
    selectedTitleIndex,
  };
};
