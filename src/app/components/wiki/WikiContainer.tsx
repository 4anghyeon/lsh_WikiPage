'use client';

import React, { useEffect, useRef, useState } from 'react';
import WikiWrapper from '@/app/components/wiki/WikiWrapper';

interface WikiContainerProps {
  data: Wiki[];
  initPageNum: number;
}

export const ITEM_PER_PAGE = 5;

const cropPage = (data: Wiki[], pageNum: number) => {
  return data.slice((pageNum - 1) * ITEM_PER_PAGE, (pageNum - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
};

const WikiContainer = ({ data, initPageNum }: WikiContainerProps) => {
  const maxPage = useRef(data.length);
  const [pageNum, setPageNum] = useState(initPageNum);
  const [wikiList, setWikiList] = useState<Wiki[]>(cropPage(data, initPageNum));

  useEffect(() => {
    setWikiList(cropPage(data, pageNum));
  }, [pageNum]);

  return (
    <WikiWrapper>
      <div className="flex flex-col gap-5">{wikiList?.map(data => <WikiWrapper.Row key={data.id} data={data} />)}</div>
      <WikiWrapper.PageButtonContainer pageNum={pageNum} setPageNum={setPageNum} maxPage={maxPage.current} />
    </WikiWrapper>
  );
};

export default WikiContainer;
