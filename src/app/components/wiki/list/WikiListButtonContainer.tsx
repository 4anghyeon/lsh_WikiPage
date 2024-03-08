'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Button from '@/app/components/ui/Button';
import { ITEM_PER_PAGE } from '@/app/components/wiki/list/WikiListContainer';
import { usePathname, useSearchParams } from 'next/navigation';
import { useModal } from '@/app/hooks/ui/useModal';
import WriteEditor from '@/app/components/wiki/modal/WriteEditor';

interface PageContainerProps {
  pageNum: number;
  totalSize: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

const VISIBLE_PAGE_LENGTH = 3;

const makePageArray = (pageNum: number, totalSize: number) => {
  const startPage =
    pageNum - (pageNum % VISIBLE_PAGE_LENGTH === 0 ? VISIBLE_PAGE_LENGTH : pageNum % VISIBLE_PAGE_LENGTH);

  const temp: number[] = [];
  for (let i = 1; i <= VISIBLE_PAGE_LENGTH; i++) {
    temp.push(startPage + i);
    if ((startPage + i) * ITEM_PER_PAGE >= totalSize) break;
  }

  return temp;
};

const WikiListButtonContainer = ({ pageNum, totalSize, setPageNum }: PageContainerProps) => {
  const pathname = usePathname();
  const pageParams = useSearchParams();
  const [pageArray, setPageArray] = useState<number[]>(makePageArray(pageNum, totalSize));
  const { showModal } = useModal();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(pageParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [pageParams],
  );

  const handleClickPrev = useCallback(() => {
    const next = pageArray[0] - VISIBLE_PAGE_LENGTH;
    history.replaceState(null, '', pathname + '?' + createQueryString('page', next.toString()));
    setPageNum(next);
  }, [pageArray]);

  const handleClickNext = useCallback(() => {
    const next = pageArray[0] + VISIBLE_PAGE_LENGTH;
    history.replaceState(null, '', pathname + '?' + createQueryString('page', next.toString()));
    setPageNum(next);
  }, [pageArray]);

  const handleClickPage = useCallback((page: number) => {
    setPageNum(page);
    history.replaceState(null, '', pathname + '?' + createQueryString('page', page.toString()));
  }, []);

  const handleClickEnroll = () => {
    showModal(<WriteEditor />);
  };

  // 화면에 보여질 페이지 번호를 계산한다.
  useEffect(() => {
    // page1,2,3 => [1, 2, 3], page4,5,6 => [4, 5, 6] ....
    setPageArray(makePageArray(pageNum, totalSize));
  }, [pageNum, totalSize]);

  return (
    <div className="flex justify-center ml-40 mr-40 relative">
      {pageNum > VISIBLE_PAGE_LENGTH && (
        <Button variant="outline" className="mr-2" onClick={handleClickPrev}>
          이전
        </Button>
      )}
      {pageArray.map(num => (
        <Button
          key={num}
          variant={+(pageNum ?? 1) === num ? 'secondary' : 'default'}
          onClick={() => handleClickPage(num)}
        >
          {num}
        </Button>
      ))}
      {pageArray[pageArray.length - 1] * ITEM_PER_PAGE < totalSize && (
        <Button variant="outline" className="ml-2" onClick={handleClickNext}>
          다음
        </Button>
      )}
      <Button variant="primary" className="absolute right-0" onClick={handleClickEnroll}>
        등록
      </Button>
    </div>
  );
};

export default WikiListButtonContainer;
