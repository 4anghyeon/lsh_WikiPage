'use client';

import React, { useEffect, useState } from 'react';
import WikiList from '@/app/components/wiki/list/WikiList';
import { useFindAllWikiQuery } from '@/app/hooks/query/wiki/useFetchWiki';

interface WikiContainerProps {
  initData: WikiType[];
  initPageNum: number;
}

export const ITEM_PER_PAGE = 5;

const cropPage = (data: WikiType[], pageNum: number) => {
  return data.slice((pageNum - 1) * ITEM_PER_PAGE, (pageNum - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
};

const WikiListContainer = ({ initData, initPageNum }: WikiContainerProps) => {
  const [pageNum, setPageNum] = useState(initPageNum);
  const wikiList = useFindAllWikiQuery();
  const [totalSize, setTotalSize] = useState(initData.length);

  useEffect(() => {
    setTotalSize((wikiList ?? initData).length);
  }, [wikiList]);

  return (
    <WikiList>
      <WikiList.Header title={'코딩허브 위키'} />
      {initData.length > 0 ? (
        <>
          <div className="flex flex-col gap-5 ml-40 mr-40">
            {cropPage(wikiList ? wikiList : initData, pageNum).map(data => (
              <WikiList.Row key={data.id} data={data} />
            ))}
          </div>
          <WikiList.PageButtonContainer pageNum={pageNum} setPageNum={setPageNum} totalSize={totalSize} />
        </>
      ) : (
        <div>No data</div>
      )}
    </WikiList>
  );
};

export default WikiListContainer;
