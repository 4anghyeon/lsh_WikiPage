import { useInsertWiki } from '@/app/hooks/query/wiki/useSetWiki';
import { setModalContent } from '@/app/store/modal';
import { getCursorPosition, manageRange, validationText } from '@/app/lib/utils';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from '@/app/components/wiki/modal/WriteContent';
import { useFindAllWikiQuery } from '@/app/hooks/query/wiki/useFetchWiki';

interface PropsType {
  titleRef: RefObject<HTMLInputElement>;
  contentRef: RefObject<HTMLDivElement>;
}
const MAX_SEARCH_RESULT_LENGTH = 4;

export const useWriteContent = ({ titleRef, contentRef }: PropsType) => {
  const wikiList = useFindAllWikiQuery();
  const atPositionRef = useRef<number>(0);
  const currentLineRef = useRef<Node | null>(null);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(0);
  const [filteredTitleList, setFilteredTitleList] = useState<WikiType[]>([]);
  const [showTitleList, setShowTitleList] = useState(false);
  const { addWiki, isAddSuccess, isAddPending } = useInsertWiki();

  const handleClickCancel = () => {
    setModalContent(null);
  };

  const handleClickEnroll = () => {
    if (isAddPending) return;
    if (!validationText({ name: '강의명', text: titleRef.current!.value, maxLength: MAX_TITLE_LENGTH })) return;
    if (
      !validationText({ name: '강의 설명', text: contentRef.current!.textContent ?? '', maxLength: MAX_CONTENT_LENGTH })
    )
      return;

    addWiki({
      title: titleRef.current!.value,
      content: contentRef.current!.innerHTML ?? '',
    });
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
    const innerHTML = contentRef.current!.innerHTML ?? '';
    const textContent = currentLineRef.current?.textContent ?? '';
    const searchWord = textContent.slice(atPositionRef.current + 1);

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowDown':
      case 'ArrowRight':
        return;
      case 'Enter':
        if (showTitleList) {
          e.preventDefault();
          const { saveRange, restoreRange } = manageRange();

          saveRange();
          const matchedWikiData = filteredTitleList[selectedTitleIndex];
          contentRef.current!.innerHTML = innerHTML.replace(
            `@${searchWord}`,
            `<button id='link-${matchedWikiData.id}' class="text-blue-400 ml-0.5">${matchedWikiData.title}</button>&nbsp;`,
          );
          restoreRange(contentRef.current!);

          setShowTitleList(false);
        }
        return;
    }

    if (showTitleList) {
      if (wikiList) {
        setFilteredTitleList(
          wikiList.filter(wiki => wiki.title.includes(searchWord)).slice(0, MAX_SEARCH_RESULT_LENGTH),
        );
        setSelectedTitleIndex(0);
      }
    }
  };

  useEffect(() => {
    if (isAddSuccess) {
      setModalContent(null);
      alert('등록 되었습니다!');
    }
  }, [isAddSuccess]);

  return {
    handleClickCancel,
    handleClickEnroll,
    isAddPending,
    showTitleList,
    handleKeyup,
    handleKeydown,
    filteredTitleList,
    selectedTitleIndex,
  };
};
