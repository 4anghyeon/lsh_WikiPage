'use client';

import React, { useEffect, useRef, useState } from 'react';
import WikiList from '@/app/components/wiki/list/WikiList';

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
    <WikiList>
      <WikiList.Header title={'코딩허브 위키'} />
      {wikiList.length > 0 ? (
        <>
          <div className="flex flex-col gap-5 ml-40 mr-40">
            {wikiList.map(data => (
              <WikiList.Row key={data.id} data={data} />
            ))}
          </div>
          <WikiList.PageButtonContainer pageNum={pageNum} setPageNum={setPageNum} totalSize={totalSize.current} />
        </>
      ) : (
        <div>No data</div>
      )}
    </WikiList>
  );
};

export default WikiListContainer;
