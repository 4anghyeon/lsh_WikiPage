'use client';

import React, { useEffect, useState } from 'react';
import Wiki from '@/app/components/wiki/Wiki';

interface WikiContainerProps {
  data: Wiki[];
  initPageNum: number;
}

const ITEM_PER_PAGE = 4;

const WikiContainer = ({ data, initPageNum }: WikiContainerProps) => {
  const [pageNum, setPageNum] = useState(initPageNum);
  const [wikiList, setWikiList] = useState<Wiki[]>([]);

  useEffect(() => {
    setWikiList(data.slice((pageNum - 1) * ITEM_PER_PAGE, (pageNum - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE));
  }, [pageNum]);

  return (
    <Wiki>
      {wikiList?.map(data => <Wiki.Row key={data.id} data={data} />)}
      <Wiki.PageContainer pageNum={pageNum} maxPage={wikiList.length} />
    </Wiki>
  );
};

export default WikiContainer;
