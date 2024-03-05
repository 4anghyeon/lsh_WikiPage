'use client';

import React, { useCallback } from 'react';
import Button from '@/app/components/ui/Button';
import { ITEM_PER_PAGE } from '@/app/components/wiki/WikiContainer';
import { usePathname, useSearchParams } from 'next/navigation';

interface PageContainerProps {
  pageNum: number;
  maxPage: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

const WikiPageButtonContainer = ({ pageNum, maxPage, setPageNum }: PageContainerProps) => {
  const pathname = usePathname();
  const pageParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(pageParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [pageParams],
  );

  const handleClickPrev = useCallback(() => {
    setPageNum(prev => {
      history.replaceState(null, '', pathname + '?' + createQueryString('page', (--prev).toString()));
      return prev;
    });
  }, []);

  const handleClickNext = useCallback(() => {
    setPageNum(prev => {
      history.replaceState(null, '', pathname + '?' + createQueryString('page', (++prev).toString()));
      return prev;
    });
    createQueryString('page', '1');
  }, []);

  return (
    <div className="flex justify-center">
      {pageNum > 1 && (
        <Button variant="outline" className="mr-2" onClick={handleClickPrev}>
          이전
        </Button>
      )}
      {pageNum * ITEM_PER_PAGE < maxPage && (
        <Button variant="outline" className="ml-2" onClick={handleClickNext}>
          다음
        </Button>
      )}
    </div>
  );
};

export default WikiPageButtonContainer;
