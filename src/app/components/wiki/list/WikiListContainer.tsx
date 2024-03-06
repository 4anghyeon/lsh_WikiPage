'use client';

import React, { useEffect, useRef, useState } from 'react';
import WikiListWrapper from '@/app/components/wiki/list/WikiListWrapper';

interface WikiContainerProps {
  data: Wiki[];
  initPageNum: number;
}

export const ITEM_PER_PAGE = 5;

const cropPage = (data: Wiki[], pageNum: number) => {
  return data.slice((pageNum - 1) * ITEM_PER_PAGE, (pageNum - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
};

const WikiListContainer = ({ data, initPageNum }: WikiContainerProps) => {
  const totalSize = useRef(data.length);
  const [pageNum, setPageNum] = useState(initPageNum);
  const [wikiList, setWikiList] = useState<Wiki[]>(cropPage(data, initPageNum));

  useEffect(() => {
    setWikiList(cropPage(data, pageNum));
  }, [pageNum]);

  return (
    <WikiListWrapper>
      <WikiListWrapper.WikiListHeader />
      {wikiList.length > 0 ? (
        <>
          <div className="flex flex-col gap-5">
            {wikiList.map(data => (
              <WikiListWrapper.Row key={data.id} data={data} />
            ))}
          </div>
          <WikiListWrapper.PageButtonContainer
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalSize={totalSize.current}
          />
        </>
      ) : (
        <div>No data</div>
      )}
    </WikiListWrapper>
  );
};

export default WikiListContainer;
